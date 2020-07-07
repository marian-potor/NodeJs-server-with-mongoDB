const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  username: {type: String, required: true, minlength: 5, maxlength: 50, unique: true},
  password: {type: String, required: true, minlength: 5, maxlength: 255},
  email: {type: String, required: true, minlength: 5, maxlength: 255, unique: true},
  firstName: {type: String, required: true, minlength: 3, maxlength: 50},
  lastName: {type: String, required: true, minlength: 3, maxlength: 50},
}));

module.exports.userModel = User;