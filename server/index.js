import express from 'express';
import cors from 'cors';
import { db, messages } from './db/index.js';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

// 載入環境變數
dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(cors())
app.use(express.json())


app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Chuan!' });
})

app.get('/api/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
})

app.get('/api/messages', async (req, res) => {
  try {
    const allMessages = await db.select().from(messages);
    res.json(allMessages);
  } catch (error) {
    console.error('取得訊息時發生錯誤:', error);
    res.status(500).json({ error: '伺服器內部錯誤' });
  }
})

app.post('/api/messages', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: '訊息內容不能為空' });
    }

    const newMessage = await db.insert(messages).values({
      content: content.trim()
    }).returning();

    res.status(201).json(newMessage[0]);
  } catch (error) {
    console.error('新增訊息時發生錯誤:', error);
    res.status(500).json({ error: '伺服器內部錯誤' });
  }
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})