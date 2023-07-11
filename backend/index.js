const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./schema/User')
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://ilonaverenich:CiCvsYz7KuoJKMan@cluster0.gkclzup.mongodb.net/MERN',{
    useNewUrlParser: true,
}).then(res=> console.log('БД подключена')).catch(err=>console.log('возникла ошибка к подключении к БД'))

function createToken(userId) {
    const secretKey = 'iloneeechka'; // Замените на свой секретный ключ
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Установите срок действия токена, например, 1 час
    return token;
  }
app.post('/register',(req,res)=>{
    const {id, name,surname,email,password} = req.body;
    console.log(name,surname,email,password);
    User.create ({
        id:id,
        name:name,
        surname:surname,
        email:email,
        password:password

    }).then((result)=>{
        const userId = result.id; 
        const token = createToken(userId);
        res.json({token})
    })
     
})

app.post('/auth',(req,res)=>{
    const {token} = req.body;
    decoded = jwt_decode(token)
    console.log(decoded)
    User.findOne({id:decoded.userId}).then(r=>console.log(r))
    res.json(decoded)
})

app.get('/users',(req,res)=>{
    
})


app.listen(1000,()=>console.log('server has been started'))