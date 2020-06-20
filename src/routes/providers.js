import ProviderController from '../app/controllers/ProviderController';
import AvailableController from '../app/controllers/AvailableController';

const router = require('express').Router();

router.get('/providers', ProviderController.index);
router.get('/providers/:providerId/available', AvailableController.index);

module.exports = router;