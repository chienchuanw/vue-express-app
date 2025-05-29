/**
 * 全域錯誤處理中介軟體
 * 統一處理應用程式中的錯誤
 */

/**
 * 404 錯誤處理中介軟體
 * 處理找不到路由的請求
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: '找不到請求的資源',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
};

/**
 * 全域錯誤處理中介軟體
 * 處理應用程式中的所有錯誤
 */
export const globalErrorHandler = (err, req, res, next) => {
  console.error('全域錯誤處理器捕獲錯誤:', err);

  // 預設錯誤狀態碼
  let statusCode = err.statusCode || 500;
  let message = err.message || '伺服器內部錯誤';

  // 處理特定類型的錯誤
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = '資料驗證失敗';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = '無效的資料格式';
  } else if (err.code === 'ECONNREFUSED') {
    statusCode = 503;
    message = '資料庫連線失敗';
  }

  // 回傳錯誤回應
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err
    }),
    timestamp: new Date().toISOString()
  });
};

/**
 * 非同步錯誤包裝器
 * 自動捕獲非同步函式中的錯誤並傳遞給錯誤處理中介軟體
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
