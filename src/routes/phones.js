import PhoneController from '../app/controllers/PhoneController';

const router = require('express').Router();

router.get('/phone', PhoneController.index);
router.post('/phone', PhoneController.store);
router.post('/phone/:phoneId/user/:userId', PhoneController.sync);
router.get('/phone/:id', PhoneController.show);
router.put('/phone/:id', PhoneController.update);
router.delete('/phone/:id', PhoneController.delete);

module.exports = router;