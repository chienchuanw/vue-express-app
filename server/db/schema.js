import { pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core';

/**
 * 定義 messages 資料表結構
 * 用於儲存使用者訊息的資料表
 */
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
