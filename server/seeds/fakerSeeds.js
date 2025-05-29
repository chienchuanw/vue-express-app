import { db, messages } from '../db/index.js';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

/**
 * 使用 Faker 產生隨機訊息內容
 * 支援多種類型的假資料生成
 */
const generateFakeMessage = (type = 'mixed') => {
  // 設定 faker 為繁體中文語系
  faker.locale = 'zh_TW';
  
  switch (type) {
    case 'quote':
      // 產生勵志名言或引言
      return faker.lorem.sentence({ min: 8, max: 20 });
    
    case 'company':
      // 產生公司相關訊息
      return `在 ${faker.company.name()} 工作真是一個很棒的體驗！`;
    
    case 'personal':
      // 產生個人生活相關訊息
      const activities = [
        `今天去了 ${faker.location.city()}，風景真美！`,
        `剛看完《${faker.lorem.words(3)}》這本書，很有收穫`,
        `和 ${faker.person.firstName()} 一起吃了美味的 ${faker.lorem.word()}`,
        `在 ${faker.location.streetAddress()} 發現了一家很棒的咖啡店`,
        `學習 ${faker.lorem.word()} 技術讓我很有成就感`
      ];
      return faker.helpers.arrayElement(activities);
    
    case 'tech':
      // 產生技術相關訊息
      const techMessages = [
        `正在學習 ${faker.lorem.word()} 框架，進度很順利`,
        `今天解決了一個關於 ${faker.lorem.word()} 的複雜問題`,
        `參加了 ${faker.lorem.words(2)} 技術研討會，學到很多`,
        `開發 ${faker.lorem.word()} 專案時遇到了有趣的挑戰`,
        `使用 ${faker.lorem.word()} 工具提升了開發效率`
      ];
      return faker.helpers.arrayElement(techMessages);
    
    case 'social':
      // 產生社交相關訊息
      return `和朋友們在 ${faker.location.city()} 度過了愉快的 ${faker.date.weekday()}`;
    
    case 'work':
      // 產生工作相關訊息
      return `今天的 ${faker.lorem.word()} 專案會議很有成效，團隊合作很棒！`;
    
    default:
      // 混合類型，隨機選擇
      const types = ['quote', 'company', 'personal', 'tech', 'social', 'work'];
      const randomType = faker.helpers.arrayElement(types);
      return generateFakeMessage(randomType);
  }
};

/**
 * 使用 Faker 產生指定數量的隨機訊息
 * @param {number} count - 要產生的訊息數量
 * @param {string} type - 訊息類型 (quote, company, personal, tech, social, work, mixed)
 */
const seedFakeMessages = async (count = 10, type = 'mixed') => {
  console.log(`🎲 開始使用 Faker 產生 ${count} 則 ${type} 類型的隨機訊息...`);
  
  const fakeMessages = [];
  for (let i = 0; i < count; i++) {
    fakeMessages.push({
      content: generateFakeMessage(type)
    });
  }
  
  const insertedMessages = await db.insert(messages).values(fakeMessages).returning();
  console.log(`✅ 成功插入 ${insertedMessages.length} 則 Faker 產生的訊息！`);
  return insertedMessages;
};

/**
 * 使用 Faker 產生大量測試資料
 * @param {number} count - 要產生的訊息數量
 */
const seedBulkFakeMessages = async (count = 100) => {
  console.log(`🎲 開始使用 Faker 產生 ${count} 則大量測試訊息...`);
  
  const batchSize = 50; // 每批次插入的數量
  let totalInserted = 0;
  
  for (let i = 0; i < count; i += batchSize) {
    const currentBatchSize = Math.min(batchSize, count - i);
    const fakeMessages = [];
    
    for (let j = 0; j < currentBatchSize; j++) {
      fakeMessages.push({
        content: generateFakeMessage('mixed')
      });
    }
    
    const insertedMessages = await db.insert(messages).values(fakeMessages).returning();
    totalInserted += insertedMessages.length;
    console.log(`📦 已插入第 ${Math.floor(i / batchSize) + 1} 批次，共 ${insertedMessages.length} 則訊息`);
  }
  
  console.log(`✅ 成功插入總計 ${totalInserted} 則 Faker 產生的訊息！`);
  return totalInserted;
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
 * 取得可用的 Faker 訊息類型
 */
const getAvailableFakerTypes = () => ['quote', 'company', 'personal', 'tech', 'social', 'work', 'mixed'];

/**
 * 主要執行函式
 */
const main = async () => {
  try {
    const [command, ...args] = process.argv.slice(2);

    const commands = {
      fake: () => {
        const count = parseInt(args[0]) || 10;
        const type = args[1] || 'mixed';
        return seedFakeMessages(count, type);
      },
      bulk: () => {
        const count = parseInt(args[0]) || 100;
        return seedBulkFakeMessages(count);
      },
      clear: () => clearAllMessages(),
      types: () => {
        console.log('🎲 可用的 Faker 訊息類型：');
        getAvailableFakerTypes().forEach(type => {
          console.log(`  • ${type}`);
        });
      }
    };

    if (commands[command]) {
      await commands[command]();
    } else {
      console.log(`
📖 Faker Seeds 使用說明：

🎲 Faker 功能：
  產生隨機訊息：node seeds/fakerSeeds.js fake [數量] [類型]
  產生大量測試資料：node seeds/fakerSeeds.js bulk [數量]
  清空所有訊息：node seeds/fakerSeeds.js clear
  查看可用類型：node seeds/fakerSeeds.js types

Faker 範例：
  node seeds/fakerSeeds.js fake 20 tech     # 產生 20 則技術類型訊息
  node seeds/fakerSeeds.js fake 15 personal # 產生 15 則個人生活訊息
  node seeds/fakerSeeds.js fake 10          # 產生 10 則混合類型訊息
  node seeds/fakerSeeds.js bulk 500         # 產生 500 則大量測試資料

可用的 Faker 類型：${getAvailableFakerTypes().join(', ')}
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
export { 
  seedFakeMessages,
  seedBulkFakeMessages,
  generateFakeMessage,
  clearAllMessages,
  getAvailableFakerTypes
};
