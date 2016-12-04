/**
 * Created by zenghong on 16/1/20.
 */
'use strict';
var historyOrderService = require('./../services/all').history_order;
var logService = require('./../services/all').re_log;

exports.areaHistoryOrderImport = function (req, res, next) {
  logService.insertLog(req.user.username, '导入历史4-9月地区销量,库存,在途');
  historyOrderService.areaHistoryOrderImport(req.user, req.body.orders, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.hqHistoryOrderImport = function (req, res, next) {
  logService.insertLog(req.user.username, '导入历史4-9月总部');
  historyOrderService.hqHistoryOrderImport(req.user, req.body.orders, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getHqOrderHistory = function (req, res, next) {
  console.log(JSON.stringify(req.user));
  historyOrderService.getHqOrderHistory(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};



exports.getAreaOrderHistory = function (req, res, next) {
  console.log(JSON.stringify(req.user));
  historyOrderService.getAreaOrderHistory(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};






