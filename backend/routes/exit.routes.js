const express = require('express');
const router = express.Router();
const User = require('../schema/User');

router.post('/', (req, res) => {
    const { userId } = req.body; 

    User.findOneAndUpdate(
        { _id: userId },
        { $set: { active: false } },
        { new: true }
    )
    .then((qwerty) => {
      console.log(qwerty)
        res.json({ message: 'Выход успешно выполнен' });
    })
    .catch((error) => {
        console.error('Ошибка при обновлении поля active:', error);
        res.status(500).send('Внутренняя ошибка сервера');
    });
});

module.exports = router;