/**
 * Created by zenghong on 16/1/20.
 */
'use strict';
var hqOrderService = require('./../services/all').hq_order;
var logService = require('./../services/all').re_log;

exports.getCurrentHqSubmitOrder = function (req, res, next) {
  hqOrderService.getCurrentHqSubmitOrder(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.updateSubmitOtherOrderStatus = function (req, res, next) {
  hqOrderService.updateSubmitOtherOrderStatus(req.user, req.body.submit_order, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.hqStockImport = function (req, res, next) {
  logService.insertLog(req.user.username, '导入总部库存');
  hqOrderService.hqStockImport(req.user, req.body.stocks, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getHqOrderDetail = function (req, res, next) {
  hqOrderService.getHqOrderDetail (req.user, req.query.order_number, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.sureOrder = function (req, res, next) {
  hqOrderService.sureOrder (req.user, req.body.order, function (err, result) {
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
  hqOrderService.getHqOtherOrders (req.user, {order_type: req.query.order_type || ''}, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

function getOtherOrderText(type) {
  switch (type) {
    case 'Y01':
      return '正品';
    case 'Y02':
      return '批发';
    case 'Y03':
      return '试用装';
    case 'Y04':
      return '陈列';
    case 'Y05':
      return '经销商';
    case 'Y06':
      return '电商';
    case 'Y07':
      return '茂姿';
  }
}

exports.hqOtherOrderImport = function (req, res, next) {
  var order = req.body.orders[0] || {};
  logService.insertLog(req.user.username, '导入总部' + getOtherOrderText(order.order_type) + '订单');
  hqOrderService.hqOtherOrderImport (req.user, req.body.orders, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getHqSuggestOrders = function (req, res, next) {
  hqOrderService.getHqSuggestOrders(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.hqSuggestOrderSubmit = function (req, res, next) {
  logService.insertLog(req.user.username, '总部递交订单');
  hqOrderService.hqSuggestOrderSubmit(req.user, req.body.sales, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.getHqOrderList = function (req, res, next) {
  hqOrderService.getHqOrderList(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.approveHqOrder = function (req, res, next) {
  hqOrderService.approveHqOrder(req.user, req.body.order, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.approveHqOrders = function (req, res, next) {
  hqOrderService.approveHqOrders(req.user, req.body.orders, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};

exports.importHqDeliveryTime = function (req, res, next) {
  hqOrderService.importHqDeliveryTime(req.body.user, req.body.order_number, req.body.time_infos, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};


exports.getHqReports = function (req, res, next) {
  hqOrderService.getHqReports (req.body.user,req.query.month,req.query.next_month, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};
