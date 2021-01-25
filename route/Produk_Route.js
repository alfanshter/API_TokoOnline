const express = require('express');
const router = express.Router();
const Produk_models = require('../model/Product_models')
const auth = require('../route/verifiytoken')
const authAdmin = require('../middleware/admin_auth')
const formidable = require('formidable')
const fs = require('fs')


//@route post api//produk/
//@desc  Create a product
//@Access Private Admin
router.post('/', auth,authAdmin, (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, async (err,field,files)=>{
        if(err){
            return res.status(400).json({
                status : res.statusCode,
                message : 'Image could not be upload'
            });
        }

        if(!files.foto){
            return res.status(400).json({
                status : res.statusCode,
                message : 'image is required'
            });
        }

        if(files.foto.type !== 'image/jpeg' && files.foto.type !== 'image/jpeg' && files.foto.type!=='image/jpeg'){
            return res.status(400).json({
                status : res.statusCode,
                message : 'Image type not allowed'
            })
        }

        //check all fields
        const {nama, keterangan, harga, kategori, jumlah , dijual} = field;
        console.log(field);

        if(!nama || !keterangan || !harga || !kategori ||!jumlah || !dijual){
            return res.status(400).json({
                status : res.statusCode,
                message : 'All field are required'
            });
        }

        let produk = new Produk_models(field)
        // 1MB = 1000000
        if(files.foto.size > 1000000){
            return res.status(400).json({
                status : res.statusCode,
                message : 'Image should be less than 1MB in size'
            });
        }

        produk.foto.data  = fs.readFileSync(files.foto.path)
        produk.foto.contentType = files.foto.type 

        try {
            await produk.save()
             res.json('Produk created Success');
        } catch (error) {
            console.log(error);
            res.status(400).send('Server Error');
        }
        
    })

});

module.exports = router 