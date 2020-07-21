const express = require('express');
const courses = require('../routes/courses');
const categories = require('../routes/categories');
const users = require('../routes/users');
const auth = require('../routes/auth');
const home = require('../routes/homePage');

module.exports = {
  init: (app) => {
    app.use(express.json());
    app.use('/api/courses', courses);
    app.use('/api/categories', categories);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/', home);
    app.get('*', function(req, res){
      res.status(404).send('Page not found!');
    });
  }
}


