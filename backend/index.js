const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./schema/User')
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(cors())
app.use(express.json())
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://ilonaverenich:CiCvsYz7KuoJKMan@cluster0.gkclzup.mongodb.net/MERN',{
    useNewUrlParser: true,
}).then(res=> console.log('БД подключена')).catch(err=>console.log('возникла ошибка к подключении к БД'))

function createToken(userId) {
    const secretKey = 'iloneeechka'; // Замените на свой секретный ключ
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Установите срок действия токена, например, 1 час
    return token;
  }

  
app.use('/friends',  (req,res)=>{
  const {email} = req.body; 
User.find().then(result => result.filter(el=>el.email!==email)).then(e=>res.send(e))

  
  })

  app.post('/likes', async (req, res) => {
    const { id, postId } = req.body;
  
    try {
      // Find the user by id
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the post with the given postId exists in the user's comments array
      const postIndex = user.comments.findIndex(comment => comment.postId === postId);
      if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found in user comments' });
      }
  
      // If the post exists, check if the user has already liked the post
      if (user.comments[postIndex].liked) {
        return res.status(400).json({ error: 'Post already liked by the user' });
      }
  
      // If not liked, set the 'liked' property to true and increase the 'likes' count
      user.comments[postIndex].liked = true;
      user.comments[postIndex].likes++;
  
      // Save the updated user to the database
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } catch (err) {
      console.error('Error handling like:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.post('/register',(req,res)=>{
    const {id, name,surname,email,password} = req.body;
    User.create ({
        id:id,
        name:name,
        surname:surname,
        email:email,
        password:password,
        status:"",
        photo:""

    }).then((result)=>{
        const userId = result.id; 
        const token = createToken(userId);
        res.json({token})
    })
     
})

app.post('/auth',(req,res)=>{ 
    const {email,password} = req.body;

    User.findOne({password:password}).then((result)=>{
      
        if (result && result.password === password && result.email === email) {
            const token = createToken(result._id); 
            res.json({ token });
            
        } else{
            res.status(401).send('Неверный логин или пароль!');
        }
    })
    

})
app.post('/posts', upload.single('image'), (req, res) => {
  const { postId, likes, comment,id } = req.body;
  const image = req.file;
   // Получаем id из заголовка запроса

  User.findOne({_id:id })
    .then((user) => {
      if (user) {
        image !== undefined ? user.comments.push({ postId, likes, comment,image: image.filename}) : user.comments.push({ postId, likes, comment}); // Add the image Buffer to the comment
        return user.save(); // Save the updated user document
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


app.use('/deletepost', (req, res) => {
  const { postId, id } = req.body;
  console.log(postId, id);

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

app.post('/status', (req, res) => {
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

app.use('/main',(req,res)=>{
    const {token} = req.body;
    const decodedToken = jwt_decode(token); // Распарсинг токена
    const userId = decodedToken.userId;
    User.findOne({_id:userId}).then(result=>res.json(result)).catch(err=>console.log(err)) 
   ; 
})
app.use('/img', upload.single('img'), (req, res) => {
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
app.use(('/editprofile',(req,res)=>{
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



app.listen(1000,()=>console.log('server has been started'))