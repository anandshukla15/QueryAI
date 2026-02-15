import { geminiModel } from "../config/gemini.js";
import { db } from "../config/db.js";
import { redisClient } from "../config/redis.js";

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user.id;

    // 🔥 Redis cache
    const cached = await redisClient.get(question);
    if (cached) {
      return res.json({ source: "cache", data: JSON.parse(cached) });
    }

    
    const sqlPrompt = `
You are a MySQL expert.
Database tables:
sales(id, amount, created_at)

Convert this question into SQL only:
"${question}"
Return ONLY SQL, no explanation.
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
