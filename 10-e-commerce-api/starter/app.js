console.log('E-Commerce API');
require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

//database
const connectDB = require('./db/connect')

const start = async()=> {
   
    try {
        await connectDB(process.env.MONGO_URI) 
        app.listen(port, console.log(`server is listening on ${port}...`))
    }
    catch(err) {
        console.log(err)
    }
}


start()
