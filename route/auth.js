const express = require('express');
const router = express.Router();
//import model
const usersmodel = require('../model/Users')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const verifytoken = require('../route/verifiytoken')
// import validation
//registervalidasi didapat dari validasi.js
const { registervalidasi } = require('../config/validasi')
const { loginvalidasi} = require('../config/validasi')


router.get('/', verifytoken, async (req, res) => {
    try {
        const user = await usersmodel.findById(req.user.id).select('-password')
    res.json(user)

    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error')
    }
  })

//ini adalah register Access /api/users/register
router.post('/register',[
    //
], async (req, res) => {

    const {error} = registervalidasi(req.body)
    if(error) return res.status(400).json({
        status : res.statusCode,
        message : error.details[0].message
    });

    const { nama, email, password } = req.body;

    try{
        //cek email dulu ya
        let emailExist = await usersmodel.findOne({email})
        if(emailExist){
            return res.status(400).json({
                status : res.statusCode,
                message : 'Email sudah digunakan'
            })
        }

        //avatar 
        const avatar = gravatar.url(email, {
            s: '200', // Size
            r: 'pg', // Rate,
            d: 'mm',
          });

          const user = new usersmodel({
            nama,
            email,
            password,
            avatar
        })

    //Hash password
    const salt = await bcryptjs.genSalt(10)
    user.password = await bcryptjs.hash(req.body.password, salt)

     await user.save()

    const payload ={
        usersmodel:{
            id : usersmodel._id
        }
    }

    jwt.sign(
        payload,
        process.env.SECRET_KEY,{
            expiresIn : 360000
        }, ( err,token)=>{
            if(err){
                throw err
            } res.json({token});

        }
    )


    }catch(err){
        res.status(400).json({
            status : res.statusCode,
            message : ' Gagal membuat user'
        });


    }


  

    //save user ke database

});


router.post('/login', async (req, res) => {
    const {error} = loginvalidasi(req.body)
    if(error){
        return  res.status(400).json({
            status : res.statusCode,
            message : error.details[0].message
        })
    }
    
    const {
        email,
        password
      } = req.body;

      try{
            //cek email sek
        let emailExist = await usersmodel.findOne({email})
        if(!emailExist){
            return   res.status(400).json({ 
                status : res.statusCode,
                message : 'Email tidak terdaftar '
            })
        }

        //membandingkan password sek
        const validPasswd = await bcryptjs.compare(password, emailExist.password)
        if(!validPasswd) 
            return res.status(400).json({
                status : res.statusCode,
                message : 'Password Salah'
            });

        const payload = {
            id: {id: emailExist._id}
             }

        jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn : 360000
        },(err,token)=>{
            if(err) throw err;
             res.json({token});
        })

      }catch(err){
        console.log(err.message)
        res.status(400).send('Server Error');
      }
  

   
});

router.get('/', verifytoken, async (req, res) => {
    try{
        const getuser = await usersmodel.findById(req.getuser._id)
         res.json(getuser);
    }catch(err){
        res.status(400).json({
            status : res.statusCode,
            message :err.message
        });
    }

});

module.exports = router