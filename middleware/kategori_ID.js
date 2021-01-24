const moongose = require('mongoose')
const Kategori = require('../model/kategori_model')

module.exports = async function (req,res,next) {
    const {kategori_Id} = req.params

    if(!moongose.Types.ObjectId.isValid(kategori_Id)){
        return res.status(400).json({
            status : res.statusCode,
            message : 'Kategori tidak ditemukan'
        });
    }

    try {
        let kategori = await Kategori.findById(kategori_Id)
        if(!Kategori){
            return res.status(400).json({
                status : res.statusCode,
                message : 'Kategori tidak ditemukan'
            });
    
        }
        req.kategori = kategori
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status : res.statusCode,
            message : 'Server Error'
        });

    }
    
}