const mongoose = require('mongoose')
const validator =require ('validator')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
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
        },
        unique: true

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

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword  = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema);