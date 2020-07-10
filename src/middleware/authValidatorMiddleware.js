const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../../config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    console.log('No token provided...')
    res.status(401).send('Access denied. No token provided.');
    return;
  }
  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (exc) {
    console.log('Provided token is invalid...')
    res.status(401).send('Invalid token');
  }
}