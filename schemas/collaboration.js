module.exports = {

    name: "collaborations",

    create: Joi.object().options({ stripUnknown: true }).keys({
        id: Joi.string().guid().default(() => uuid.v4(), "v4"),
        createdAt: Joi.date().default(Date.now, "Creation date"),
        videoId: Joi.string().guid(),
        userId: Joi.string().guid(),
        classId: Joi.string().guid()
    }),

    update: Joi.object().options({ stripUnknown: true }).keys({
        videoId: Joi.string().guid(),
        userId: Joi.string().guid(),
        classId: Joi.string().guid()
    })

};