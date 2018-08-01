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

//公共调取方法v1
function commonFn(_url,callback,head){
  var head = head||{
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
  request({
    url: _url,
    headers: head
  }, function(error, response, body){
      callback(error, response, body)
  });
}

function randomPassword(size){
  var seed = new Array('a','b','c','d','e','f','g','h','i','j','k','m','n','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9');//数组
  seedlength = seed.length;//数组长度
  var createPassword = '';
  for (i=0;i<size;i++) {
    j = Math.floor(Math.random()*seedlength);
    createPassword += seed[j];
  }
  return createPassword;
}

// 书籍详情页作品信息借口
router.get('/detail/:id', function (req, res, next) {
  var id = req.params.id;
  var time = new Date().getTime();
  var _url = `http://api.gps116.cn/book/${id}?isfree=1&freeappid=1281437555`;
  commonFn(_url,function(error, response, body){
    var obj = JSON.stringify(body);
    res.send(obj);
  })
});

// 书籍阅读页-章节目录
router.get('/read/:id/chapter', function (req, res, next) {
  var id = req.params.id;
  var time = new Date().getTime();
  var _url = `http://api.gps116.cn/mix-toc/${id}?isfree=1&freeappid=1281437555`;
  commonFn(_url,function(error, response, body){
    res.send(body);
  })
});

// 书籍阅读页-章节内容
router.get('/read/chapterUrl', function (req, res, next) {
  var bookId = req.query.bookId;
  var chapterFile = req.query.chapterFile;
  var t = Math.floor(new Date().getTime()/1000);
  var k = randomPassword(16)
  var chapterUrl = encodeURIComponent(`http://book.my716.com/getBooks.aspx?method=content&bookId=${bookId}&chapterFile=${chapterFile}&k=${k}&t=${t}&isfree=1&freeappid=1281437555`)
  var _url = ('http://chapterup.hlj163.cn/chapter/'+chapterUrl);
  commonFn(_url,function(error, response, body){
    res.send(body);
  })
});

// 书籍详情页-推荐借口
router.get('/detail/:id/recommend', function (req, res, next) {
  var id = req.params.id;
  var time = new Date().getTime();
  var _url = `http://api.gps116.cn/book/${id}/recommend?isfree=1&freeappid=1281437555`;
  commonFn(_url,function(error, response, body){
    var obj = JSON.stringify(body);
    res.send(obj);
  })
});

// 请求排行榜列表
router.get('/getRanking', function (req, res, next) {
  var id = req.query.RankId || 'gender';
  var isfree = req.query.isfree || 1;
  var freeappid = req.query.freeappid || 1281437555;
  var _url = `http://api.gps116.cn/ranking/${id}?isfree=${isfree}&freeappid=${freeappid}`;
  commonFn(_url,function(error, response, body){
    res.send(body)
  });
});

//请求运营站导航json
router.get('/getMenu', function (req, res, next) {
  res.send(data);
});

// 更新代码加部署，执行sh文件
router.get('/upload', function (req, res, next) {
  rumCommand('sh', ['./upload.sh'], function (resp) { // 执行 autoBuild.sh 脚本文件
    console.log(resp)
  })
  res.send({
    data: 'su',
    errorCode: 200
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
