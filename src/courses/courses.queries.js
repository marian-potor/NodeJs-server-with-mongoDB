const Course = require('../models/course.model').courseModel;
const categoriesQueries = require('../categories/categories.queries');
const logger = require('../startup/logger');

module.exports = {
  create: async (course, next) => {
    try {
      const category = await categoriesQueries.read(course.category);
      if (!category.payload._id) {
        logger.error('Failed to add new course. Invalid category...')
        return {status: category.status, payload: `Could not create course. ${category.payload}`};
      }
      const courseDocument = new Course({...course});
      courseDocument.category = category.payload;
      await courseDocument.save()
      logger.info('Course added successfully...');
      return {status: 200, payload: courseDocument};
    } catch(err) {
      next(err);
      return {error: err};
    }
  },
  read: async (courseId, next) => {
    try {
      const result = await Course.findById(courseId).populate('category', 'name').select('-__v');
      if (!result) {
        logger.warn('Course does not exist...');
        return {status: 404, payload: 'Course does not exist'};
      };
      logger.info('Course read successfully...');
      return {status: 200, payload: result};
    } catch(err) {
      next(err);
      return {error: err};
    }
  },
  readAll: async (next) => {
    try {
      const result = await Course.find().populate('category', 'name').select('-__v');
      logger.info('Courses read successfully...');
      return {status: 200, payload: result};
    } catch(err) {
      next(err);
      return {error: err};
    }
  },
  update: async (courseId, updates, next) => {
    try {
      const result = await Course
        .findByIdAndUpdate(courseId, updates, {new: true, useFindAndModify: false})
        .populate('category', 'name').select('-__v');
      if (!result) {
        logger.warn('Course does not exist...');
        return { status: 400, payload: 'Update failed. Course does not exist'};
      }
      logger.info('Course updated successfully...');
      return { status: 200, payload: result};
    } catch(err) {
      next(err);
      return {error: err};
    }
  },
  delete: async (courseId, next) => {
    try {
      const result = await Course
        .findByIdAndRemove(courseId, {new: true, useFindAndModify: false})
        .populate('category', 'name').select('-__v');
      if (!result) {
        logger.warn('Can\'t remove course. It doesn\'t exist');
        return {status: 400, payload: 'Remove course failed. It does not exist.'};
      }
      logger.info('Course removed...');
      return {status: 200, payload: result};
    } catch(err) {
      next(err); 
      return {error: err};
    }
  }
}