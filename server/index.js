require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Router = require('./routes/index')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)
app.use('/', Router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})