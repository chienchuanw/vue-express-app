import dotenv from 'dotenv';

// 載入環境變數
dotenv.config();

/**
 * 環境變數配置管理
 * 統一管理所有環境變數的讀取和驗證
 */
export const loadEnvConfig = () => {
  // 驗證必要的環境變數
  const requiredEnvVars = [
    'DB_HOST',
    'DB_PORT', 
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`缺少必要的環境變數: ${missingVars.join(', ')}`);
  }

  return {
    // 伺服器設定
    server: {
      port: parseInt(process.env.PORT) || 3002,
      env: process.env.NODE_ENV || 'development'
    },
    
    // 資料庫設定
    db: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  };
};
