import UserController from '../app/controllers/UserController';

const router = require('express').Router();

router.post('/users', UserController.store);

module.exports = router;
