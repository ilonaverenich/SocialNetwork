const express = require('express');
const router = express.Router();
const User = require('../schema/User')
const jwt = require('jsonwebtoken');


router.post('/',(req,res)=>{ 
    function createToken(userId) {
      const secretKey = 'iloneeechka'; // Замените на свой секретный ключ
      const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Установите срок действия токена, например, 1 час
      return token;
    }
      const {email,password} = req.body;
  
      User.findOne({password:password}).then((result)=>{
        
          if (result && result.password === password && result.email === email) {
              const token = createToken(result._id); 
              res.json({ token });
              
          } else{
              res.status(401).send('Неверный логин или пароль!');
          }
      })
      
  
  })

  
module.exports = router;