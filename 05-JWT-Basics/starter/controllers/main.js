
const jwt = require('jsonwebtoken') 
const {BadRequestError} = require('../errors')
// const CustomAPIError = require("../errors/custom-error")
const login = async (req, res)=> {
    const {username, password} = req.body
    //mongoose validation
    // joi
    //check in the controller
    if(!username || !password)  {
        throw new BadRequestError('Please provide email and password')
    }

    const id = new Date().getDate()
    const token = jwt.sign({username, id},process.env.JWT_SECRET, {expiresIn:'30d'})
    res.status(200).json({msg:'user created', token})

    console.log(username, password)
    res.send('Fake login/register/sign up')

}

const dashboard = async(req, res)=>{
    const luckyNumber= Math.floor(Math.random()*100)        
    res.status(200).json({msg: `Hello , ${req.user.username}`, secret: `Your lucky number is ${luckyNumber}`})
}


   


module.exports = {
    login, dashboard
}