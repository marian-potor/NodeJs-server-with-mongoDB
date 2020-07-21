const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.log('Invalid Id format...')
    res.status(400).send('Resource does not exist.');
    return;
  }
  next();
}