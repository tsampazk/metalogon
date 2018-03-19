module.exports = {

    name: "assignments",

    create: Joi.object().options({ stripUnknown: true }).keys({
        id: Joi.string().guid().default(() => uuid.v4(), "v4"),
        classId: Joi.string().guid(),
        title: Joi.string().empty("").max(500),
        description: Joi.string().empty("").max(500),
        genre: Joi.string().guid()
    }),

    update: Joi.object().options({ stripUnknown: true }).keys({
        title: Joi.string().empty("").max(500),
        description: Joi.string().empty("").max(500),
        genre: Joi.string().guid()
    })

};