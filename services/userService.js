const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const tokenService = require('./tokenService');
const UserDto = require('../dtos/userDto');
const ApiError = require('../exceptions/apiError');

class UserService {
    async registration(username, email, password) {
        const candidate = await User.findOne({ where: { email } });

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const newUser = await User.create({ username, email, password: hashPassword });

        const userDto = new UserDto(newUser);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    };

    async login(email, password) {
        const user = await User.findOne({ where: { email }});

        if (!user) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не существует`);
        }

        const isPassesEquals = await bcrypt.compare(password, user.password);

        if (!isPassesEquals) {
            throw ApiError.BadRequest(`Неверный пароль`);
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    };

    async logout(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError(`Пользователь не авторизован`);
		}
		
        const token = tokenService.removeToken(refreshToken);

        return token;
    };

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError(`Пользователь не авторизован`);
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await User.findOne({ where: { refreshToken } });

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError(`Пользователь не авторизован`);
        }

        const user = await User.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    };

    async users() {
        const users = await User.findAll();

        return users;
    };
}

module.exports = new UserService();