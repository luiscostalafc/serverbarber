import CardController from '../app/controllers/CardController';

const router = require('express').Router();

router.get('/cards', CardController.index);
router.post('/cards', CardController.store);
router.post('/cards/:cardId/user/:userId', CardController.sync);
router.get('/cards/:id', CardController.show);
router.put('/cards/:id', CardController.update);
router.delete('/cards/:id', CardController.delete);

module.exports = router;