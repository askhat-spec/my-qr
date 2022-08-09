const { CardPreset, CardType, CardOption, Option } = require('../models/models');
const ApiError = require('../exceptions/apiError');

class CardPresetService {
    async createCardPreset (cardTypeId, cardOptionId) {
        const cardType = await CardType.findByPk(cardTypeId)
        const cardOption = await CardOption.findByPk(cardOptionId)
        return cardType.addCard_options(cardOption, { through: CardPreset })
    };

    async getAllCardPreset() {
        return await CardPreset.findAll();
    };

    async getCardTypePreset (cardTypeId) {
        return await CardType.findByPk(cardTypeId, {
            include: [{
                model: CardOption, 
                include: [Option]
            }]
        });
    };

    async getCardOptionPreset (cardOptionId) {
        return await CardOption.findByPk(cardOptionId, {
            include: CardType
        });
    };
}

module.exports = new CardPresetService()