const express = require('express');
const file = require('express-fileupload');
const cors = require('cors');
const {getFullDate, insertMessage} = require("./utils/utils")
const jwt = require("jsonwebtoken")

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

const array_id = []


const addChatid = (user_id, chat_id ) => {

  const existingUser = array_id.find((user) => user.chat_id === chat_id && user.user_id === user_id);

  if(existingUser) return { error: 'Username is taken.' };

  const user = { user_id, chat_id };

  array_id.push(user);

  return { user };
}

const updateChatid = (user_id, chat_id) => {
 const objIndex = array_id.findIndex((obj => obj.user_id == user_id));
 const exist = array_id.find((user) => user.user_id === user_id && user.chat_id === chat_id)

 if(exist) return { error: 'Username is taken.' };

 array_id[objIndex].chat_id = chat_id
}

io.on("connection", (socket) => {

  socket.on("join_room", (id) => {
    socket.join(id)
  })
  socket.on("userchat", ({user_id, chat_id}) => {
    addChatid(user_id, chat_id)
  })

  socket.on("userchat_update", ({user_id, chat_id}) => {
    updateChatid(user_id, chat_id)
  })
  
  socket.on("private_message", ({user_send, user_receive, message, room_id}) => {
    var fullDate = getFullDate();
    const objIndex = array_id.findIndex((obj => obj.user_id == user_receive));

    if((array_id[objIndex]) && (user_send === array_id[objIndex].chat_id)){
      io.in(room_id).emit("private_message", {user_send, user_receive, message, fullDate })
    }
    insertMessage(user_send, user_receive, message, fullDate)
  })
});
