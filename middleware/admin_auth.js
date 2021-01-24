const UsersModel = require('../model/Users')

module.exports = async function (req,res,next) {
    try{
        //get user information by Id
        const user = await UsersModel.findOne({
            _id: req.user.ids
        })

        console.log(user)

        if(user.role === 0){
            return res.status(400).json({
                error : 'Khusus untuk admin'
            });
        }

        next()
    }catch(err){
        console.log(err)
        res.status(400).send('Server error');
    }
    
}