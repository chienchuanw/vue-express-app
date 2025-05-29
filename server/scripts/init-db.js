import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, messages } from '../src/config/database.js';
import dotenv from 'dotenv';

// 載入環境變數
dotenv.config();

/**
 * 初始化資料庫腳本
 * 使用 Drizzle ORM 執行 migration 來建立資料表
 */

async function initDatabase() {
  try {
    console.log('🚀 開始初始化資料庫...');

    // 使用 Drizzle ORM 執行 migration
    await migrate(db, { migrationsFolder: './drizzle' });

    console.log('✅ 資料庫 migration 執行成功！');
    console.log('✅ 資料表已建立完成');

    // 測試資料庫連線並檢查資料表
    try {
      // 嘗試查詢 messages 資料表來確認是否建立成功
      await db.select().from(messages).limit(0);
      console.log('✅ 確認資料表 messages 已存在且可正常查詢');
    } catch (queryError) {
      console.warn('⚠️  資料表可能尚未完全建立，但 migration 已執行');
    }

  } catch (error) {
    console.error('❌ 初始化資料庫時發生錯誤:', error);

    // 如果是連線錯誤，提供更詳細的說明
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 請確認：');
      console.error('   1. PostgreSQL 服務是否已啟動');
      console.error('   2. .env 檔案中的資料庫設定是否正確');
      console.error('   3. 資料庫是否已建立');
    }
  } finally {
    // 關閉資料庫連線
    process.exit(0);
  }
}

// 執行初始化
initDatabase();
