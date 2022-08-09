const router = require('express').Router();
const appRouter = require('./appRouter');
const authRouter = require('./authRouter');
const authMiddleware = require('../middlewares/authMidddleware');

router.use('/cards', authMiddleware, appRouter);
router.use('/auth', authRouter);

module.exports = router;