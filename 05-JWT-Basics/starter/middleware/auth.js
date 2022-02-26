
const jwt = require('jsonwebtoken') 
const {UnathenticatedError} = require('../errors')
// const CustomAPIError = require("../errors")
const authenticationMiddleware  = async (req, res, next)=> {
    const authHeader  = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnathenticatedError('No taken provided')
        // throw new CustomAPIError('No taken provided', 401)
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
    
        next()
    }
    catch(err) {
        console.log(err)
        throw new UnathenticatedError('Not authorized to access this route')
    }

   
}
module.exports = authenticationMiddleware