module.exports = {
    
    name: "class",
    
    create: Joi.object().options({ stripUnknown: true }).keys({
        id: Joi.string().guid().default(() => uuid.v4(), "v4"),
        title: Joi.string().empty("").max(500),
        spring: Joi.string().empty("").max(500)
    }),
    
    update: Joi.object().options({ stripUnknown: true }).keys({
        title: Joi.string().empty("").max(500),
        spring: Joi.string().empty("").max(500)
    })
    
};