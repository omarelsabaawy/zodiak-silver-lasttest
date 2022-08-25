const path = require('path');

const express = require('express');

const userController = require('../controllers/user');
const isloggedin = require('../middleware/is-loggedin');

const router = express.Router();

router.get('/Registration', isloggedin, userController.getRegister);

router.get('/login', isloggedin, userController.getLogin);

router.post('/login', isloggedin, userController.postLogin);

router.post('/signup', isloggedin, userController.postRegister);

router.post('/logout', userController.postLogout);

module.exports = router;