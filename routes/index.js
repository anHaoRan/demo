var express = require('express');
var router = express.Router();
var data = require('../data/menus.json');
var config = require('../config');
// var child_process = require('child_process');
var child_process = require('child_process');
var path = require('path');
/* GET home page. */
var src = path.join(__dirname, '../upload.sh');
console.log(src,'<<<<<<<<<<<<<src')

router.get('/', function (req, res, next) {
  res.render('index', Object.assign({
    title: 'Express'
  }, config));
});

router.get('/upload', function (req, res, next) {
  child_process.execFile(src, function (error, stdout, stderr) {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
});

module.exports = router;