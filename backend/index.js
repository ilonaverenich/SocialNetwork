const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json())
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://ilonaverenich:CiCvsYz7KuoJKMan@cluster0.gkclzup.mongodb.net/MERN',{
    useNewUrlParser: true,
}).then(res=> console.log('База Данных подключена')).catch(err=>console.log('возникла ошибка к подключении к БД'))


  app.use('/friends', require('./routes/friends.routes'))
  app.use('/likes', require('./routes/likes.routes'))
  app.use('/register', require('./routes/auth.register.routes'))
  app.use('/auth', require('./routes/auth.login.routes'))
  app.use('/posts', require('./routes/posts.routes'))
  app.use('/deletepost', require('./routes/deleteposts.routes'))
  app.use('/status', require('./routes/status.routes'))
  app.use('/main', require('./routes/main.routes'))
  app.use('/img', require('./routes/img.routes'))
  app.use('/editprofile', require('./routes/editprofile.routes'))



app.listen(1000,()=>console.log('server has been started'))