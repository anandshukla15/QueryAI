import "dotenv/config";
import { geminiModel } from "./src/config/openai.js";

const result = await geminiModel.generateContent("Explain Redis in one line");
console.log(result.response.text());
