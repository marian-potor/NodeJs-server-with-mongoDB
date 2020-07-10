module.exports = (req, res, next) => {
  if (!req.user.isAdmin) {
    console.log('User is not admin...');
    res.status(403).send('Access denied');
    return;
  }
  next();
}