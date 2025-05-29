import { Router } from 'express';
import { MessageController } from '../controllers/messageController.js';

/**
 * 訊息相關路由
 * 定義所有與訊息相關的 API 端點
 */
const router = Router();

// GET /api/messages - 取得所有訊息
router.get('/', MessageController.getAllMessages);

// GET /api/messages/:id - 取得單一訊息
router.get('/:id', MessageController.getMessageById);

// POST /api/messages - 建立新訊息
router.post('/', MessageController.createMessage);

// PUT /api/messages/:id - 更新訊息
router.put('/:id', MessageController.updateMessage);

// DELETE /api/messages/:id - 刪除訊息
router.delete('/:id', MessageController.deleteMessage);

export default router;
