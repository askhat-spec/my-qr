const CardTypeServices = require('../services/cardTypeServices')

class CardTypeController {
    async createCardType(req, res, next) {
        try {
            const { title } = req.body;
            const newCardType = await CardTypeServices.createCardType(title);

            res.json(newCardType);
        } catch (err) {
            next(err)
        };
    };

    async getAllCardType (req, res, next) {
        try {
            res.json(await CardTypeServices.getAllCardType())
        } catch (err) {
            next(err)
        };
    };

    async getCardType (req, res, next) {
        try {
            res.json(await CardTypeServices.getCardType(req.params.cardTypeId))
        } catch (err) {
            next(err)
        };
    }

    async updateCardType(req, res, next) {
        try {
            const { cardTypeId } = req.params;
            const { newTitle } = req.body;
            const updatedCardType = await CardTypeServices.updateCardType(cardTypeId, newTitle);

            res.json(updatedCardType);
        } catch (err) {
            next(err)
        };
    };

    async deleteCardType(req, res, next) {
        try {
            const { cardTypeId } = req.params;
            const deletedCardType = await CardTypeServices.deleteCardType(cardTypeId);

            res.json(deletedCardType);
        } catch (err) {
            next(err)
        };
    };
}

module.exports = new CardTypeController()