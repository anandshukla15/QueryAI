import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT
    ? Number(process.env.DB_PORT)
    : (process.env.DB_HOST === undefined || process.env.DB_HOST === '127.0.0.1')
    ? 3307
    : 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "anandshukla$15",
  database: process.env.DB_NAME || "ai_dashboard",
});
