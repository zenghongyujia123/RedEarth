/**
 * Created by zenghong on 16/1/7.
 */
var path = require('path');
var _ = require('lodash');
var cookieLib = require('./../../libraries/cookie');
'use strict';
exports.index = function (req, res, next) {
  return res.sendfile(path.join(__dirname, '../../web/homepage/index.html'));
};

exports.webAppIndex = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  console.log(cookie);

  return res.render(path.join(__dirname, '../../web/webapp/index.html'), {test: cookie.access_token});
};

exports.historyIndex = function (req, res, next) {
  return res.render(path.join(__dirname, '../../history/index.html'));
};


exports = _.extend(exports, {
  user: require('./user'),
  area_order: require('./area_order'),
  hq_order: require('./hq_order'),
  history_order: require('./history_order'),
  product: require('./product')
});