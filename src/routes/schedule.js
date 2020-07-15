import ScheduleController from '../app/controllers/ScheduleController';

const router = require('express').Router();

router.get('/schedule', ScheduleController.index);
router.post('/schedule', ScheduleController.schedule);

module.exports = router;
