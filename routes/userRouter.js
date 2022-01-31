const Router = require('express');
const router = Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUserInfo);


module.exports = router;