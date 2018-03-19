module.exports = {

    name: "users",

    create: Joi.object().options({ stripUnknown: true }).keys({
        id: Joi.string().guid().default(() => uuid.v4(), "v4"),
        createdAt: Joi.date().default(Date.now, "Creation date"),
        role: Joi.string().valid(["administrator", "professor", "student"]).default("student", "Default role"),
        email: Joi.string().email().required(),
        firstName: Joi.string().max(100),
        lastName: Joi.string().max(100),
        hash: Joi.string(),
        salt: Joi.string(),
        token: Joi.string().guid()
    }),

    update: Joi.object().options({ stripUnknown: true }).keys({
        firstName: Joi.string().max(100),
        lastName: Joi.string().max(100),
        hash: Joi.string(),
        salt: Joi.string(),
        token: Joi.string().guid()
    })

};