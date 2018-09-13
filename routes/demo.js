var express = require('express');
var router = express.Router();
var config = require('../config');

router.get('/Pixi', function(req, res, next) {
  res.render('demo/index', Object.assign({
    title: 'Pixi首页'
  }, config));
});
module.exports = router;