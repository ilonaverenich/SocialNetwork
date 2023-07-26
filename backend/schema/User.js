const {Schema, model} = require ('mongoose');

const CommentSchema = new Schema({
    postId: String,
    comment: String,
    likes: Number,
    image: {
        type: String,
        required: false // Необязательное поле
      },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });


const UserSchema = new Schema ({
    id: String,
    name: String,
    surname: String, 
    email: {
        type: String,
        unique: true, 
        required: true 
    },
    password: {
        type: String,
        minlength: 2
    },
    profileImage: {
        type: String,
    },
    status: {
        type: String
    },
    gender:{
        type: String
    },
    cityOfResidence:{
        type: String
    },
    dateOfBirth: {
        type: String
    },
    maritalStatus:{
        type: String
    },
    placeOfWork:{
        type: String
    },
    interests:{
        type: String
    },
    image: {
        type:String
    },
    comments: [CommentSchema],
}
)

const User = model('User',UserSchema)

module.exports = User;