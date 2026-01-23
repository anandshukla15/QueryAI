import Redis from "redis";

export const redisClient = Redis.createClient({
  url: "redis://redis:6379",
});

await redisClient.connect();
