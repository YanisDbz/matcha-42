const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "matcha",
  port: process.env.DB_PORT || "3308"
})

connection.connect((err) => {
  if (err) {
    console.error('error connection: ' + err.stack)
    return
  }
  console.log('Successfully connected to database as id : ' + connection.threadId)
})

module.exports = connection