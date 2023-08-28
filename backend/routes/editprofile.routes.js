const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const User = require('../schema/User');

router.use('/', upload.single('photo'), async (req, res) => {
  const photo = req.file;
  const imagePath = photo ? photo.filename : '';
  console.log(imagePath);

  const { email, gender, cityOfResidence, dateOfBirth, maritalStatus, placeOfWork, interests } = req.body;
  console.log(email, gender, cityOfResidence, dateOfBirth, maritalStatus, placeOfWork, interests);

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const updatedFields = {};
    (gender !== undefined) ? updatedFields.gender = gender : ' ' ;
    if (cityOfResidence !== undefined) updatedFields.cityOfResidence = cityOfResidence;
    if (dateOfBirth !== undefined) updatedFields.dateOfBirth = dateOfBirth;
    if (maritalStatus !== undefined) updatedFields.maritalStatus = maritalStatus;
    if (placeOfWork !== undefined) updatedFields.placeOfWork = placeOfWork;
    if (interests !== undefined) updatedFields.interests = interests;
    if (imagePath) updatedFields.image = imagePath;
    console.log(updatedFields)
    const updatedUser = await User.findOneAndUpdate({ email }, updatedFields, { new: true });
    

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;