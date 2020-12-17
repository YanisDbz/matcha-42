const express = require('express');
const file = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./config/db');
require('dotenv').config()
const cookieParser = require('cookie-parser');
const { date } = require('faker');
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

function notifyMe() {
  if (Notification.permission === 'granted') {
    const notification = new Notification('Salut toi!')
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const notification = new Notification('Salut toi!')
      }
    })
  }
}

/* Server */
const port = 8081
server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on ${port}`);
});

const allUser = [];

io.on("connection", (socket) => {
  const user = { socket : socket.id };
  socket.on("user_connected", (id) => {
    user.id = id;
    allUser[id] = user;
   })
  socket.on("notification", (data) => {
     io.emit('get_notif', ({
      for: data.for,
      from: data.from,
      type: data.type
    }));
  })

  socket.on('disconnect', () => {
    delete allUser[user.id];
  });
});
