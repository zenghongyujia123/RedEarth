/**
 * Created by zenghong on 16/1/20.
 */


'use strict';

var userService = require('./../services/all').user;
var logService = require('./../services/all').re_log;
var cryptoLib = require('./../../libraries/crypto');
var cookieLib = require('./../../libraries/cookie');

exports.signin = function (req, res, next) {
  logService.insertLog(req.body.username, '登录');

  var username = req.body.username;
  var password = req.body.password;
  userService.signin(username, password, function (err, user) {
    if (err) {
      return res.send(err);
    }

    var token = cryptoLib.encrypToken({_id: user._id, time: new Date()}, 'secret');
    res = cookieLib.setCookie(res, 'access_token', token);
    return res.redirect('/webapp');
  });
};

exports.getLogs = function (req, res, next) {
  logService.getLogs(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.changePassword = function (req, res, next) {
  userService.changePassword(req.user, req.body.old_p, req.body.new_p, function (err, result) {
    if (err) {
      return res.send(err);
    }
    logService.insertLog(req.user.username, '修改密码');
    return res.send(result);
  });
};
exports.getMe = function (req, res, next) {
  return res.send(req.user);
};

exports.create = function (req, res, next) {

};

exports.multiCreate = function (req, res, next) {

};

exports.update = function (req, res, next) {

};

exports.delete = function (req, res, next) {

};

exports.nextUsers = function (req, res, next) {

};




