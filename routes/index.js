var express = require('express');
var router = express.Router();
var data = require('../data/menus.json');
var config = require('../config');
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', Object.assign({ title: 'Express' },config));
});

module.exports = router;
