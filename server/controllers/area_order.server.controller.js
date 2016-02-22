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

exports.historyAreaSalesStockOnwayImport = function (req, res, next) {
  areaOrderService.historyAreaSalesStockOnwayImport  (req.user, req.body.sales, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getHistoryAreaSalesStockOnway = function (req, res, next) {
  areaOrderService.getHistoryAreaSalesStockOnway (req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getAreaSuggestOrder = function (req, res, next) {
  areaOrderService.getAreaSuggestOrder (req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.suggestOrderSubmit = function (req, res, next) {
  areaOrderService.suggestOrderSubmit (req.user, req.body.sales, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getAreaOrderList = function (req, res, next) {
  areaOrderService.getAreaOrderList (req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getAreaOrderDetail = function (req, res, next) {
  areaOrderService.getAreaOrderDetail (req.user, req.query.order_number, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};



