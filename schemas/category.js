module.exports = {
    
    name: "categories",
    
    create: Joi.object().options({ stripUnknown: true }).keys({
        id: Joi.string().guid().default(() => uuid.v4(), "v4"),
        parentId: Joi.string().guid(),
        name: Joi.string().empty("").max(500),
        canon: Joi.string().max(500),
        description: Joi.string().empty("").max(500)
    }),
    
    update: Joi.object().options({ stripUnknown: true }).keys({
        parentId: Joi.string().guid(),
        name: Joi.string().empty("").max(500),
        canon: Joi.string().max(500),
        description: Joi.string().empty("").max(500)
    })
    
};