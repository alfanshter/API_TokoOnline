const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require("cors")
require('dotenv/config')

// Middleware
app.use(cors())
app.use(bodyParser())

//import route
const userRoute = require('./route/user')
const AuthRoute = require('./route/auth')
//route yang digunakan
app.use('/api/data', userRoute);
app.use('/api/users', AuthRoute);

//connect db
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology : true})
let db = mongoose.connection

db.on('error', console.error.bind(console, 'Datbase Connect Error'))
db.once('open', ()=>{
    console.log('Database konek')
})


//listen
app.listen(process.env.PORT, () => {
    console.log(`server berjalan di ${process.env.PORT}`);
});

module.exports = app;