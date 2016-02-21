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

exports.getHqCurrentStocks=function (req, res, next) {
  hqOrderService.getHqCurrentStocks(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};
