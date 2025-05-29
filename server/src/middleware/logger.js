/**
 * 請求日誌中介軟體
 * 記錄所有 HTTP 請求的詳細資訊
 */

/**
 * 簡單的請求日誌中介軟體
 * 記錄請求方法、路徑、狀態碼和回應時間
 */
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // 監聽回應完成事件
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusColor = getStatusColor(res.statusCode);

    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ` +
      `${statusColor}${res.statusCode}\x1b[0m - ${duration}ms`
    );
  });

  next();
};

/**
 * 詳細的請求日誌中介軟體
 * 記錄更多請求詳細資訊，包括 IP、User-Agent 等
 */
export const detailedRequestLogger = (req, res, next) => {
  const startTime = Date.now();

  // 取得客戶端 IP
  const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;

  // 記錄請求開始
  console.log(`
[請求開始] ${new Date().toISOString()}
方法: ${req.method}
路徑: ${req.originalUrl}
IP: ${clientIP}
User-Agent: ${req.get('User-Agent') || 'Unknown'}
Content-Type: ${req.get('Content-Type') || 'None'}
  `.trim());

  // 監聽回應完成事件
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusColor = getStatusColor(res.statusCode);

    console.log(`
[請求完成] ${new Date().toISOString()}
方法: ${req.method}
路徑: ${req.originalUrl}
狀態碼: ${statusColor}${res.statusCode}\x1b[0m
回應時間: ${duration}ms
    `.trim());
  });

  next();
};

/**
 * 根據 HTTP 狀態碼取得對應的顏色代碼
 * @param {number} statusCode - HTTP 狀態碼
 * @returns {string} ANSI 顏色代碼
 */
function getStatusColor(statusCode) {
  if (statusCode >= 200 && statusCode < 300) {
    return '\x1b[32m'; // 綠色 - 成功
  } else if (statusCode >= 300 && statusCode < 400) {
    return '\x1b[36m'; // 青色 - 重新導向
  } else if (statusCode >= 400 && statusCode < 500) {
    return '\x1b[33m'; // 黃色 - 客戶端錯誤
  } else if (statusCode >= 500) {
    return '\x1b[31m'; // 紅色 - 伺服器錯誤
  }
  return '\x1b[0m'; // 預設顏色
}
