const { env, port, jwtPrivateKey } = require('../config');
const logger = require('./middleware/logger')
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const categories = require('./routes/categories');
const users = require('./routes/users');
const auth = require('./routes/auth');
const home = require('./routes/homePage');
const DB = require('./mongoDB');

if (!jwtPrivateKey) {
  console.log('FATAL ERROR. jwtPrivateKey is not defined');
  process.exit(1);
}

DB.init();
app.use(express.json());
app.use(logger);
app.use('/api/courses', courses);
app.use('/api/categories', categories);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', home);
app.get('*', function(req, res){
  res.status(404).send('Page not found!');
});

app.listen(port, console.log(`Listening on port ${port}`));
