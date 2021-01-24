const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nama:{
        type : String,
        required : true,
        max: 255
    },
    email:{
        type : String,
        required : true,
        max: 100,
        unique : true
    },

    password:{
        type : String,
        required : true,
        min: 6,
        max : 1024
    },
    created_at:{
        type : Date,
        default : Date.now
    },

    role : {
        type : Number,
        default : 0
    },
    avatar : {
        type : String,
        required : true
    },
    history :{
        type : Array,
        default : [],
    },

})

module.exports = mongoose.model('User',userSchema)

