const CardService = require('../services/cardService')

class CardController {
    async createCard(req, res, next) {
        try {
            const userId = req.user.id
            const { cardTypeId, cardOptions } = req.body
            res.json(await CardService.createCard(userId, cardTypeId, cardOptions))
        } catch (err) {
            next(err)
        };
    };

    async getCard(req, res, next) {
        try {
            const { id } = req.params
            res.json(await CardService.getCard(id))
        } catch (err) {
            next(err)
        };
    };

    async getAllCard(req, res, next) {
        try {
            const { userId } = req.body
            res.json(await CardService.getAllCard(userId))
        } catch (err) {
            next(err)
        };
    };

    async getAllCardByUser(req, res, next) {
        try {
            res.json(await CardService.getAllCard(req.user.id))
        } catch (err) {
            next(err)
        };
    };
}

module.exports = new CardController()