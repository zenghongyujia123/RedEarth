/**
 * Created by zenghong on 16/1/20.
 */
'use strict';
var areaOrderService = require('./../services/all').area_order;

exports.areaSalesStockOnwayImport = function (req, res, next) {
  areaOrderService.areaSalesStockOnwayImport(req.user, req.body.sales, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.otherOrderImport = function (req, res, next) {
  areaOrderService.otherOrderImport (req.user, req.body.orders, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getOrdersByArea = function (req, res, next) {
  areaOrderService.getOrdersByArea (req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getSalesByArea = function (req, res, next) {
  areaOrderService.getSalesByArea (req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.historySalesStockOnwayImport = function (req, res, next) {
  areaOrderService.historySalesStockOnwayImport  (req.user, req.body.sales, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};



