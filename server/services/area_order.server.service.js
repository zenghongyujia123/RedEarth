/**
 * Created by zenghong on 16/1/20.
 */
'use strict';

var appDb = require('./../../libraries/mongoose').appDb,
  error = require('./../../errors/all'),
  cryptoLib = require('./../../libraries/crypto'),
  async = require('async'),
  User = appDb.model('User'),
  moment = require('moment'),
  AreaOrder = appDb.model('AreaOrder'),
  AreaSales = appDb.model('AreaSales');

exports.areaSalesStockOnwayImport = function (user, sales, callback) {
  var month = getLastMonth();

  async.each(sales, function (sale, eachCallback) {
    AreaSales.findOne({
      month: month,
      department: user.department,
      product_number: sale.product_number
    }, function (err, areaSales) {
      if (err) {
        return eachCallback();
      }

      if (!areaSales) {
        areaSales = new AreaSales({
          username: user.username
        });
      }

      areaSales.product_number = sale.product_number;
      areaSales.last_month_sales_count = isNaN(parseInt(sale.last_month_sales_count)) ? 0 : parseInt(sale.last_month_sales_count);
      areaSales.last_month_stock_count = isNaN(parseInt(sale.last_month_stock_count)) ? 0 : parseInt(sale.last_month_stock_count);
      areaSales.last_month_onway_count = isNaN(parseInt(sale.last_month_onway_count)) ? 0 : parseInt(sale.last_month_onway_count);
      areaSales.month = month;
      areaSales.department = user.department;
      areaSales.save(function () {
        return eachCallback();
      });
    });
  }, function (err, result) {
    return callback(err, result);
  });
};

function getOrderNumber(username) {
  return getLastMonth() + username;
}

function getLastMonth() {
  var cur = new Date();
  cur = cur.setMonth(cur.getMonth() - 1);
  cur = moment(cur).format('YYYYMM');
  return cur;
}

exports.otherOrderImport = function (user, orders, callback) {
  var order_number = getOrderNumber(user.username);
  var month = getLastMonth();
  async.each(orders, function (order, eachCallback) {
    AreaOrder.findOne({
      order_number: order_number + order.order_type,
      product_number: order.product_number,
      month: month,
    }, function (err, areaOrder) {
      if (err) {
        return eachCallback();
      }

      if (!areaOrder) {
        areaOrder = new AreaOrder({});
      }

      if (areaOrder.is_approval === true) {
        return eachCallback();
      }
      areaOrder.product_number = order.product_number;
      areaOrder.product_name = order.product_name;
      areaOrder.product_barcode = order.product_name;
      areaOrder.category = order.category;
      areaOrder.mid_classify = order.mid_classify;
      areaOrder.sales_price = parseFloat(order.sales_price);
      areaOrder.order_number = order_number + order.order_type;
      areaOrder.order_count = parseInt(order.order_count);
      areaOrder.order_type = order.order_type;
      areaOrder.total_price = parseFloat(order.total_price);
      areaOrder.department = user.department;
      areaOrder.month = month;
      areaOrder.save(function (err) {
        return eachCallback();
      });
    });
  }, function (err, result) {
    return callback(err, result);
  });
};

exports.getOrdersByArea = function (user, callback) {
  var month = getLastMonth();
  AreaOrder.find({department: user.department, month: month}, function (err, orders) {
    if (err || !orders) {
      return callback({err: error.system.db_error});
    }
    return callback(null, orders);
  });
};

exports.getSalesByArea = function (user, callback) {
  var month = getLastMonth();
  AreaSales.find({department: user.department, month: month}, function (err, areaSalse) {
    if (err || !areaSalse) {
      return callback({err: error.system.db_error});
    }
    return callback(null, areaSalse);
  })
};

exports.historyAreaSalesStockOnwayImport = function (user, sales, callback) {
  async.each(sales, function (sale, eachCallback) {
    if (!sale.department || !sale.product_number || !sale.month) {
      return eachCallback();
    }

    AreaSales.findOne({
      product_number: sale.product_number,
      month: sale.month,
      department: sale.department
    }, function (err, areaSale) {
      if (err) {
        return eachCallback();
      }

      if (!areaSale) {
        areaSale = new AreaSales({
          username: user.username
        });
      }

      areaSale.department = sale.department;
      areaSale.month = sale.month;
      areaSale.product_number = sale.product_number;
      if (sale.last_month_sales_count) {
        areaSale.last_month_sales_count = isNaN(parseInt(sale.last_month_sales_count)) ? 0 : parseInt(sale.last_month_sales_count);
      }

      if (sale.last_month_onway_count) {
        areaSale.last_month_onway_count = isNaN(parseInt(sale.last_month_onway_count)) ? 0 : parseInt(sale.last_month_onway_count);
      }

      if (sale.last_month_stock_count) {
        areaSale.last_month_stock_count = isNaN(parseInt(sale.last_month_stock_count)) ? 0 : parseInt(sale.last_month_stock_count);
      }

      areaSale.save(function (err) {
        return eachCallback();
      });

    });
  }, function (err, result) {
    return callback(err, {})
  });
};

exports.getHistoryAreaSalesStockOnway = function (user, callback) {
  var condition = {};
  if (user.account_type === '地区分公司') {
    condition.department = user.department;
  }

  AreaSales.find(condition, function (err, areaSales) {
    if (err || !areaSales) {
      return callback({err: error.system.db_error});
    }

    return callback(null, areaSales);
  });
};



