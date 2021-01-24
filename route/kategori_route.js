 const express = require('express');
 const router = express.Router();
 const auth = require('../route/verifiytoken')
 const AdminAuth = require('../middleware/admin_auth')
 const Kategori = require('../model/kategori_model')
 const kategory_Id = require('../middleware/kategori_ID')

 const {check, validationResult } = require('express-validator');
const { route } = require('./user');

//ini adalah kategori Access /api/users/kategori
// menambahkan kategori
 router.post('/',[check('nama', 'Nama harus diisi').trim().not().isEmpty()],auth,AdminAuth, async (req, res) => {

    const errors = validationResult(req)
    if(!errors){
        return res.status(400).json({
            error : errors.array()[0].msg
        })
    }

    const{nama} = req.body
    try{
        let kategori = await Kategori.findOne({nama})
        if(kategori){
            return res.status(400).json({
                status : res.statusCode,
                message : 'Kategori sudah tersedia'
            });
        }

        const kategoribaru = new Kategori({nama})
        kategori = await kategoribaru.save()
         res.json(kategori);
    }catch(err){
        console.log(err);
        res.status(400).json({
            status : res.statusCode,
            message : 'Server Error'
        });

    }


 
 })

// membaca kategori 
//ini adalah kategori Access /api/users/kategori/all
router.get('/all', async (req, res) => {
    try {
        const read_kategori = await Kategori.find()
         res.json(read_kategori);
    } catch (error) {
        res.status(400).json({
            status : status.statusCode,
            message : 'Server Error'
        })
    }

});

router.get('/:kategori_Id', kategory_Id, async (req, res) => {
     res.json(req.kategori);

});

 module.exports = router

