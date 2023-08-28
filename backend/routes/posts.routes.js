const express = require('express');
const router = express.Router();
const User = require('../schema/User');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), (req, res) => {
    const { postId, likes, comment,id, name,email,surname, icon} = req.body;
    const image = req.file;
  console.log(id,name,email,surname,icon)
    User.findOne({_id:id })
      .then((user) => {
        if (user) {
          image !== undefined ? user.comments.push({ postId, likes, comment,image: image.filename,name,email,surname}) : user.comments.push({ postId, likes, comment, name,email,surname, logo:icon}); 
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