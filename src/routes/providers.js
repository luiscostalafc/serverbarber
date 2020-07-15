import ProviderController from '../app/controllers/ProviderController';
import AvailableController from '../app/controllers/AvailableController';

const router = require('express').Router();

router.get('/providers', ProviderController.index);
router.get('/providers/man', ProviderController.man);
router.get('/providers/woman', ProviderController.woman);
// router.get('/providers/:providerId/available', AvailableController.index); //estava nessa forma
router.get('/providers/available', AvailableController.index);
router.post('/providers/available', AvailableController.avaliable);

module.exports = router;
