const router = require('express').Router();
const CardController = require('../controllers/cardController');
const CardOptionController = require('../controllers/cardOptionController');
const CardPresetController = require('../controllers/cardPresetController');
const CardTypeController = require('../controllers/cardTypeController');
const CardValueController = require('../controllers/cardValueController');
const OptionController = require('../controllers/optionController');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');
const authMiddleware = require('../middlewares/authMidddleware');

router.post('/card', authMiddleware, CardController.createCard);
router.get('/card/:id', authMiddleware, CardController.getCard);
router.get('/card/', authMiddleware, CardController.getAllCard);
router.get('/card-user/', authMiddleware, CardController.getAllCardByUser);

router.post('/card-type', checkRoleMiddleware('ADMIN'), CardTypeController.createCardType);
router.get('/card-type', CardTypeController.getAllCardType);
router.get('/card-type/:cardTypeId', CardTypeController.getCardType);
router.put('/card-type', checkRoleMiddleware('ADMIN'), CardTypeController.updateCardType);
router.delete('/card-type', checkRoleMiddleware('ADMIN'), CardTypeController.deleteCardType);

router.post('/option', checkRoleMiddleware('ADMIN'), OptionController.createOption);
router.get('/option', OptionController.getAllOption);
router.get('/option/by-user', OptionController.getAllOptionByUserId);
router.get('/option/:optionId', OptionController.getOption);
router.put('/option/:optionId', checkRoleMiddleware('ADMIN'), OptionController.updateOption);
router.delete('/option/:optionId', checkRoleMiddleware('ADMIN'), OptionController.deleteOption);

router.post('/card-option', CardOptionController.createCardOption);
router.get('/card-option', CardOptionController.getAllCardOption);
router.get('/card-option/:cardOptionId', CardOptionController.getCardOption);
router.put('/card-option/:cardOptionId', CardOptionController.updateCardOption);
router.delete('/card-option/:cardOptionId', CardOptionController.deleteCardOption);

router.post('/card-value', CardValueController.createCardValue);
router.get('/card-value', CardValueController.getAllCardValue);
router.get('/card-value/:cardValueId', CardValueController.getCardValue);
router.put('/card-value/:cardValueId', CardValueController.updateCardValue);
router.delete('/card-value/:cardValueId', CardValueController.deleteCardValue);

router.post('/card-preset', CardPresetController.createCardPreset);
router.get('/card-preset', CardPresetController.getAllCardPreset);
router.get('/card-preset/type/:cardTypeId', CardPresetController.getCardTypePreset);
router.get('/card-preset/option/:cardOptionId', CardPresetController.getCardOptionPreset);

module.exports = router;