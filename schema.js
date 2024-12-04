const Joi = require("joi")

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        description: Joi.string().required(),
        Type: Joi.string().required(),
        price: Joi.number().required().min(0),
    }).required()
})

