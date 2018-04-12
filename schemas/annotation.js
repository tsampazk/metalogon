module.exports = {

    name: "annotations",

    create: Joi.object().options({ stripUnknown: true }).keys({
        id: Joi.string().guid().default(() => uuid.v4(), "v4"),
        createdAt: Joi.date().default(Date.now, "Creation date"),
        videoId: Joi.string().guid(),
        label: Joi.string().max(200),
        author: Joi.string().empty("").max(500),
        category: Joi.string().max(500),
        canon: Joi.string().max(500),
        comment: Joi.string().empty("").max(500),
        from: Joi.string().max(20),
        to: Joi.string().max(20),
        rating: Joi.number().integer()
    }),

    update: Joi.object().options({ stripUnknown: true }).keys({
        label: Joi.string().max(200),
        author: Joi.string().empty("").max(500),
        category: Joi.string().max(500),
        canon: Joi.string().max(500),
        comment: Joi.string().empty("").max(500),
        from: Joi.string().max(20),
        to: Joi.string().max(20),
        rating: Joi.number().integer()
    })

};