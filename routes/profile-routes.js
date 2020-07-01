const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
//const multer = require('multer');

/* GET home page */
router.get('/profile', (req, res, next) => {
  res.render('index');
});

module.exports = router;
