const express = require('express');
const router = express.Router();
const User = require('../schema/User')


router.post('/', async (req, res) => {
    const { id, postId } = req.body;
  
    try {

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден!!' });
      }
  
      const postIndex = user.comments.findIndex(comment => comment.postId === postId);
      if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found in user comments' });
      }
  
      if (user.comments[postIndex].liked) {
        return res.status(400).json({ error: 'Post already liked by the user' });
      }
  
          user.comments[postIndex].liked = true;
      user.comments[postIndex].likes++;
  
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } catch (err) {
      console.error('Error handling like:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;