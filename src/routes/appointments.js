import AppointmentController from '../app/controllers/AppointmentController';

const router = require('express').Router();

router.get('/appointments', AppointmentController.index);
router.post('/appointments', AppointmentController.store);
router.get('/appointments/:id', AppointmentController.show);
router.put('/appointments/:id', AppointmentController.update);
router.delete('/appointments/:id', AppointmentController.delete);

module.exports = router;