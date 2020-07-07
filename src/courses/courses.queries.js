const Course = require('../models/course.model').courseModel;
const categoriesQueries = require('../categories/categories.queries');

module.exports = {
  create: async (course) => {
    try {
      const category = await categoriesQueries.read(course.category);
      if (!category.payload._id) {
        console.log('Failed to add new course. Invalid category...')
        return {status: category.status, payload: `Could not create course. ${category.payload}`};
      }
      const courseDocument = new Course({...course});
      courseDocument.category = category.payload;
      await courseDocument.save()
      console.log('Course added successfully...');
      return {status: 200, payload: courseDocument};
    } catch(err) {
      console.log('Failed to add new course...\n', err.message);
      return {status: 500, payload: 'Internal server error'};
    }
  },
  read: async (courseId) => {
    try {
      const result = await Course.findById(courseId).populate('category', 'name').select('-__v');
      if (!result) {
        console.log('Course does not exist...');
        return {status: 404, payload: 'Course does not exist'};
      };
      console.log('Course read successfully...');
      return {status: 200, payload: result};
    } catch(err) {
      if (err instanceof mongoose.Error.CastError) {
        console.log('Wrong course id format...', err)
        return {status: 400, payload: 'Course does not exist'}
      }
      console.log('Failed to read course...', err)
      return {status: 500, payload: 'Internal server error'}
    }
  },
  readAll: async () => {
    try {
      const result = await Course.find().populate('category', 'name').select('-__v');
      console.log('Courses read successfully...');
      return {status: 200, payload: result};
    } catch(err) {
      console.log('Failed to read courses...', err)
      return {status: 500, payload: 'Internal server error'}
    }
  },
  update: async (courseId, updates) => {
    try {
      const result = await Course
        .findByIdAndUpdate(courseId, updates, {new: true, useFindAndModify: false})
        .populate('category', 'name').select('-__v');
      if (!result) {
        console.log('Course does not exist...');
        return { status: 400, payload: 'Update failed. Course does not exist'};
      }
      console.log('Course updated successfully...');
      return { status: 200, payload: result};
    } catch(err) {
      if (err instanceof mongoose.Error.CastError) {
        console.log('Wrong course id format...', err);
        return {status: 400, payload: 'Update failed. Course does not exist'};
      };
      console.log('Failed to read course...', err);
      return {status: 500, payload: 'Internal server error'};
    }
  },
  delete: async (courseId) => {
    try {
      const result = await Course
        .findByIdAndRemove(courseId, {new: true, useFindAndModify: false})
        .populate('category', 'name').select('-__v');
      if (!result) {
        console.log('Can\'t remove course. It doesn\'t exist');
        return {status: 400, payload: 'Remove course failed. It does not exist.'};
      }
      console.log('Course removed...');
      return {status: 200, payload: result};
    } catch(err) {
      if (err instanceof mongoose.Error.CastError) {
        console.log('Wrong course id format...', err)
        return {status: 400, payload: 'Remove course failed. It does not exist.'};
      }
      console.log('Failed to read course...', err);
      return {status: 500, payload: 'Internal server error'};
    }
  }
}