import { db, messages } from '../config/database.js';
import { eq } from 'drizzle-orm';

/**
 * 訊息服務層
 * 處理所有與訊息相關的業務邏輯
 */
export class MessageService {
  
  /**
   * 取得所有訊息
   * @returns {Promise<Array>} 訊息列表
   */
  static async getAllMessages() {
    try {
      const allMessages = await db.select().from(messages);
      return allMessages;
    } catch (error) {
      throw new Error(`取得訊息失敗: ${error.message}`);
    }
  }

  /**
   * 根據 ID 取得單一訊息
   * @param {number} id - 訊息 ID
   * @returns {Promise<Object|null>} 訊息物件或 null
   */
  static async getMessageById(id) {
    try {
      const message = await db.select().from(messages).where(eq(messages.id, id));
      return message[0] || null;
    } catch (error) {
      throw new Error(`取得訊息失敗: ${error.message}`);
    }
  }

  /**
   * 建立新訊息
   * @param {string} content - 訊息內容
   * @returns {Promise<Object>} 新建立的訊息
   */
  static async createMessage(content) {
    // 驗證輸入
    if (!content || typeof content !== 'string' || content.trim() === '') {
      throw new Error('訊息內容不能為空');
    }

    try {
      const newMessage = await db.insert(messages).values({
        content: content.trim()
      }).returning();

      return newMessage[0];
    } catch (error) {
      throw new Error(`建立訊息失敗: ${error.message}`);
    }
  }

  /**
   * 更新訊息
   * @param {number} id - 訊息 ID
   * @param {string} content - 新的訊息內容
   * @returns {Promise<Object|null>} 更新後的訊息或 null
   */
  static async updateMessage(id, content) {
    // 驗證輸入
    if (!content || typeof content !== 'string' || content.trim() === '') {
      throw new Error('訊息內容不能為空');
    }

    try {
      const updatedMessage = await db
        .update(messages)
        .set({ content: content.trim() })
        .where(eq(messages.id, id))
        .returning();

      return updatedMessage[0] || null;
    } catch (error) {
      throw new Error(`更新訊息失敗: ${error.message}`);
    }
  }

  /**
   * 刪除訊息
   * @param {number} id - 訊息 ID
   * @returns {Promise<boolean>} 是否成功刪除
   */
  static async deleteMessage(id) {
    try {
      const deletedMessage = await db
        .delete(messages)
        .where(eq(messages.id, id))
        .returning();

      return deletedMessage.length > 0;
    } catch (error) {
      throw new Error(`刪除訊息失敗: ${error.message}`);
    }
  }
}
