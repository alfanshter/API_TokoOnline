const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

//Middleware
app.use(bodyParser());

//import route
const userRoute = require('./route/user')

app.use('/user', userRoute);

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