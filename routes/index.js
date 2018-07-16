var express = require('express');
var router = express.Router();
var data = require('../data/menus.json');
var config = require('../config');
// var child_process = require('child_process');
var spawn = require('child_process').spawn
var path = require('path');
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', Object.assign({
    title: 'Express'
  }, config));
});

router.get('/upload', function (req, res, next) {
  rumCommand('sh', ['./upload.sh'], function (resp) { // 执行 autoBuild.sh 脚本文件
    console.log(resp)
    res.send(resp);
  })
});

function rumCommand(cmd, args, callback) {
  var child = spawn(cmd, args)
  var response = ''
  child.stdout.on('data', function (buffer) {
    response += buffer.toString();
  })
  child.stdout.on('end', function () {
    callback(response)
  })
}
module.exports = router;