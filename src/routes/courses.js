const express = require('express');
const router = express.Router();
const courseValiadorMiddleware = require('../middleware/courseValidatorMiddleware');
const coursesController = require('../courses/courses.controller')

router.get('/', coursesController.getCourses);

router.get('/:id', coursesController.getCourse);

router.post('/', courseValiadorMiddleware, coursesController.addCourse);

router.put('/:id', courseValiadorMiddleware, coursesController.updateCourse);

router.delete('/:id', coursesController.removeCourse);

module.exports = router;