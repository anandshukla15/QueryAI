import { geminiModel } from "../config/gemini.js";
import { db } from "../config/db.js";
import { redisClient } from "../config/redis.js";

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user.id;

    
    const [history] = await db.query(
      "SELECT question, sql_query FROM query_history WHERE user_id=? ORDER BY created_at DESC LIMIT 3",
      [userId]
    );

    const context = history
      .map(h => `Previous Question: ${h.question}\nSQL: ${h.sql_query}`)
      .join("\n");

    const sqlPrompt  = `
You are a senior MySQL analyst.

Previous context:
${context}

Database:
sales(id INT, amount DECIMAL, created_at DATETIME)

Rules:
- ONLY SELECT queries
- No modification queries
- Use COALESCE for aggregates
- Return raw SQL only

Convert:
"${question}"
`;

    const sqlResult = await geminiModel.generateContent(sqlPrompt);
    const sql = sqlResult.response.text().trim().replace(/```sql|```/g, "");

    if (!sql.toLowerCase().startsWith("select")) {
      return res.status(400).json({ error: "Invalid query type" });
    }

    const [rows] = await db.query(sql);

    const explanationPrompt = `
Explain this result in business terms:
${JSON.stringify(rows)}
`;

    const explanationResult = await geminiModel.generateContent(explanationPrompt);
    const explanation = explanationResult.response.text().trim();

    await db.query(
      `INSERT INTO query_history 
       (user_id, question, sql_query, result, explanation) 
       VALUES (?, ?, ?, ?, ?)`,
      [userId, question, sql, JSON.stringify(rows), explanation]
    );

    const cacheKey = `user:${userId}:q:${question}`;
    await redisClient.setEx(cacheKey, 3600, JSON.stringify({ sql, rows, explanation }));

    res.json({ question, sql, rows, explanation });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI processing failed" });
  }
};
