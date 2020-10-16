const express = require('express')
const file = require('express-fileupload')
const cors = require('cors')
// const bodyParser = require('body-parser')
require('./config/db')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const app = express()
const corsConfig = {
  origin: true,
  credentials: true,
};

/* Config */
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(file())
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))



/* Server */
const port = 4000
app.listen(port, () => {
  console.log(`App listening in port ${port}`)
})