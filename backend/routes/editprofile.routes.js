const express = require('express');
const router = express.Router();
const User = require('../schema/User')

router.use(('/editprofile',(req,res)=>{
    const {email,gender,cityOfResidence,dateOfBirth,maritalStatus,placeOfWork,interests} = req.body;
  
    User.findOneAndUpdate(
      { email: email },
      {
        gender: gender,
        cityOfResidence: cityOfResidence,
        dateOfBirth: dateOfBirth,
        maritalStatus: maritalStatus,
        placeOfWork: placeOfWork,
        interests: interests,
      },
      { new: true }
    )
      .then(updatedUser => {
        res.json(updatedUser);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  
  
  }))
  


module.exports = router;