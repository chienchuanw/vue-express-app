import { db, messages } from '../db/index.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

// 載入訊息範本
const __dirname = dirname(fileURLToPath(import.meta.url));
const { categories } = JSON.parse(readFileSync(join(__dirname, 'messageTemplates.json'), 'utf-8'));

/**
 * 取得所有可用的訊息分類
 */
const getAvailableCategories = () => Object.keys(categories);

/**
 * 插入指定分類的所有訊息
 */
const seedMessagesByCategory = async (category) => {
  if (!categories[category]) {
    throw new Error(`未找到分類: ${category}。可用分類: ${getAvailableCategories().join(', ')}`);
  }

  const categoryMessages = categories[category];
  console.log(`🌱 開始插入 ${category} 分類的 ${categoryMessages.length} 則訊息...`);

  const messagesToInsert = categoryMessages.map(content => ({ content }));
  const insertedMessages = await db.insert(messages).values(messagesToInsert).returning();

  console.log(`✅ 成功插入 ${insertedMessages.length} 則訊息！`);
  return insertedMessages;
};

/**
 * 插入所有分類的訊息
 */
const seedAllMessages = async () => {
  console.log('🌱 開始插入所有分類的訊息...');

  const allMessages = Object.values(categories).flat();
  const messagesToInsert = allMessages.map(content => ({ content }));
  const insertedMessages = await db.insert(messages).values(messagesToInsert).returning();

  console.log(`✅ 成功插入 ${insertedMessages.length} 則訊息！`);
  return insertedMessages;
};

/**
 * 清空所有訊息資料
 */
const clearAllMessages = async () => {
  console.log('🗑️  警告：即將清空所有訊息資料...');
  await db.delete(messages);
  console.log('✅ 已清空所有訊息資料');
};

/**
 * 主要執行函式
 */
const main = async () => {
  try {
    const [command] = process.argv.slice(2);

    const commands = {
      all: () => seedAllMessages(),
      clear: () => clearAllMessages(),
      categories: () => {
        console.log('📋 可用的訊息分類：');
        getAvailableCategories().forEach(category => {
          console.log(`  • ${category}: ${categories[category].length} 則訊息`);
        });
      }
    };

    // 如果是分類名稱，插入該分類的訊息
    if (categories[command]) {
      await seedMessagesByCategory(command);
    } else if (commands[command]) {
      await commands[command]();
    } else {
      console.log(`
📖 使用說明：

插入所有訊息：node seeds/messageSeeds.js all
插入指定分類：node seeds/messageSeeds.js [分類名稱]
清空所有訊息：node seeds/messageSeeds.js clear
查看所有分類：node seeds/messageSeeds.js categories

可用分類：${getAvailableCategories().join(', ')}
      `);
    }
  } catch (error) {
    console.error('❌ 執行錯誤:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 請確認 PostgreSQL 服務已啟動且 .env 設定正確');
    }
  } finally {
    process.exit(0);
  }
};

// 直接執行時運行主函式
if (import.meta.url === `file://${process.argv[1]}`) main();

// 匯出函式
export { seedMessagesByCategory, seedAllMessages, clearAllMessages, getAvailableCategories };
