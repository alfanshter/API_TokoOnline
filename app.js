const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require("cors")
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json());

require('dotenv/config')

// Middleware
app.use(cors())
app.use(morgan('dev'));

//import route
const userRoute = require('./route/user')
const AuthRoute = require('./route/auth')
const kategoriRoute = require('./route/kategori_route')

//route yang digunakan
app.use('/api/data', userRoute);
app.use('/api/users', AuthRoute);
app.use('/api/kategori', kategoriRoute);

app.use((req,res)=>{
    res.status(400).json({
        status : res.statusCode,
        message : 'Page not found'
    });
});
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