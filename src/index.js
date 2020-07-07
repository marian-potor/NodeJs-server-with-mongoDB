const { env, port } = require('../config');
const logger = require('./middleware/logger')
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const categories = require('./routes/categories');
const users = require('./routes/users');
const home = require('./routes/homePage');
const DB = require('./mongoDB');

app.use(express.json());
app.use(logger);
app.use('/api/courses', courses);
app.use('/api/categories', categories);
app.use('/api/users', users);
app.use('/', home);
app.get('*', function(req, res){
  res.status(404).send('Page not found!');
});
DB.init();


app.listen(port, console.log(`Listening on port ${port}`));
