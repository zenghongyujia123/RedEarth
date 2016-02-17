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

  sales.each(sales, function (sale, eachCallback) {
    AreaSales.findOne({month: month, area: user.area}, function (err, areaSales) {
      if (err) {
        return eachCallback();
      }

      if (!areaSales) {
        areaSales = new AreaSales({});
      }

      areaSales.product_number = sale.product_number;
      areaSales.last_month_sales_count = sale.last_month_sales_count;
      areaSales.last_month_stock_count = sale.last_month_stock_count;
      areaSales.last_month_onway_count = sale.last_month_onway_count;
      areaSales.month = month;
      areaSales.area = area;
      areaSales.save(function () {
        return eachCallback();
      });
    }, function (err, result) {
      return callback(err, result);
    });
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
  orders.each(orders, function (order, eachCallback) {
    AreaOrder.findOne({
      order_number: order_number + order.order_type,
      product_number: order.product_number
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
      areaOrder.sales_price = order.sales_price;
      areaOrder.order_number = order_number + order.order_type;
      areaOrder.order_count = order.order_count;
      areaOrder.order_type = order.order_type;
      areaOrder.total_price = order.total_price;
      areaOrder.is_approval = is_approval;
      areaOrder.area = user.area;
      areaOrder.save(function () {
        return eachCallback();
      });
    }, function (err, result) {
      return callback(err, result);
    });
  });
};

exports.getOrdersByArea = function (user, callback) {
  var order_number = getOrderNumber(user.username);
  AreaOrder.find({order_number: order_number + user.area}, function (err, orders) {
    if (err || !orders) {
      return callback({err: error.system.db_error});
    }
    return callback(null, orders);
  });
};

exports.getSalesByArea = function (user, callback) {
  var month = getLastMonth();
  AreaSales.find({area: user.area, month: month}, function (err, areaSalse) {
    if (err || !areaSalse) {
      return callback({err: error.system.db_error});
    }
    return callback(null, areaSalse);
  })
};



