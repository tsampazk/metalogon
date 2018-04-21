module.exports = {
    
    name: "classes",
    
    create: Joi.object().options({ stripUnknown: true }).keys({
        id: Joi.string().guid().default(() => uuid.v4(), "v4"),
        professorId: Joi.string().guid(),
        archived: Joi.boolean().required(),
        department: Joi.string().empty("").max(500),
        name: Joi.string().empty("").max(500),
        number: Joi.string().empty("").max(500),
        semester: Joi.string().empty("").max(500),
        catFilter: Joi.array()
    }),
    
    update: Joi.object().options({ stripUnknown: true }).keys({
        professorId: Joi.string().guid(),
        archived: Joi.boolean().required(),
        department: Joi.string().empty("").max(500),
        name: Joi.string().empty("").max(500),
        number: Joi.string().empty("").max(500),
        semester: Joi.string().empty("").max(500),
        catFilter: Joi.array()
    })
    
};