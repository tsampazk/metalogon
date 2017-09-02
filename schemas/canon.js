module.exports = {
    
    name: "canon",
    
    create: Joi.object().options({ stripUnknown: true }).keys({
        id: Joi.string().guid().default(() => uuid.v4(), "v4"),
        name: Joi.string().empty("").max(500),
        description: Joi.string().empty("").max(500)
    }),
    
    update: Joi.object().options({ stripUnknown: true }).keys({
        name: Joi.string().empty("").max(500),
        description: Joi.string().empty("").max(500)
    })
    
};