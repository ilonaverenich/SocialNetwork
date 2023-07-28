const express = require('express');
const router = express.Router();
const User = require('../schema/User');

router.use('/', (req, res) => {
    const { postId, id } = req.body;
  
    User.findOne({ _id: id })
      .then((user) => {
        if (user) {
          user.comments.pull({ postId: postId });
          return user.save();
        } else {
          throw new Error('Пользователь не найден');
        }
      })
      .then((savedUser) => {
        res.status(200).json(savedUser); 
      })
      .catch((err) => {
        console.error('Ошибка при сохранении комментария:', err);
        res.status(500).json({ error: 'Не удалось удалить комментарий' });
      });
  });


module.exports = router;