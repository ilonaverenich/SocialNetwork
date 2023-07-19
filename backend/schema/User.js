const {Schema, model} = require ('mongoose');

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
    }
}
)

const User = model('User',UserSchema)

module.exports = User;