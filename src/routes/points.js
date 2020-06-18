import PointController from '../app/controllers/PointController';

const router = require('express').Router();

router.get('/points', PointController.index);
router.post('/points', PointController.store);
router.get('/points/:id', PointController.show);
router.put('/points/:id', PointController.update);
router.post('/points/:id', PointController.store);

module.exports = router;