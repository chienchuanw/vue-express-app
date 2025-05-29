/**
 * 日誌工具
 * 提供統一的日誌記錄功能
 */

/**
 * 日誌等級
 */
export const LogLevel = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

/**
 * 日誌顏色對應
 */
const LogColors = {
  [LogLevel.ERROR]: '\x1b[31m', // 紅色
  [LogLevel.WARN]: '\x1b[33m',  // 黃色
  [LogLevel.INFO]: '\x1b[36m',  // 青色
  [LogLevel.DEBUG]: '\x1b[37m'  // 白色
};

/**
 * 日誌記錄器類別
 */
export class Logger {
  constructor(context = 'App') {
    this.context = context;
  }

  /**
   * 格式化日誌訊息
   * @param {string} level - 日誌等級
   * @param {string} message - 日誌訊息
   * @param {any} data - 額外資料
   * @returns {string} 格式化後的日誌
   */
  formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const color = LogColors[level] || '';
    const reset = '\x1b[0m';
    
    let formattedMessage = `${color}[${timestamp}] [${level}] [${this.context}] ${message}${reset}`;
    
    if (data) {
      formattedMessage += `\n${JSON.stringify(data, null, 2)}`;
    }
    
    return formattedMessage;
  }

  /**
   * 錯誤日誌
   * @param {string} message - 錯誤訊息
   * @param {any} data - 錯誤資料
   */
  error(message, data = null) {
    console.error(this.formatMessage(LogLevel.ERROR, message, data));
  }

  /**
   * 警告日誌
   * @param {string} message - 警告訊息
   * @param {any} data - 警告資料
   */
  warn(message, data = null) {
    console.warn(this.formatMessage(LogLevel.WARN, message, data));
  }

  /**
   * 資訊日誌
   * @param {string} message - 資訊訊息
   * @param {any} data - 資訊資料
   */
  info(message, data = null) {
    console.log(this.formatMessage(LogLevel.INFO, message, data));
  }

  /**
   * 除錯日誌
   * @param {string} message - 除錯訊息
   * @param {any} data - 除錯資料
   */
  debug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      console.log(this.formatMessage(LogLevel.DEBUG, message, data));
    }
  }
}

/**
 * 預設日誌記錄器實例
 */
export const logger = new Logger('Server');
