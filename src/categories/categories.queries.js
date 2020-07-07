const mongoose = require('mongoose');
const Category = require('../models/category.model').categoryModel;

module.exports = {
  create: async (category) => {
    try {
      const newCategory = new Category({...category});
      const result = await newCategory.save();
      console.log('Category added...');
      return {status: 201, payload: result};
    } catch(err){
      console.log('Create new category failed...\n', err);
      return {status: 500, payload: 'Internal server error'};
    }
  },
  readAll: async () => {
    try {
      const result = await Category.find();
      console.log('Categories read...');
      return {status: 200, payload: result};
    } catch(err) {
      console.log('Failed to read categories...\n', err);
      return {status: 500, payload: 'Internal server Error'};
    }
  },
  read: async (categoryId) => {
    try {
      const result = await Category.findById(categoryId);
      if (!result){
        console.log('Category does not exist...');
        return {status:404, payload: 'Category does not exist'};
      }
      console.log('Category read...');
      return {status:200, payload: result}
    } catch(err) {
      if (err instanceof mongoose.Error.CastError) {
        console.log('Invalid category id format...\n', err);
        return {status: 400, payload: 'Category does not exist'};
      }
      console.log('Failed to read category...\n', err);
      return {status: 500, payload: 'Internal server error'};
    }
  },
  update: async (categoryId, updates) => {
    try {
      const result = await Category
        .findByIdAndUpdate(categoryId, updates, {new: true, useFindAndModify: false});
      if (!result) {
        console.log('Inavid category Id...');
        return {status: 404, payload: 'Failed to update category. It does not exist.'};
      }
      console.log('Category updated...');
      return {status: 200, payload: result};
    } catch(err) {
      if (err instanceof mongoose.Error.CastError) {
        console.log('Invalid category Id format...\n', err);
        return { status: 404, payload: 'Failed to remove category. It does not exist.'};
      }
      console.log('Failed to update category...\n', err);
      return {status: 500, payload: 'Internal server error'};
    }
  },
  remove: async (categoryId) => {
    try {
      const result = await Category.findByIdAndDelete(categoryId);
      if (!result) {
        console.log('Inavid category Id...');
        return {status: 404, payload: 'Failed to remove category. It does not exist.'};
      }
      console.log('Removed category...');
      return {status: 200, payload: result};
    } catch(err) {
      if (err instanceof mongoose.Error.CastError) {
        console.log('Invalid category Id format...\n', err);
        return { status: 404, payload: 'Failed to remove category. It does not exist.'};
      }
      console.log('Failed to delete category...\n', err);
      return {status: 500, payload: 'Internal server error'};
    }
  }
}