const path = require('path');
const QRCode = require('qrcode');
const { Card, CardOption, CardValue, Option, CardType } = require('../models/models');
const ApiError = require('../exceptions/apiError');
const db = require('../db')

class CardService {
    // Card Services
    async createCard (userId, cardTypeId, cardOptions) {
        try {
            if (!cardTypeId) {
                throw ApiError.BadRequest('Необходимо выбрать тип карты');
            }

            if (!cardOptions.length) {
                throw ApiError.BadRequest('Необходимо заполнить карту');
            }

            cardOptions.forEach(element => {
                if (!element.optionId || !element.value) {
                    throw ApiError.BadRequest('Введены некорректные данные');
                }
            })

            const code = Date.now().toString(36).slice(-5)
            const pathToFile =  path.join(__dirname, '..', 'static', 'qr', `${code}.svg`)
            const qr_url = `iqr.life/${code}`

            // Сохранение в базу транзакцией
            const t = await db.transaction();

            try {
                const card = await Card.create({
                    code: code,
                    qr_src: pathToFile,
                    userId: userId,
                    cardTypeId: cardTypeId
                }, { transaction: t });

                QRCode.toFile(
                    pathToFile, // путь для сохранения
                    [qr_url], // информация которую нужно записать
                    {
                        type: 'svg',
                        margin: 2
                    }
                )

                // Сохранение данных карты
                for (const option of cardOptions) {
                    await CardValue.create({
                        value: option.value,
                        cardId: card.id,
                        cardOptionId: option.id
                    }, { transaction: t });
                }

                await t.commit();

                return card
            } catch (err) {
                console.log(err)
                await t.rollback();
                return err;
            }
        } catch (err) {
            return err;
        }
    };

    async getCard (id) {
        return await Card.findOne({ 
            where: { id: id }, 
            include: [
                { model: CardType },
                { 
                    model: CardValue,
                    include: [{
                        model: CardOption, 
                        include: [Option]
                    }]
                }
            ]
        });
    };

    async getAllCard (userId) {
        if (userId) {
            return await Card.findAll({ 
                where: { userId: userId }, 
                include: [
                    { model: CardType },
                    { 
                        model: CardValue,
                        include: [{
                            model: CardOption, 
                            include: [Option]
                        }]
                    }
                ]
            })
        }

        return await Card.findAll({ 
            include: [
                { model: CardType },
                { 
                    model: CardValue,
                    include: [{
                        model: CardOption, 
                        include: [Option]
                    }]
                }
            ]
        });
    }

    async updateCard (u_id) {
        const card = Card.findByPk(u_id)

    }
}

module.exports = new CardService();