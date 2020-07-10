const express = require('express');
const router = express.Router();
const userValidatorMiddleware = require('../middleware/userValidatorMiddleware');
const usersController = require('../users/users.controller');

router.post('/', userValidatorMiddleware, usersController.createUser);
router.put('/:id', usersController.updateUser);

module.exports = router;