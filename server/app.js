const express = require('express');
const file = require('express-fileupload');
const cors = require('cors');
const {getFullDate, insertMessage} = require("./utils/utils")

require('./config/db');
require('dotenv').config()
const cookieParser = require('cookie-parser');
const app = express();
const server = require("http").createServer(app);
io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});



/* Config */
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(file())
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))


/* Server */
const port = 8081
server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on ${port}`);
});

var users = [];

io.on("connection", (socket) => {
  socket.on("user_connected", (id) => {
      console.log("user id connect : " + id)
      users[id] = socket.id;
   })

  socket.on("send-chat-message", ({ message, usersend, user_receive }) => {
    var fullDate = getFullDate();

    io.emit("chat-message", { usersend, user_receive, message, fullDate });
    insertMessage(usersend, user_receive.iduser, message, fullDate);
  });
  
  socket.on('logout', (user_id) => {
    console.log("user id logout : " + user_id)
    console.log("users array : " + users)
    const index = users.indexOf(socket.id);
    console.log("index : " + index)
    if (index > -1) {
      users.splice(index, 1);
    }
    console.log("Users array : ")
    console.log(users)
  });
});