const Joi = require('joi');

const registrationSchema = Joi.object({
    email: Joi.string().email(),
    username: Joi.string().alphanum().min(2).max(30),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9&%$#@]{6,30}$')),
});

module.exports = registrationSchema;