const router = require('express').Router();
const authController = require('../controllers/authController');
const authMidddleware = require('../middlewares/authMidddleware');
const Validators = require('../middlewares/validationMiddleware');

router.post('/registration', Validators('registration'), authController.registration);
router.post('/login',  Validators('login'), authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
router.get('/users', authMidddleware, authController.users);

module.exports = router;