const express = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser')
require('./config/db')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const app = express()

/* Config */
app.use(cors())
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))



/* Server */
const port = process.env.PORT
app.listen(port, () => {
  console.log(`App listening in port ${port}`)
})