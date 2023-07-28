const express = require('express');
const router = express.Router();
const User = require('../schema/User')

router.use('/',  (req,res)=>{
    const {email} = req.body; 
    User.find().then(result => result.filter(el=>el.email!==email)).then(e=>res.send(e))
})


module.exports = router;