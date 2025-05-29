const express = require("express");
const cors = require("cors");


const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())


app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Chuan!' });
})

app.get('/api/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
})


const messages = [];

app.get('/api/messages', (req, res) => {
  res.json(messages)
})

app.post('/api/messages', (req, res) => {
  const { content } = req.body;
  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Content is required' });
  }

  const newMessage = {
    id: messages.length + 1,
    content,
    createdAt: new Date().toISOString()
  }

  messages.push(newMessage)
  res.status(201).json(newMessage)
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})