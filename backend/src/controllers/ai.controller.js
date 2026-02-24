import { geminiModel } from "../config/gemini.js";
import { db } from "../config/db.js";
import { redisClient } from "../config/redis.js";

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user.id;

    // console.log("API KEY:", process.env.GEMINI_API_KEY);


    // 🔥 Redis cache
    // const cached = await redisClient.get(question);
    // if (cached) {
    //   return res.json({ source: "cache", data: JSON.parse(cached) });
    // }

    const sqlPrompt = `
You are a senior MySQL data analyst.

Database schema:
sales(
  id INT,
  amount DECIMAL,
  created_at DATETIME
)

Rules:
1. Generate ONLY valid MySQL SELECT queries.
2. DO NOT generate INSERT, UPDATE, DELETE, DROP, ALTER, TRUNCATE.
3. Use COALESCE for aggregate functions like SUM to avoid NULL results.
4. When filtering by date like "today" or "yesterday", use index-friendly range queries:
   Example:
   created_at >= CURDATE()
   AND created_at < CURDATE() + INTERVAL 1 DAY
5. Always alias aggregate results clearly (e.g., AS total_revenue).
6. Do NOT include explanations.
7. Return ONLY raw SQL without markdown or backticks.

Convert this question into SQL:
"${question}"
`;

    const sqlResult = await geminiModel.generateContent(sqlPrompt);
    const sql = sqlResult.response.text().trim().replace(/```sql|```/g, "");

    // 🛢 Step 2 — Execute SQL
    const [rows] = await db.query(sql);

    const explanationPrompt = `
Here is SQL result:
${JSON.stringify(rows)}

Explain this in simple business language.
`;

    const explanationResult = await geminiModel.generateContent(explanationPrompt);
    const explanation = explanationResult.response.text().trim();

    const responseData = { sql, rows, explanation };

   
    await redisClient.setEx(question, 3600, JSON.stringify(responseData));

    res.json(responseData);
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI processing failed" });
  }
};
