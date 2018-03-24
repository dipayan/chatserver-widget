var express = require('express');
var configuration = require('../config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { configuration : configuration , user : {username: 'Dipayan'} });
});

module.exports = router;
