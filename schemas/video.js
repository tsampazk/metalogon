module.exports = {
    
    name: "videos",
    
    create: Joi.object().options({ stripUnknown: true }).keys({
        id: Joi.string().guid().default(() => uuid.v4(), "v4"),
        createdAt: Joi.date().default(Date.now, "Creation date"),
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
        sources: Joi.array().items(
            Joi.object().options({ stripUnknown: true }).keys({
                width: Joi.number().integer(),
                height: Joi.number().integer(),
                type: Joi.string().max(100),
                label: Joi.string().max(100),
                file: Joi.string().uri(),
            })
        )
    }),
    
    update: Joi.object().options({ stripUnknown: true }).keys({
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
        sources: Joi.array().items(
            Joi.object().options({ stripUnknown: true }).keys({
                width: Joi.number().integer(),
                height: Joi.number().integer(),
                type: Joi.string().max(100),
                label: Joi.string().max(100),
                file: Joi.string().uri(),
            })
        )
    })
    
};