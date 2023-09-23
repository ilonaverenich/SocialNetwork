const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const User = require('./schema/User');
const Message = require('./schema/Message');

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

mongoose
  .connect('mongodb+srv://ilonaverenich:CiCvsYz7KuoJKMan@cluster0.gkclzup.mongodb.net/MERN', {
    useNewUrlParser: true,
  })
  .then((res) => console.log('База Данных подключена'))
  .catch((err) => console.log('возникла ошибка к подключении к БД'));


io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('privateMessage', async ({ recipient, message, roomName }) => {
    console.log('Received private message on server:', message);
  

    const newMessage = new Message({
      sender: socket.id, 
      recipient: recipient, 
      message: message,
    });
  
    try {
      await newMessage.save();
  
      socket.to(roomName).emit('privateMessage', { sender: socket.id, message,recipient });
    } catch (error) {
      console.error('Ошибка при сохранении сообщения в базе данных:', error);
    }
  });

  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    console.log(roomName);
    io.to(roomName).emit('roomJoined', `Вы успешно присоединились к комнате ${roomName}`);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

app.use('/friends', require('./routes/friends.routes'));
app.use('/users', require('./routes/users.routes')); 
app.use('/likes', require('./routes/likes.routes'));
app.use('/exit', require('./routes/exit.routes'));
app.use('/register', require('./routes/auth.register.routes'));
app.use('/auth', require('./routes/auth.login.routes'));
app.use('/posts', require('./routes/posts.routes'));
app.use('/deletepost', require('./routes/deleteposts.routes'));
app.use('/status', require('./routes/status.routes'));
app.use('/main', require('./routes/main.routes'));
app.use('/img', require('./routes/img.routes'));
app.use('/editprofile', require('./routes/editprofile.routes'));

app.use('/news', (req, res) => {
  User.find().then((result) => res.send(result));
});

server.listen(1000, () => console.log('server has been started'));