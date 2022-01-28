const Router = require('express');
const router = Router();
const trainsController = require('../controllers/TrainsController');
router.get('/', trainsController.getTrainsList);
router.get('/train/:id/exercise/:exerciseId', trainsController.getExercise);
router.get('/train/:id', trainsController.getTrain);



module.exports = router;