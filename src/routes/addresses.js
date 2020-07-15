import AddressController from '../app/controllers/AddressController';

const router = require('express').Router();

router.get('/addresses', AddressController.index);
router.post('/addresses', AddressController.store);
router.get('/addresses/:id', AddressController.show);
router.put('/addresses/:id', AddressController.update);
router.delete('/addresses/:id', AddressController.delete);

module.exports = router;
