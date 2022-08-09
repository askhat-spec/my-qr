const ApiError = require('../exceptions/apiError');
const Joi = require('joi');
const Validators = require('../validators');

module.exports = function (validator) {
    if (!Validators.hasOwnProperty(validator)) {
        throw new Error(`Валидатор под именем ${validator} не существует`);
    }

    return async function (req, res, next) {
        try {
            const validated = await Validators[validator].validateAsync(req.body, {abortEarly: false});

            req.body = validated;

            next();
        } catch (e) {
            if (e?.isJoi) {
                console.log(e)
                return next(ApiError.BadRequest('Ошибка при валидации', e?.details));
            }
            return next(e);
        }
    }
}