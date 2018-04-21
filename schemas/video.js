module.exports = {
    
    name: "videos",
    
    create: Joi.object().options({ stripUnknown: true }).keys({
        id: Joi.string().guid().default(() => uuid.v4(), "v4"),
        createdAt: Joi.date().default(Date.now, "Creation date"),
        status: Joi.number().integer(),
        title: Joi.string().empty("").max(500),
        class: Joi.string().max(500),
        classNumber: Joi.string().max(500),
        classDepartment: Joi.string().max(500),
        genre: Joi.string().max(500),
        featuredGlobal: Joi.boolean().required(),
        featuredClass: Joi.boolean().required(),
        link: Joi.string().uri(),
        thumb: Joi.string().uri(),
        duration: Joi.number().integer(),
        jwVideoId: Joi.string().max(150),
        presentedAt: Joi.date(),
        assignmentId: Joi.string().guid()
    }),
    
    update: Joi.object().options({ stripUnknown: true }).keys({
        status: Joi.number().integer(),
        title: Joi.string().empty("").max(500),
        class: Joi.string().max(500),
        classNumber: Joi.string().max(500),
        classDepartment: Joi.string().max(500),
        genre: Joi.string().max(500),
        featuredGlobal: Joi.boolean(),
        featuredClass: Joi.boolean(),
        link: Joi.string().uri(),
        thumb: Joi.string().uri(),
        duration: Joi.number().integer(),
        jwVideoId: Joi.string().max(150),
        presentedAt: Joi.date(),
        assignmentId: Joi.string().guid()
    })
    
};