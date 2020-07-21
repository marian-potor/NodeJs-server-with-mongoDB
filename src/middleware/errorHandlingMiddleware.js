const logger = require('../startup/logger');

module.exports = (err, req, res, next) => {
  logger.error('DB connection error...', err);
  res.status(500).send('Server error');
};