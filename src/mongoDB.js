const mongoose = require('mongoose');

const initDB = async () => {
 try {
   await mongoose.connect('mongodb://localhost:27017/demo', {useNewUrlParser: true, useUnifiedTopology: true});
   console.log('Connected to DB')
 } catch(err) {
   console.log(new Error(err))
 }
}

module.exports.init = initDB;
