const {jwtPrivateKey} = require('../../config');
const logger = require('./logger');

module.exports = () => {
  process.on('unhandledRejection', (err) => {
    logger.error('Proceess error', err)
  });
  process.on('uncaughtException', (err) => {
    logger.error('Proceess error', err)
  });
  if (!jwtPrivateKey) {
    throw new Error('FATAL ERROR. jwtPrivateKey is not defined');
  }
}