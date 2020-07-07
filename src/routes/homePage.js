const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.normalize(__dirname + '/../public/index.html'));
});

module.exports = router;