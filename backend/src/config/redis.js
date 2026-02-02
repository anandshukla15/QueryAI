import { createClient } from "redis";

const REDIS_URL = "redis://localhost:6379";

export const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on("error", (err) => console.log("Redis Error:", err));

await redisClient.connect();
