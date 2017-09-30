module.exports = {
    
    name: "video",
    
    create: Joi.object().options({ stripUnknown: true }).keys({
        id: Joi.string().guid().default(() => uuid.v4(), "v4"),
        title: Joi.string().empty("").max(500),
        class: Joi.string().max(500),
        genre: Joi.string().max(500),
        link: Joi.string().uri(),
        thumb: Joi.string().uri(),
        duration: Joi.number().integer(),
        jwVideoId: Joi.string().max(150),
        presentedAt: Joi.date(),
        createdAt: Joi.date().default(Date.now, "Creation date"),
        sources: Joi.array().items(
            Joi.object().options({ stripUnknown: true }).keys({
                width: Joi.number().integer(),
                height: Joi.number().integer(),
                type: Joi.string().max(100),
                label: Joi.string().max(100),
                file: Joi.string().uri(),
            })
        ),
        annotations: Joi.array().items(
            Joi.object().options({ stripUnknown: true }).keys({
                id: Joi.number().integer(),
                label: Joi.string().max(100),
                author: Joi.string().empty("").max(500),
                category: Joi.string().max(500),
                canon: Joi.string().max(500),
                comment: Joi.string().empty("").max(500),
                from: Joi.string().max(20),
                to: Joi.string().max(20),
                rating: Joi.number().integer(),
            })
        )
    }),
    
    update: Joi.object().options({ stripUnknown: true }).keys({
        title: Joi.string().empty("").max(500),
        class: Joi.string().max(500),
        genre: Joi.string().max(500),
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
        ),
        annotations: Joi.array().items(
            Joi.object().options({ stripUnknown: true }).keys({
                id: Joi.number().integer(),
                label: Joi.string().max(100),
                author: Joi.string().empty("").max(500),
                category: Joi.string().max(500),
                canon: Joi.string().max(500),
                comment: Joi.string().empty("").max(500),
                from: Joi.string().max(20),
                to: Joi.string().max(20),
                rating: Joi.number().integer(),
            })
        )
    })
    
};