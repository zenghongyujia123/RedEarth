/**
 * Created by zenghong on 16/1/20.
 */
'use strict';
var hqOrderService = require('./../services/all').hq_order;

exports.hqStockImport = function (req, res, next) {
  hqOrderService.hqStockImport(req.user, req.body.stocks, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getHqCurrentStocks = function (req, res, next) {
  hqOrderService.getHqCurrentStocks(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getHqOtherOrders = function (req, res, next) {
  hqOrderService.getHqOtherOrders (req.user, {order_type:req.query.order_type||''}, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.hqOtherOrderImport = function (req, res, next) {
  hqOrderService.hqOtherOrderImport (req.user, req.body.orders, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};
