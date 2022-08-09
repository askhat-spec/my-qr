const CardOptionService = require('../services/cardOptionService')

class CardOptionController {
    async createCardOption (req, res) {
        try {
            const { optionId, title } = req.body
            res.json(await CardOptionService.createCardOption(optionId, title))
        } catch (err) {
            next(err)
        };
    };

    async getAllCardOption (req, res) {
        try {
            res.json(await CardOptionService.getAllCardOption())
        } catch (err) {
            next(err)
        };
    };

    async getCardOption (req, res) {
        try {
            const { cardOptionId } = req.params
            res.json(await CardOptionService.getCardOption(cardOptionId))
        } catch (err) {
            next(err)
        };
    };

    async updateCardOption (req, res) {
        try {
            const { cardOptionId } = req.params
            const { title } = req.body
            res.json(await CardOptionService.updateCardOption(cardOptionId, title))
        } catch (err) {
            next(err)
        };
    };

    async deleteCardOption (req, res) {
        try {
            const { cardOptionId } = req.params
            req.json(await CardOptionService.deleteCardOption(cardOptionId))
        } catch (err) {
            next(err)
        };
    };
}

module.exports = new CardOptionController()