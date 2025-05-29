import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { messages } from '../../db/schema.js';
import { loadEnvConfig } from './env.js';

// 載入環境變數配置
const config = loadEnvConfig();

/**
 * 建立 PostgreSQL 資料庫連線
 * 從環境變數讀取連線設定
 */
const connectionString = `postgresql://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`;

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

/**
 * 關閉資料庫連線
 * 用於應用程式關閉時清理資源
 */
export const closeDatabase = async () => {
  await sql.end();
};
