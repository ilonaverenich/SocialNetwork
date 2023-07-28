const express = require('express');
const router = express.Router();
const User = require('../schema/User');
const jwt_decode = require('jwt-decode');

router.use('/',(req,res)=>{
    const {token} = req.body;
    const decodedToken = jwt_decode(token); // Распарсинг токена
    const userId = decodedToken.userId;
    User.findOne({_id:userId}).then(result=>res.json(result)).catch(err=>console.log(err)) 
   ; 
})


module.exports = router;