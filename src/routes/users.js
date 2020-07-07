const express = require('express');
const router = express.Router();
const userValidatorMiddleware = require('../middleware/courseValidatorMiddleware');
const usersController = require('../users/users.controller');

router.post('/', usersController.createUser);
router.get('/', usersController.getUser);
router.put('/:id', usersController.updateUser);

module.exports = router;