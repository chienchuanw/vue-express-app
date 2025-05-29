import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';
import { requestLogger } from './middleware/logger.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';

/**
 * 建立並配置 Express 應用程式
 * 統一管理所有中介軟體和路由設定
 */
export const createApp = () => {
  const app = express();

  // 基本中介軟體設定
  app.use(cors()); // 啟用 CORS
  app.use(express.json()); // 解析 JSON 請求體
  app.use(express.urlencoded({ extended: true })); // 解析 URL 編碼的請求體

  // 請求日誌中介軟體
  app.use(requestLogger);

  // API 路由
  app.use('/api', apiRoutes);

  // 根路徑回應
  app.get('/', (req, res) => {
    res.json({
      message: 'Vue Express App API Server',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
      endpoints: {
        api: '/api',
        health: '/api/hello',
        time: '/api/time',
        info: '/api/info',
        messages: '/api/messages'
      }
    });
  });

  // 404 錯誤處理
  app.use(notFoundHandler);

  // 全域錯誤處理
  app.use(globalErrorHandler);

  return app;
};
