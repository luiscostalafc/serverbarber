import PointController from '../app/controllers/PointController';

const router = require('express').Router();

router.get('/points', PointController.index);
router.post('/points', PointController.store);
router.post('/points/haversine', PointController.haversine);
router.get('/points/:id', PointController.show);
router.put('/points/:id', PointController.update);
router.post('/points/:id', PointController.store);
router.delete('/points/:id', PointController.delete);

module.exports = router;
