import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "mysql",
  user: "root",
  password: "anandshukla$15",
  database: "ai_dashboard",
});
