import CategoryController from '../app/controllers/CategoryController';

const router = require('express').Router();

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
router.post('/categories/:categoryId/user/:userId', CategoryController.sync);
router.get('/categories/:gender', CategoryController.gender);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

module.exports = router;