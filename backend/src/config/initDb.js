import mysql from 'mysql2/promise';
import { db } from './db.js';

export default async function initDb() {
  const DB_HOST = process.env.DB_HOST || '127.0.0.1';
  const DB_USER = process.env.DB_USER || 'root';
  const DB_PASSWORD = process.env.DB_PASSWORD || 'anandshukla$15';
  const DB_NAME = process.env.DB_NAME || 'ai_dashboard';
  const DB_PORT = Number(process.env.DB_PORT);


  const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=INNODB;
  `;

  const createSales = `
CREATE TABLE IF NOT EXISTS sales (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(255),
  amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB;
`;

const createHistory = `
CREATE TABLE IF NOT EXISTS query_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  question TEXT,
  sql_query TEXT,
  result JSON,
  explanation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=INNODB;
`;

  try {
    
console.log(`DB init connecting to ${DB_HOST}:${DB_PORT} to ensure database ${DB_NAME}`);
    const conn = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
    });
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await conn.end();

    await db.query(createUsers);
    await db.query(createSales);
    await db.query(createHistory);
    console.log('DB: ensured database and users/sales/q tables exist');
  } catch (err) {
    console.error('DB init error:', err);
    throw err;
  }
}
