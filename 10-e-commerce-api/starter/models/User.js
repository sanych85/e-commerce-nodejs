const mongoose = require('mongoose')
const validator =require ('validator')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        minLength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        validate: {
            message: "please provide valid email",
            validator: validator.isEmail,
        }

    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minLength: 6,
       
    },
    role: {
        type: String,
        enum:['admin', 'user'],
        default: 'user'
    }

})

module.exports = mongoose.model("User", userSchema)