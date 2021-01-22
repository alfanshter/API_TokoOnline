const express = require('express');
const Users = require('../model/Users');
const router = express.Router();
const usersmodel = require('../model/Users')


//CREATE
router.post('/', async(req, res) => {
    const user_post = new usersmodel({
        username: req.body.username,
        email : req.body.email
    })

    try{
        const post_Users = await  user_post.save()
         res.json(post_Users);
    }catch(err){
         res.json({message : err});
    }
}); 

//READ
router.get('/', async (req,res)=>{
    try{
        const read_user = await usersmodel.find()
         res.json(read_user);
    }catch{
         res.json({message: err});
    }
})

//UPDATE
router.put('/:users_id', async (req,res)=>{
    try{
        const user_update = await usersmodel.updateOne({_id: req.params.users_id},{
            username : req.body.username,
            email : req.body.email
        })
         res.json(user_update);
    }catch{
         res.json({message : err});
    }
})

//DELETE

router.delete('/:users_id', async (req,res)=>{
    try{
        const user_delete = await usersmodel.deleteOne({_id: req.params.users_id})
         res.json(user_delete);
    }catch{
             res.json(err);
    }
})

module.exports = router