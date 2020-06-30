const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

connection.connect((err) => {
  if (err) {
    console.error('error connection: ' + err.stack)
    return
  }
  console.log('Successfully connected to database as id : ' + connection.threadId)
})

module.exports = connection