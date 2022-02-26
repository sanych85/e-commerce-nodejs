
const mongoose = require('mongoose');
// const connectionString =
//   'mongodb+srv://sanych_85:02011955Hotash!@mytodoproject.0rnpi.mongodb.net/store?retryWrites=true&w=majority';

const connectDB = (url)=> {
    console.log("try to connect")
    return mongoose
    .connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
}

module.exports = connectDB



