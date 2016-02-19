/**
 * Created by zenghong on 16/1/20.
 */
'use strict';
var productService = require('./../services/all').product;

exports.getProducts = function (req, res, next) {
  productService.getProducts(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.importProducts = function (req, res, next) {
  productService.importProducts(req.user, req.body.products, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};
