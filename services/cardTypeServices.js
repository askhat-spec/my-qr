const { CardType } = require('../models/models');
const ApiError = require('../exceptions/apiError');

class CardTypeService {
    async createCardType(title) {
        const doesExist = await CardType.findOne({ where: { title } });

        if (doesExist) {
            throw ApiError.BadRequest(`Тип под именем ${title} уже существует`);
        }

        const newCardType = await CardType.create({ title });

        return newCardType;
    };

    async getAllCardType() {
        return await CardType.findAll();
    };

    async getCardType(id) {
        return await CardType.findByPk(id);
    }

    async updateCardType(cardTypeId, newTitle) {
        const cardType = await CardType.findByPk(cardTypeId);

        if (!cardType) {
            throw ApiError.BadRequest('Подобный тип не существует');
        }

        const doesExist = await CardType.findOne({ where: { title: newTitle } });

        if (doesExist) {
            throw ApiError.BadRequest(`Тип под именем ${newTitle} уже существует`);
        }

        const updatedCardType = await cardType.update({ title: newTitle });

        return updatedCardType;
    };

    async deleteCardType(cardTypeId) {
        const cardType = await CardType.findByPk(cardTypeId);

        if (!cardType) {
            throw ApiError.BadRequest('Подобный тип не существует');
        }

        const deletedCardType = await cardType.destroy();
        
        return deletedCardType;
    };
}

module.exports = new CardTypeService()