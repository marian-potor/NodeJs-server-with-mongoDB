const express = require('express');
const router = express.Router();
const categoriesController = require('../categories/categories.controller');
const categoryValidatorMiddleware = require('../middleware/categoryValidatorMiddleware');

router.post('/', categoryValidatorMiddleware, categoriesController.createCategory);
router.get('/', categoriesController.getCategories);
router.get('/:id', categoriesController.getCategory);
router.put('/:id', categoryValidatorMiddleware, categoriesController.updateCategory);
router.delete('/:id', categoriesController.removeCategory);

module.exports = router;