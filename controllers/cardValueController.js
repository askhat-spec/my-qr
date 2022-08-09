const CardValueServices = require('../services/cardValueServices')

class CardValueController {
    async createCardValue (req, res) {
        try {
            req.json(await CardValueServices.createCardValue(req.body))
        } catch (err) {
            next(err)
        };
    };

    async getAllCardValue() {
        try {
            res.json(await CardValueServices.getAllCardValue())
        } catch (err) {
            next(err)
        };
    };

    async getCardValue (req, res) {
        try {
            const { cardValueId } = req.params
            res.json(await CardValueServices.getCardValue(cardValueId))
        } catch (err) {
            next(err)
        };
    };

    async updateCardValue (req, res) {
        try {
            const { cardValueId } = req.params
            const { cardOptionId, value } = req.body
            res.json(await CardValueServices.updateCardValue(cardValueId, cardOptionId, value))
        } catch (err) {
            next(err)
        };
    };

    async deleteCardValue (req, res) {
        try {
            const { cardValueId } = req.params
            res.json(await CardValueServices.deleteCardOption(cardValueId))
        } catch (err) {
            next(err)
        };
    };
}

module.exports = new CardValueController()