/**
 * Created by zenghong on 16/1/20.
 */
'use strict';
var productService = require('./../services/all').product;
var logService = require('./../services/all').re_log;

exports.getProducts = function (req, res, next) {
  productService.getProducts(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.importProducts = function (req, res, next) {
  logService.insertLog(req.user.username, '导入产品资料');

  productService.importProducts(req.user, req.body.products, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getDesks = function (req, res, next) {
  productService.getDesks(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.clearData  = function (req, res, next) {
  productService.clearData(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

