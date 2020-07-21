const express = require('express');
const router = express.Router();
const courseValiadorMiddleware = require('../middleware/courseValidatorMiddleware');
const coursesController = require('../courses/courses.controller');
const idValidator = require('../middleware/idValidatorMiddleware');
const authValidator = require('../middleware/authValidatorMiddleware');
const adminValidator = require('../middleware/adminValidatoriddleware');

router.get('/', coursesController.getCourses);

router.get('/:id', idValidator, coursesController.getCourse);

router.post('/', authValidator, adminValidator, courseValiadorMiddleware, coursesController.addCourse);

router.put('/:id', authValidator, adminValidator, idValidator, courseValiadorMiddleware, coursesController.updateCourse);

router.delete('/:id', authValidator, adminValidator, idValidator, coursesController.removeCourse);

module.exports = router;