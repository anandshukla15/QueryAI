import mysql from 'mysql2/promise';
import { db } from './db.js';

export default async function initDb() {
  const DB_HOST = process.env.DB_HOST || '127.0.0.1';
  const DB_USER = process.env.DB_USER || 'root';
  const DB_PASSWORD = process.env.DB_PASSWORD || 'anandshukla$15';
  const DB_NAME = process.env.DB_NAME || 'ai_dashboard';
  const DB_PORT = process.env.DB_PORT
    ? Number(process.env.DB_PORT)
    : (process.env.DB_HOST === undefined || DB_HOST === '127.0.0.1')
    ? 3307
    : 3306;

  const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

    // Then create table using existing pool which targets the DB
    await db.query(createUsers);
    console.log('DB: ensured database and users table exist');
  } catch (err) {
    console.error('DB init error:', err);
    throw err;
  }
}
