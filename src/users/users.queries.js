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
      await newUser.save();
      console.log('User created...');
      return {status: 201, payload: newUser};
    } catch(err) {
      console.log('Failed to add new user...', err);
      return {status: 500, payload: 'Server error.'};
    }
  },
  read: async (query) => {
    try {
      const result = await User.findOne({username: query.username, password: query.password});
      if (!result) {
        console.log('User does not exist...');
        return {status: 404, payload: 'Login failed. User does not exist'};
      }
      console.log('Login success...');
      return {status: 200, payload: result};
    } catch(err) {
      console.log('Login failed...', err);
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