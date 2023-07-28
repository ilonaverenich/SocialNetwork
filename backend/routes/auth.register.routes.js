const express = require('express');
const router = express.Router();
const User = require('../schema/User')
const jwt = require('jsonwebtoken');

router.use('/',(req,res)=>{
    function createToken(userId) {
        const secretKey = 'iloneeechka'; // Замените на свой секретный ключ
        const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Установите срок действия токена, например, 1 час
        return token;
      }
    const {id, name,surname,email,password} = req.body;
    User.create ({
        id:id,
        name:name,
        surname:surname,
        email:email,
        password:password,
        status:"",
        photo:""

    }).then((result)=>{
        const userId = result.id; 
        const token = createToken(userId);
        res.json({token})
    })
     
})



module.exports = router;