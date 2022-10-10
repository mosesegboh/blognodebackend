require('dotenv').config()
const mongoose = require('mongoose');
const config = require('config')

// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(()=>{
//     console.log('Connected to db')
// }).catch((err)=>console.log(err))
//connect to mongodb
//db config
const db = config.get('mongoURI')
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(`Mongo Db Connected`))
.catch((err) => console.log(err));