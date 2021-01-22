const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true
    },
    tanggal_daftar : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Data_Users', UsersSchema)