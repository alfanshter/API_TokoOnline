const Joi = require("joi")

const registervalidasi = (data)=>{
    const schema = Joi.object({
        nama : Joi.string()
                .required(),
        email : Joi.string()
                .required()
                .email(),
        password: Joi.string()
                .required()
                .min(6),
        avatar: Joi.string()
                .required()
    })

    return schema.validate(data)
}


const loginvalidasi = (data)=>{
    const schema = Joi.object({
        email : Joi.string()
                .required()
                .email(),
        password : Joi.string()
                .required()
                .min(6)
    })

    return schema.validate(data)
}

module.exports.registervalidasi = registervalidasi
module.exports.loginvalidasi = loginvalidasi