import { MessageService } from '../services/messageService.js';

/**
 * 訊息控制器
 * 處理所有與訊息相關的 HTTP 請求
 */
export class MessageController {

  /**
   * 取得所有訊息
   * GET /api/messages
   */
  static async getAllMessages(req, res) {
    try {
      const messages = await MessageService.getAllMessages();
      res.json(messages);
    } catch (error) {
      console.error('取得訊息時發生錯誤:', error);
      res.status(500).json({ 
        error: '伺服器內部錯誤',
        message: error.message 
      });
    }
  }

  /**
   * 根據 ID 取得單一訊息
   * GET /api/messages/:id
   */
  static async getMessageById(req, res) {
    try {
      const { id } = req.params;
      const messageId = parseInt(id);

      if (isNaN(messageId)) {
        return res.status(400).json({ error: '無效的訊息 ID' });
      }

      const message = await MessageService.getMessageById(messageId);
      
      if (!message) {
        return res.status(404).json({ error: '找不到指定的訊息' });
      }

      res.json(message);
    } catch (error) {
      console.error('取得訊息時發生錯誤:', error);
      res.status(500).json({ 
        error: '伺服器內部錯誤',
        message: error.message 
      });
    }
  }

  /**
   * 建立新訊息
   * POST /api/messages
   */
  static async createMessage(req, res) {
    try {
      const { content } = req.body;

      const newMessage = await MessageService.createMessage(content);
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('新增訊息時發生錯誤:', error);
      
      // 如果是驗證錯誤，回傳 400
      if (error.message.includes('不能為空')) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(500).json({ 
        error: '伺服器內部錯誤',
        message: error.message 
      });
    }
  }

  /**
   * 更新訊息
   * PUT /api/messages/:id
   */
  static async updateMessage(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const messageId = parseInt(id);

      if (isNaN(messageId)) {
        return res.status(400).json({ error: '無效的訊息 ID' });
      }

      const updatedMessage = await MessageService.updateMessage(messageId, content);
      
      if (!updatedMessage) {
        return res.status(404).json({ error: '找不到指定的訊息' });
      }

      res.json(updatedMessage);
    } catch (error) {
      console.error('更新訊息時發生錯誤:', error);
      
      // 如果是驗證錯誤，回傳 400
      if (error.message.includes('不能為空')) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(500).json({ 
        error: '伺服器內部錯誤',
        message: error.message 
      });
    }
  }

  /**
   * 刪除訊息
   * DELETE /api/messages/:id
   */
  static async deleteMessage(req, res) {
    try {
      const { id } = req.params;
      const messageId = parseInt(id);

      if (isNaN(messageId)) {
        return res.status(400).json({ error: '無效的訊息 ID' });
      }

      const deleted = await MessageService.deleteMessage(messageId);
      
      if (!deleted) {
        return res.status(404).json({ error: '找不到指定的訊息' });
      }

      res.status(204).send(); // 204 No Content
    } catch (error) {
      console.error('刪除訊息時發生錯誤:', error);
      res.status(500).json({ 
        error: '伺服器內部錯誤',
        message: error.message 
      });
    }
  }
}
