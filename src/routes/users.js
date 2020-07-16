import UserController from '../app/controllers/UserController';

const router = require('express').Router();

router.get('/users', UserController.index);
router.get('/users/providers', UserController.providers);
router.get('/users/not_providers', UserController.notProviders);
router.post('/users', UserController.store);
router.get('/users/:id', UserController.show);
// router.put('/users/:id', UserController.update);
router.put('/users', UserController.update);
router.delete('/users/:id', UserController.delete);

module.exports = router;
