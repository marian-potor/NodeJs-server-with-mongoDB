const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../../config');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, minlength: 5, maxlength: 50, unique: true},
  password: {type: String, required: true, minlength: 5, maxlength: 1024},
  email: {type: String, required: true, minlength: 5, maxlength: 255, unique: true},
  firstName: {type: String, required: true, minlength: 3, maxlength: 50},
  lastName: {type: String, required: true, minlength: 3, maxlength: 50},
  isAdmin: {type: Boolean, required: true}
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({id: this._id, isAdmin: this.isAdmin}, jwtPrivateKey);
  return token;
}
const User = mongoose.model('User', userSchema );

module.exports.userModel = User;