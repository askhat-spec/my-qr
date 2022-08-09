const OptionService = require('../services/optionService');

class OptionController {
    async createOption(req, res, next) {
        try {
            const { optionName } = req.body;
            const newOption = await OptionService.createOption(optionName);

            res.json(newOption);
        } catch (err) {
            next(err);
        };
    };

    async getAllOption (req, res) {
        try {
            res.json(await OptionService.getAllOption());
        } catch (err) {
            next(err);
        };
    };

    async getAllOptionByUserId (req, res) {
        try {
            res.json(await OptionService.getAllOptionByUserId(req.user.id));
        } catch (err) {
            next(err);
        };
    };

    async getOption (req, res) {
        try {
            res.json(await OptionService.getOption(req.params.optionId));
        } catch (err) {
            next(err);
        };
    };

    async updateOption(req, res, next) {
        try {
            const { optionId } = req.params;
            const { newOptionName } = req.body;
            const updatedOption = await OptionService.updateOption(optionId, newOptionName);

            res.json(updatedOption);
        } catch (err) {
            next(err);
        };
    };

    async deleteOption(req, res, next) {
        try {
            const { optionId } = req.params;
            const deletedOption = await OptionService.deleteOption(optionId);

            res.json(deletedOption);
        } catch (err) {
            next(err);
        };
    };
}

module.exports = new OptionController();