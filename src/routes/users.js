import UserController from '../app/controllers/UserController';

const router = require('express').Router();

router.get('/users', UserController.index);
router.post('/users', UserController.store);
router.get('/users/:id', UserController.show);
router.put('/users', UserController.update);
router.delete('/users/:id', UserController.delete);

module.exports = router; 