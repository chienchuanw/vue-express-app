/**
 * 一般控制器
 * 處理通用的 API 端點
 */
export class GeneralController {

  /**
   * 健康檢查端點
   * GET /api/hello
   */
  static hello(req, res) {
    res.json({ 
      message: 'Hello from Chuan!',
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  }

  /**
   * 取得當前時間
   * GET /api/time
   */
  static getTime(req, res) {
    res.json({ 
      time: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
  }

  /**
   * API 資訊端點
   * GET /api/info
   */
  static getApiInfo(req, res) {
    res.json({
      name: 'Vue Express App API',
      version: '1.0.0',
      description: '使用 Express.js 和 Drizzle ORM 建立的後端 API',
      endpoints: {
        health: '/api/hello',
        time: '/api/time',
        messages: '/api/messages'
      }
    });
  }
}
