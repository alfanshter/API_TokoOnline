const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    nama:{
        type : String,
        required : true,
        max: 255
    },
    email:{
        type : String,
        required : true,
        max: 100
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
    }

})

module.exports = mongoose.model('User',userSchema)


// const User = mongoose.model(
//     "User",
//     new mongoose.Schema({
//         username:{
//             type  : String,
//             required : true
//         },
//         email : {
//             type : String,
//             required : true
//         },
//         password : {
//             type : String,
//             required : true
//         },
//         tanggal_daftar: {
//             type : Date,
//             default : Date.now
//         },
//         role :[{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Role"
//         }
//         ]
//     })
// )


// module.exports = mongoose.model('Data_Users', UsersSchema)