var express = require('express');
var router = express.Router();
const userController = require('./../controller/UserController');

/* GET users listing. */
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
