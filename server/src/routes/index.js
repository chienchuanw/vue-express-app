import { Router } from 'express';
import messageRoutes from './messageRoutes.js';
import generalRoutes from './generalRoutes.js';

/**
 * 主要路由配置
 * 統一管理所有 API 路由
 */
const router = Router();

// 一般路由 (直接掛載到 /api)
router.use('/', generalRoutes);

// 訊息路由 (掛載到 /api/messages)
router.use('/messages', messageRoutes);

export default router;
