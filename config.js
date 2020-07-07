const env = require('dotenv');
env.config();
module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000
}