const express = require("express");
const cors = require("cors");


const app = express();
const port = 3000;
app.use(cors())

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Chuan!' });
})

app.get('/api/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})