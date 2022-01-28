const Router = require('express')
const AuthController = require('../controllers/AuthController');
const router = new Router();

router.post('/registr', AuthController.registr);
router.post('/login', AuthController.login);
router.get('/', AuthController.check);

module.exports = router;