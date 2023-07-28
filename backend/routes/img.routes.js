const express = require('express');
const router = express.Router();
const User = require('../schema/User')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.use('/', upload.single('img'), (req, res) => {
    const { email } = req.body;
    const img = req.file;
    const imagePath = img.filename;
  
    User.findOneAndUpdate(
      { email: email },
      {
        image: imagePath,
      },
      { new: true }
    )
      .then(updatedUser => {
        res.json(updatedUser);
      })
      .catch(error => {
        console.error(error);
    
      });
  });


module.exports = router;