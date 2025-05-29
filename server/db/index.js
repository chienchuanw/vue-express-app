import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { messages } from './schema.js';
import dotenv from 'dotenv';

// 載入環境變數
dotenv.config();

/**
 * 建立 PostgreSQL 資料庫連線
 * 從環境變數讀取連線設定
 */
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sql = postgres(connectionString, {
  // 連線池設定
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

/**
 * 建立 Drizzle ORM 實例
 * 提供類型安全的資料庫操作介面
 */
export const db = drizzle(sql, {
  schema: { messages }
});

/**
 * 匯出資料表 schema 供其他模組使用
 */
export { messages };
