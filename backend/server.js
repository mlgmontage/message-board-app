const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

app.use('/messages', require('./api/messages'))
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

const port = process.env.PORT || 1337
app.listen(port, () =>
  console.log(`Server listenning on http://localhost:${port}`),
)
