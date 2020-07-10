const bcrypt = require('bcrypt');
const User = require('../models/user.model').userModel;

module.exports = {
  create: async (user) => {
    try {
      const existingUser = await User.findOne({username: user.username});
      if (existingUser) {
        console.log('Username already exists...');
        return {status:400, payload: 'Username is already in use.'};
      }
      const existingEmail = await User.findOne({email: user.email});
      if (existingEmail) {
        console.log('Email already exists...');
        return {status:400, payload: 'Email adress is already in use.'};
      }
      const newUser = new User({...user});
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      await newUser.save();
      delete newUser._doc.password;
      console.log('User created...');
      return {status: 201, payload: newUser};
    } catch(err) {
      console.log('Failed to add new user...', err);
      return {status: 500, payload: 'Server error.'};
    }
  },
  auth: async (auth) => {
    try {
      const result = await User.findOne().or([{username: auth.user}, {email: auth.user}]);
      if (!result) {
        console.log('User does not exist...');
        return {status: 400, payload: 'Username/email or password are invalid'};
      }
      const isValid = await bcrypt.compare(auth.password, result.password);
      if (!isValid) {
        console.log('Incorrect password...');
        return {status: 400, payload: 'Username/email or password are invalid'};
      }
      console.log('Successfull authentification...');
      return {status: 200, payload: result};
    } catch(err) {
      console.log('Authentification failed...', err);
      return {status: 500, payload: 'Server error'};
    }
  },
  checkUsername: async (username) => {
    try {
      const result = await User.find({username: username});
      const payload = [];
      if (result.length > 0) payload.push({userExists: true});
      return {status: 200, payload: payload};
    } catch(err) {
      console.log('Username check failed...', err);
      return {status: 500, payload: 'Server error'};
    }
  },
  update: async (courseId, updates) => {
    try {
      const result = await User.findByIdAndUpdate(courseId, updates, {new: true, useFindAndModify: false});
      if (!result) {
        console.log('Update failed. User does not exist...');
        return {status: 400, payload: 'Update failed. Course does not exist.'}
      }
      console.log('User updated...');
      return {status: 200, payload: result};
    } catch(err) {
      if (err instanceof mongoose.Error.CastError) {
        console.log('Update user error. Incorect Id format...')
        return {status: 400, payload: 'Update failed. Course does not exist'}
      }
      console.log('Failed to update user...', err);
      return {status: 500, payload: 'Server error'};
    }
  }
}