const { User } = require('../models/models');
const jwt = require('jsonwebtoken');
const UserDto = require('../dtos/userDto');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        }
    };

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

            return userData;
        } catch (e) {
            return null;
        }
    };

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

            return userData;
        } catch (e) {
            return null;
        }
    };

    async saveToken(userId, refreshToken) {
        const userData = await User.findByPk(userId);

        userData.refreshToken = refreshToken;

        return userData.save();
    };

    async removeToken(refreshToken) {
        const userData = await User.findOne({ where: { refreshToken }});
        
        const user = await (await userData.update({ refreshToken: null })).save();
        const userDto = new UserDto(user);

        return { ...userDto, refreshToken: refreshToken };
    };
}

module.exports = new TokenService();