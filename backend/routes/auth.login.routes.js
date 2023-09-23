const express = require('express');
const router = express.Router();
const User = require('../schema/User')
const jwt = require('jsonwebtoken');


router.post('/',(req,res)=>{ 
    function createToken(userId) {
      const secretKey = 'iloneeechka'; 
      const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); 
      return token;
    }
    const { email, password } = req.body;

    User.findOne({ password: password, email: email }).then((result) => {
        if (result && result.password === password && result.email === email) {
           console.log(result._id)
            User.findOneAndUpdate(
                { _id: result._id },
                { $set: { active: true } }, 
                { new: true }
            )
                .then((qwerty) => {
                  console.log(qwerty)
                    const token = createToken(result._id);
                    res.json({ token });
                })
                .catch((error) => {
                    console.error('Ошибка при обновлении поля active:', error);
                    res.status(500).send('Внутренняя ошибка сервера');
                });
        } else {
            res.status(401).send('Неверный логин или пароль!');
        }
    });
  
  })

  
module.exports = router;