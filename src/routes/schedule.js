import ScheduleController from '../app/controllers/ScheduleController';

const router = require('express').Router();

router.get('/schedule', ScheduleController.index);
router.post('/schedule', ScheduleController.store);
router.get('/schedule/:id', ScheduleController.show);
router.put('/schedule/:id', ScheduleController.update);
router.delete('/schedule/:id', ScheduleController.delete);

module.exports = router;