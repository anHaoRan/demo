var express = require('express');
var router = express.Router();
var data = require('../data/menus.json');
var config = require('../config');
var request = require('request');
// var child_process = require('child_process');
var spawn = require('child_process').spawn
var path = require('path');
var _headers = {
  'Accept': 'application/json',
  'Content Type': 'application/json; charset=utf-8'
};
/* GET home page. */
// 首页
router.get('/', function (req, res, next) {
  res.render('index', Object.assign({
    title: '首页'
  }, config));
});
// 系统操作页
router.get('/opciton', function (req, res, next) {
  res.render('opciton', Object.assign({
    title: '系统操作页'
  }, config));
});
// 书籍详情页借口
router.get('/detail/:id', function (req, res, next) {
  var id = req.params.id;
  var time = new Date().getTime();
  var _url = `http://api.gps116.cn/book/${id}?isfree=1&freeappid=1281437555`;
  request({
    url: _url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }, function (error, response, body) {
    // var obj = JSON.parse(body);
    var obj = JSON.stringify(body);
    res.send(obj);
  });
});
// 书籍详情页路由
router.get('/detail', function (req, res, next) {
  var title = req.query.title;
  var id = req.query.id;
  var obj = Object.assign({
    title: title + '-书籍详情页',
    bookId: id
  }, config);
  res.render('detail', obj);
});

router.get('/upload', function (req, res, next) {
  rumCommand('sh', ['./upload.sh'], function (resp) { // 执行 autoBuild.sh 脚本文件
    console.log(resp)
  })
  res.send({
    data: 'su',
    errorCode: 200
  });
});
router.get('/getMenu', function (req, res, next) {
  res.send(data);
});
// 请求排行榜列表
router.get('/getRanking', function (req, res, next) {
  var id = req.query.RankId || 'gender';
  var isfree = req.query.isfree || 1;
  var freeappid = req.query.freeappid || 1281437555;

  var _url = `http://api.gps116.cn/ranking/${id}?isfree=${isfree}&freeappid=${freeappid}`;
  request({
    url: _url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }, function (error, response, body) {
    res.send(body)
  });
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
