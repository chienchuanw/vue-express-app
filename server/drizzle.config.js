import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

// 載入環境變數
dotenv.config();

/**
 * Drizzle Kit 配置檔案
 * 用於管理資料庫 migration 和 schema 生成
 */
export default defineConfig({
  // Schema 檔案位置
  schema: './db/schema.js',

  // Migration 檔案輸出目錄
  out: './drizzle',

  // 資料庫類型
  dialect: 'postgresql',

  // 資料庫連線設定
  dbCredentials: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
});
