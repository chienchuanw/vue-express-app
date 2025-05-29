import { createApp } from './app.js';
import { loadEnvConfig } from './config/env.js';
import { closeDatabase } from './config/database.js';

/**
 * 伺服器啟動檔案
 * 負責啟動 Express 伺服器並處理優雅關閉
 */

// 載入環境變數配置
const config = loadEnvConfig();

// 建立 Express 應用程式
const app = createApp();

// 啟動伺服器
const server = app.listen(config.server.port, () => {
  console.log(`
🚀 伺服器已啟動！
📍 埠號: ${config.server.port}
🌍 環境: ${config.server.env}
🔗 本地網址: http://localhost:${config.server.port}
📚 API 文檔: http://localhost:${config.server.port}/api/info
⏰ 啟動時間: ${new Date().toISOString()}
  `);
});

/**
 * 優雅關閉處理
 * 確保在應用程式關閉時正確清理資源
 */
const gracefulShutdown = async (signal) => {
  console.log(`\n收到 ${signal} 信號，開始優雅關閉...`);
  
  // 停止接受新的連線
  server.close(async () => {
    console.log('HTTP 伺服器已關閉');
    
    try {
      // 關閉資料庫連線
      await closeDatabase();
      console.log('資料庫連線已關閉');
      
      console.log('應用程式已優雅關閉');
      process.exit(0);
    } catch (error) {
      console.error('關閉過程中發生錯誤:', error);
      process.exit(1);
    }
  });
  
  // 如果 10 秒內無法優雅關閉，強制退出
  setTimeout(() => {
    console.error('強制關閉應用程式');
    process.exit(1);
  }, 10000);
};

// 監聽關閉信號
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// 監聽未捕獲的異常
process.on('uncaughtException', (error) => {
  console.error('未捕獲的異常:', error);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未處理的 Promise 拒絕:', reason);
  gracefulShutdown('unhandledRejection');
});
