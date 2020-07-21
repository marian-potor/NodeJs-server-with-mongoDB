const express = require('express');
const router = express.Router();
const userValidatorMiddleware = require('../middleware/userValidatorMiddleware');
const usersController = require('../users/users.controller');
const idValidator = require('../middleware/idValidatorMiddleware');
const authValidator = require('../middleware/authValidatorMiddleware');

router.post('/', userValidatorMiddleware, usersController.createUser);
router.put('/:id', authValidator, idValidator, usersController.updateUser);

module.exports = router;