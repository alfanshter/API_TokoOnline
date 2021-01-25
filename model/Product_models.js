const moongose = require('mongoose')

const{ObjectId} = moongose.Schema;

const ProdukSchema = new moongose.Schema({
    nama : {
        type : String,
        required : true,
        trim : true,
        maxlength : 200
    },

    keterangan : {
        type : String,
        required : true,
        maxlength :2000
    },

    harga : {
        type : Number,
        required : true,
        trim : true,
        maxlength :32
    },
    kategori :{
        type : ObjectId,
        ref : 'Kategori',
        required : true
    },

    jumlah : {
        type : Number
    },
    terjual : {
        type : Number,
        default : 0
    },

    foto : {
        data : Buffer,
        contentType : String
    },
    dijual : {
        required : false,
        type : Boolean
    }
},{
    timestamps : true
})

module.exports = moongose.model("Produk", ProdukSchema)