const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    roles: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ['USER'] },
    refreshToken: { type: DataTypes.STRING, required: true },
})

const Card = sequelize.define('card', {
    code: { type: DataTypes.STRING, unique: true },
    qr_src: { type: DataTypes.STRING, unique: true }
})

const CardType = sequelize.define('card_type', {
    title: { type: DataTypes.STRING, allowNull: false }
},
{ 
    timestamps: false 
})

const CardValue = sequelize.define('card_value', {
    value: { type: DataTypes.STRING }
},
{ 
    timestamps: false 
})

const CardOption = sequelize.define('card_option', {
    title: { type: DataTypes.STRING }
},
{ 
    timestamps: false 
})

const Option = sequelize.define('option', {
    optionName: { type: DataTypes.STRING, allowNull: false }
},
{ 
    timestamps: false 
})

const CardPreset = sequelize.define('card_preset', {}, { timestamps: false })

User.hasMany(Card)
Card.belongsTo(User) // userId

User.hasMany(CardOption, { foreighKey: { allowNull: true } })
CardOption.belongsTo(User)

CardType.hasMany(Card)
Card.belongsTo(CardType) // cardTypeId

Card.hasMany(CardValue)
CardValue.belongsTo(Card) // cardId

CardOption.hasMany(CardValue)
CardValue.belongsTo(CardOption) // cardOptionId

CardOption.belongsToMany(CardType, { through: CardPreset }) // cardTypeId
CardType.belongsToMany(CardOption, { through: CardPreset }) // cardOptionId

Option.hasMany(CardOption)
CardOption.belongsTo(Option) // optionId

module.exports = {
    User,
    Card,
    CardType,
    CardValue,
    CardOption,
    CardPreset,
    Option
}