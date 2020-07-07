const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {type: String, required: true},
  author: {type: String, required: true},
  level: {type: String, required: true, enum: ['beginner', 'intermediate', 'advanced']},
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true},
  isPublished: {type: Boolean, required: true},
  price: {type: Number, required: function(){return this.isPublished}, min: 10, max: 300},
  date: {type: Date, required: true, default: Date.now()},
  tags: [Array]
});

const Course = mongoose.model('Course', courseSchema);

module.exports.courseModel = Course;