const express = require('express');
const router = express.Router();
const categoriesController = require('../categories/categories.controller');
const categoryValidator = require('../middleware/categoryValidatorMiddleware');
const authValidator = require('../middleware/authValidatorMiddleware');
const adminValidator = require('../middleware/adminValidatoriddleware');

router.post('/', authValidator, adminValidator, categoryValidator, categoriesController.createCategory);
router.get('/', categoriesController.getCategories);
router.get('/:id', categoriesController.getCategory);
router.put('/:id', authValidator, adminValidator, categoryValidator, categoriesController.updateCategory);
router.delete('/:id', authValidator, adminValidator, categoriesController.removeCategory);

module.exports = router;