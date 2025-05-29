import { Router } from 'express';
import { GeneralController } from '../controllers/generalController.js';

/**
 * 一般路由
 * 定義通用的 API 端點
 */
const router = Router();

// GET /api/hello - 健康檢查
router.get('/hello', GeneralController.hello);

// GET /api/time - 取得當前時間
router.get('/time', GeneralController.getTime);

// GET /api/info - API 資訊
router.get('/info', GeneralController.getApiInfo);

export default router;
