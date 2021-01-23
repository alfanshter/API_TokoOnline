const express = require('express');
const router = express.Router();
const usersmodel = require('../model/Users')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

// import validation
//registervalidasi didapat dari validasi.js
const { registervalidasi } = require('../config/validasi')
const { loginvalidasi} = require('../config/validasi')


//ini adalah register
router.post('/register', async (req, res) => {

    const {error} = registervalidasi(req.body)
    if(error) return res.status(400).json({
        status : res.statusCode,
        message : error.details[0].message
    });

    //Hash password
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(req.body.password, salt)

    //if email exist
    const emailExist = await usersmodel.findOne({email : req.body.email})
    if(emailExist) return   res.status(400).json({
        status : res.statusCode,
        message : 'Email sudah digunakan'
    });

    const user = new usersmodel({
        nama : req.body.nama,
        email : req.body.email,
        password : hashPassword
    })

    //create user
    try{
            const saveUser = await user.save()
             res.json(saveUser);

    }catch(err){
        res.status(400).json({
            status : res.statusCode,
            message : ' Gagal membuat user'
        });

    }

});


router.post('/login', async (req, res) => {
    const {error} = loginvalidasi(req.body)
    if(error){
        return  res.status(400).json({
            status : res.statusCode,
            message : error.details[0].message
        })
    }
    
    //cek email sek
    const emailExist = await usersmodel.findOne({email : req.body.email})
    if(!emailExist){
        return   res.status(400).json({
            status : res.statusCode,
            message : 'Email tidak terdaftar '
        })
    }
    
    //membandingkan password sek
    const validPasswd = await bcryptjs.compare(req.body.password, emailExist.password)
    if(!validPasswd) 
        return res.status(400).json({
            status : res.statusCode,
            message : 'Password Salah'
        });


    //create token oyi ta
    const token = jwt.sign({_id : usersmodel._id},process.env.SECRET_KEY)
        
        res.header('auth-token', token).json({
            token : token
        })
});


module.exports = router