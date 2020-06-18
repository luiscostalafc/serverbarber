import NotificationController from '../app/controllers/NotificationController';

const router = require('express').Router();

router.get('/notifications', NotificationController.index);
router.post('/notifications', NotificationController.store);
router.get('/notifications/:id', NotificationController.show);
router.put('/notifications/:id', NotificationController.update);
router.delete('/notifications/:id', NotificationController.delete);

module.exports = router;