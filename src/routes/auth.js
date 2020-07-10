const express = require('express');
const router = express.Router();
const loginValidatorMiddleware = require('../middleware/loginValidatorMiddleware');
const authController = require('../auth/auth.controller');

router.post('/', loginValidatorMiddleware, authController.login);

module.exports = router;