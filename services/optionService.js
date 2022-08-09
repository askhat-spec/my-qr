const { Option } = require('../models/models');
const ApiError = require('../exceptions/apiError');

class OptionService {
    async createOption(optionName) {
        const doesExist = await Option.findOne({ where: { optionName } });

        if (doesExist) {
            throw ApiError.BadRequest(`Опция под именем ${optionName} уже существует`);
        }

        const newOption = await Option.create({ optionName });

        return newOption;
    };

    async getAllOption() {
        return await Option.findAll();
    };

    async getAllOptionByUserId (userId) {
        return await Option.findAll({ where: {userId: userId } });
    };

    async getOption(id) {
        return await Option.findByPk(id);
    };

    async updateOption(optionId, newOptionName) {
        const option = await Option.findByPk(optionId);

        if (!option) {
            throw ApiError.BadRequest('Подобная опция не существует');
        }

        const doesExist = await Option.findOne({ where: { optionName: newOptionName } });

        if (doesExist) {
            throw ApiError.BadRequest(`Опция под именем ${newOptionName} уже существует`);
        }

        const updatedOption = await option.update({ optionName: newOptionName });

        return updatedOption;
    };

    async deleteOption(optionId) {
        const option = await Option.findByPk(optionId);

        if (!option) {
            throw ApiError.BadRequest('Подобная опция не существует');
        }

        const deletedOption = await option.destroy();
        
        return deletedOption;
    };
}

module.exports = new OptionService()