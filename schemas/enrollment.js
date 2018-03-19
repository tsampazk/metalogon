module.exports = {

    name: "enrollments",

    create: Joi.object().options({ stripUnknown: true }).keys({
        id: Joi.string().guid().default(() => uuid.v4(), "v4"),
        createdAt: Joi.date().default(Date.now, "Creation date"),
        classId: Joi.string().guid(),
        userId: Joi.string().guid(),
        accepted: Joi.boolean().default(false)
    }),

    update: Joi.object().options({ stripUnknown: true }).keys({
        classId: Joi.string().guid(),
        userId: Joi.string().guid(),
        accepted: Joi.boolean().default(false)
    })

};