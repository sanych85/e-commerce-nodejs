console.log('E-Commerce API');
require('dotenv').config();
require('express-async-errors')

const express = require('express')
const app = express()


//rest of the packages
const morgan = require('morgan')

//database
const connectDB = require('./db/connect')

//routes
const authRouter = require('./routes/authRoutes')

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))



app.use(express.json())
app.get('/', (req,res)=> {
    res.send('e-commerce-api ')
})


app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

//apples


const port = process.env.PORT || 5000
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
