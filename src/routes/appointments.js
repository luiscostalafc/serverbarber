import AppointmentController from '../app/controllers/AppointmentController';

const router = require('express').Router();

router.get('/appointments', AppointmentController.index);
router.get('/appointments/provider/:id', AppointmentController.provider);
router.post('/appointments', AppointmentController.store);
router.post('/appointments/unavailable', AppointmentController.unavailable);
router.get('/appointments/:id', AppointmentController.show);
router.put('/appointments/:id', AppointmentController.update);
router.delete('/appointments/:id', AppointmentController.delete);

module.exports = router;
