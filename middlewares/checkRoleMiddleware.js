const ApiError = require('../exceptions/apiError');
const tokenService = require('../services/tokenService');

module.exports = function (role) {
    return function (req, res, next) {
        try {
            const accessToken = req.headers?.authorization.split(' ')[1];
            const userData = tokenService.validateAccessToken(accessToken);
    
            if (!userData?.roles.includes(role)) {
                return next(ApiError.PermissionDeniedError());
            }
    
            req.user = userData;
            next();
        } catch (e) {
            return next(e);
        }
    }
}