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
app.use('/img',upload.single('img'),(req,res)=>{
  const {email} = req.body;
  const img = req.file;
  const imagePath = img.filename;
   
 
  User.findOneAndUpdate(
    { email: email },
    {

      image:imagePath
    },
    { new: true }
  )
    .then(updatedUser => {
      console.log('dddd',updatedUser)
      res.json(updatedUser);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });

  res.json(imagePath)
  
})
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