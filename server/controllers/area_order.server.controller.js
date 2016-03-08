/**
 * Created by zenghong on 16/1/20.
 */
'use strict';
var areaOrderService = require('./../services/all').area_order;
var logService = require('./../services/all').re_log;

exports.getCurrentAreaSubmitOrder = function (req, res, next) {
  areaOrderService.getCurrentAreaSubmitOrder(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.updateSubmitOhterOrderStatus = function (req, res, next) {
  areaOrderService.updateSubmitOhterOrderStatus(req.user, req.body.submit_order, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.areaSalesStockOnwayImport = function (req, res, next) {
  logService.insertLog(req.user.username, '导入地区销量,库存,在途');
  areaOrderService.areaSalesStockOnwayImport(req.user, req.body.sales, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.otherOrderImport = function (req, res, next) {
  logService.insertLog(req.user.username, '导入地区其他订单');
  areaOrderService.otherOrderImport (req.user, req.body.orders, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getOrdersByArea = function (req, res, next) {
  areaOrderService.getOrdersByArea (req.user, req.query.order_type, function (err, result) {
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

exports.sureOrder = function (req, res, next) {
  areaOrderService.sureOrder (req.user, req.body.order, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.historyAreaSalesStockOnwayImport = function (req, res, next) {
  logService.insertLog(req.user.username, '导入地区历史销量');
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
  logService.insertLog(req.user.username, '提交地区订单');
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

exports.approveAreaOrder = function (req, res, next) {
  logService.insertLog(req.user.username, '审批地区订单');
  areaOrderService.approveAreaOrder(req.user, req.body.order, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.approveAreaOrders = function (req, res, next) {
  logService.insertLog(req.user.username, '审批地区订单');
  areaOrderService.approveAreaOrders(req.user, req.body.orders, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};



