const Router = require('express');

const myTrainsController = require('../controllers/MyTrainsController')
const router = Router();

router.get('/', myTrainsController.getMyTrainsList);
router.get('/my-train/:id', myTrainsController.getMyTrain);
router.get('/my-train/:id/exercise/:exerciseId', myTrainsController.getMyExercise);

router.post('/add', myTrainsController.addTrain)
router.delete('/delete', myTrainsController.deleteTrain)

module.exports = router;