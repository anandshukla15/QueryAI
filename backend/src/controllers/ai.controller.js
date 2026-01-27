import {openai} from "../config/openai.config.js";
import {db} from "../config/db.js";
import {reddisClient} from "../config/redis.config.js";

export const askAI = async (req, res) => {
    const {question} = req.body;
    const userId = req.user.id;

    const cached=await reddisClient.get(question);
    if(cached){
        return  res.json({source:"cache",data: JSON.parse(cached)});
    }

    const prompt = `
You are a MySQL expert.
Database tables:
sales(id, amount, created_at)

Convert this question into SQL only:
"${question}"
`;
     const completion=await openai.chat.completions.create({
        model:"gemini-2.5-flash",
        messages:[{
            role:"user",
            content: prompt}],
        });


     const sql=   completion.choices[0].message[0].content;

     const [rows] = await db.query(sql);


     // i am asking ai to explain the result in business language
     const explanationPrompt=`Here is SQL result: ${JSON.stringify(rows)}
Explain this in simple business language.
`;
        const explanationRes=await openai.chat.completions.create({
        model:"gemini-2.5-flash",
        messages:[{
            role:"user",
            content: explanationPrompt}],
        });
        
        const explanation=explanationRes.choices[0].message[0].content;
        const responseData={sql, rows,explanation};

        //saving data to redis cache for 1 hour
        await reddisClient.setEx(question,3600,JSON.stringify(responseData));

        res.json(responseData);
}