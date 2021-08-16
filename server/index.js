const express = require('express');
const cors = require('cors');
require('dotenv').config()
const Router = require('./routes/index');

const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)
app.use('/', Router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})