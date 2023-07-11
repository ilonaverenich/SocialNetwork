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
    }
})

const User = model('User',UserSchema)

module.exports = User;