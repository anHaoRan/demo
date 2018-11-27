var request = require('request');
var Q = require('q');
var config = require('../config');
var api = config.api;

exports.get = function (url, auth, needAuth) {
  var defer = Q.defer();
  console.log('[API URL][%s] %s', new Date().toLocaleString(), url);
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (!/^http/.test(url)) {
    url = api + url;
  }

  request({
    url: url,
    headers: headers
  }, function (error, response, body) {
    if (error) {
      console.log('\n[connect failed][%s], %s', new Date().toLocaleString(), error);
      defer.resolve({
        errorCode: 500,
        message: '[connect failed]'
      });
    } else {
      try {
        defer.resolve(JSON.parse(body));
      } catch(e) {
        console.log('\n[fetch parse json exception][%s], %s, data: %s', new Date().toLocaleString(), e.toString(), body);
        defer.resolve({
          text: body,
          data: {},
          errorCode: 500,
          message: 'parse json server exception'
        });
      }
    }
  });

  return defer.promise;
};

exports.post = function (url, body, auth, needAuth) {
  var defer = Q.defer();
  console.log('[API URL][%s] %s', new Date().toLocaleString(), url);
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (!/^http/.test(url)) {
    url = api + url;
  }

  request({
    url: url,
    method: 'POST',
    headers: headers,
    json: body || {}
  }, function (error, response, body) {
    if (error) {
      console.log('\n[connect failed][%s], %s', new Date().toLocaleString(), error);
      defer.resolve({
        errorCode: 500,
        message: '[connect failed]'
      });
    } else {
      defer.resolve({
        body: body,
        headers: response.headers
      });
    }
  });

  return defer.promise;
};
