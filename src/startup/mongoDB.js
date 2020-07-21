const mongoose = require('mongoose');
const logger = require('../startup/logger');

const initDB = async () => {
 try {
   await mongoose
    .connect(
      'mongodb://localhost:27017/demo',
      {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
    );
   logger.info('Connected to DB');
 } catch(err) {
   logger.error('Failed to conect to DB\n', new Error(err));
 }
}

module.exports.init = initDB;
