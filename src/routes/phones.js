import PhoneController from '../app/controllers/PhoneController';

const router = require('express').Router();

router.get('/phones', PhoneController.index);
router.post('/phones', PhoneController.store);
router.post('/phones/:phoneId/user/:userId', PhoneController.sync);
router.get('/phones/:id', PhoneController.show);
router.put('/phones/:id', PhoneController.update);
router.delete('/phones/:id', PhoneController.delete);

module.exports = router;
