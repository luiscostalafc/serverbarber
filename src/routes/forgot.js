import ForgotController from '../app/controllers/ForgotController';

const router = require('express').Router();

router.get('/forgot', ForgotController.index);
router.post('/forgot', ForgotController.create);
router.post('/changepass', ForgotController.changepass);

module.exports = router;
