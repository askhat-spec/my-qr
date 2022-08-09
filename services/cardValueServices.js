const { CardValue } = require('../models/models');
const ApiError = require('../exceptions/apiError');

class CardValueService {
    async createCardValue (cardId, value) {
        if (!cardId){
            throw ApiError.BadRequest("Карта не выбрана")
        }

        if (!value){
            throw ApiError.BadRequest("Укажите данные")
        }

        return await CardValue.create({ cardId: cardId, value: value })
    };

    async getAllCardValue() {
        return await CardValue.findAll();
    };

    async getCardValue (id) {
        return await CardValue.findByPk(id);
    };

    async updateCardValue (id, cardOptionId, value) {
        const cardValue = await CardValue.findByPk(id);
        await cardValue.update({ cardOptionId: cardOptionId, value: value });
        await cardValue.save();
        return cardValue;
    };

    async deleteCardValue (id) {
        const cardValue = await CardValue.findByPk(id);
        await cardValue.destroy();
        return { message: "CardValue successfully deleted!" };
    };
}

module.exports = new CardValueService();