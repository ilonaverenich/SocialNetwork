const express = require('express');
const router = express.Router();
const User = require('../schema/User');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), (req, res) => {
    const { postId, likes, comment,id } = req.body;
    const image = req.file;
  
    User.findOne({_id:id })
      .then((user) => {
        if (user) {
          image !== undefined ? user.comments.push({ postId, likes, comment,image: image.filename}) : user.comments.push({ postId, likes, comment}); 
          return user.save(); 
        } else {
          throw new Error('User not found');
        }
      })
      .then((savedUser) => {
        res.status(200).json(savedUser);
      })
      .catch((err) => {
        console.error('Error saving comment:', err);
        res.sendStatus(500);
      });
  });


module.exports = router;