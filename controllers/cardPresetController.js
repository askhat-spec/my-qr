const CardPresetServices = require('../services/cardPresetServices')

class CardPresetController {
    async createCardPreset (req, res, next) {
        try {
            const { cardTypeId, cardOptionId } = req.body
            res.json(await CardPresetServices.createCardPreset(cardTypeId, cardOptionId))
        } catch (err) {
            next(err)
        };
    };

    async getAllCardPreset (req, res, next) {
        try {
            res.json(await CardPresetServices.getAllCardPreset())
        } catch (err) {
            next(err)
        };
    };

    async getCardTypePreset (req, res, next) {
        try {
            const { cardTypeId } = req.params
            res.json(await CardPresetServices.getCardTypePreset(cardTypeId))
        } catch (err) {
            next(err)
        };
    };

    async getCardOptionPreset (req, res, next) {
        try {
            const { cardOptionId } = req.params
            res.json(await CardPresetServices.getCardOptionPreset(cardOptionId))
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new CardPresetController()