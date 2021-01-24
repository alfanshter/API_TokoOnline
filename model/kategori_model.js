const mongoose = require('mongoose')

const KategoriSchema = new mongoose.Schema({
    nama : {
        type : String,
        required : true,
        trim : true,
        maxlength : 32,
        unique : true

    }
},{
    timestamps : true
}
)

module.exports = User = mongoose.model('Kategori_model', KategoriSchema )