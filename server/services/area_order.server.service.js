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
  AreaOrder = appDb.model('AreaOrder');

exports.areaSalesStockOnwayImport = function (user, orders, callback) {
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
      areaOrder.last_month_sales_count = order.last_month_sales_count;
      areaOrder.last_month_stock_count = order.last_month_stock_count;
      areaOrder.last_month_onway_count = order.last_month_onway_count;
      areaOrder.area = user.area;
      areaOrder.is_approval = is_approval;
      areaOrder.save(function () {
        return eachCallback();
      });
    }, function (err, result) {
      return callback(err, result);
    });
  });
};

function getOrderNumber(username) {
  var cur = new Date();
  cur = cur.setMonth(cur.getMonth() - 1);
  cur = moment.format('YYYYMM');
  return cur + username;
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




