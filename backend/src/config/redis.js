import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL;

export const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on("error", (err) => console.log("Redis Error:", err));

await redisClient.connect();
