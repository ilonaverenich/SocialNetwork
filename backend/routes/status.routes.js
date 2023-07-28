const express = require('express');
const router = express.Router();
const User = require('../schema/User')

router.post('/', (req, res) => {
    const { statusData, email } = req.body;
  
    User.updateOne({ email: email }, { $set: { status: statusData } })
      .then(() => {
        User.findOne({email:email})
          .then(users => {
            res.status(200).json(users);
          })
          .catch(error => {
            console.error(error);
            res.sendStatus(500);
          });
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  });

module.exports = router;