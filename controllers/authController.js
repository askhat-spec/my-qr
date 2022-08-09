const tokenService = require('../services/tokenService');
const userService = require('../services/userService');

class authController {
    async registration(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const userData = await userService.registration(username, email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            res.json(userData);
        } catch (err) {
            next(err)
        };
    };

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            res.json(userData);
        } catch (err) {
            next(err)
        };
    };

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);

            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (err) {
            next(err)
        };
    };

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            const userData = await userService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            res.json(userData);
        } catch (err) {
            next(err)
        };
    };

    async users(req, res, next) {
        try {
            const users = await userService.users();

            console.log(JSON.stringify(users))

            return res.json(users);
        } catch (err) {
            next(err)
        };
    };
}

module.exports = new authController()