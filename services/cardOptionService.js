const { CardOption } = require('../models/models');
const ApiError = require('../exceptions/apiError');

class CardOptionService {
    async createCardOption ( optionId, title) {
        return await CardOption.create({  optionId, title });
    };

    async getAllCardOption() {
        return await CardOption.findAll();
    };

    async getCardOption (id) {
        return await CardOption.findByPk(id);
    };

    async updateCardOption (id, title) {
        const cardOption = await CardOption.findByPk(id);
        await cardOption.update({ title: title });
        await cardOption.save();
        return cardOption;
    };

    async deleteCardOption (id) {
        const cardOption = await CardOption.findByPk(id);
        await cardOption.destroy();
        return { message: "CardOption successfully deleted!"};
    };
}

module.exports = new CardOptionService();