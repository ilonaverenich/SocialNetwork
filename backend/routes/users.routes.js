const express = require('express');
const router = express.Router();
const User = require('../schema/User')

router.post('/', (req, res) => {
    const {  user } = req.body;
    console.log(user)
     User.findOne({email:user})
          .then(users => {
            res.status(200).json(users);
          })
          .catch(error => {
            console.error(error);
            res.sendStatus(500);
          });
      }); 
module.exports = router;