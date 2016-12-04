/**
 * Created by zenghong on 16/1/20.
 */
'use strict';

var appDb = require('./../../libraries/mongoose').appDb,
  async = require('async'),
  User = appDb.model('User'),
  moment = require('moment'),
  AreaOrder = appDb.model('AreaOrder'),
  Product = appDb.model('Product'),
  AreaSubmitOrder = appDb.model('AreaSubmitOrder'),
  HqSales = appDb.model('HqSales'),
  AreaHistoryOrder = appDb.model('AreaHistoryOrder'),
  AreaSales = appDb.model('AreaSales');


exports.areaHistoryOrderImport = function (user, orders, callback) {
  async.each(orders, function (order, eachCallback) {
    if (!order.department || !order.product_number || !order.month) {
      return eachCallback();
    }

    if (order.month === getLastMonth(1)) {
      return eachCallback();
    }

    Product.findOne({product_number: order.product_number}, function (err, product) {
      if (err)
        return eachCallback();

      if (!product) {
        return eachCallback({
          err: {
            type: 'product_not_exist',
            message: '产品编号为 : ' + order.product_number + ' 的产品不存在'
          }
        });
      }

      AreaHistoryOrder.findOne({
        product_number: order.product_number,
        month: order.month,
        department: order.department
      }, function (err, areaHistorySale) {
        if (err) {
          return eachCallback();
        }

        if (!areaHistorySale) {
          areaHistorySale = new AreaHistoryOrder({});
        }
        else {
          console.log('sdfadfads-------' + areaHistorySale.product_number);
          console.log('old orders ----------------' + new_count++);
        }

        areaHistorySale.department = order.department;
        areaHistorySale.month = order.month;
        areaHistorySale.product_number = order.product_number;
        areaHistorySale.product = product;

        areaHistorySale.sale_count = parseInt(order.sale_count);
        areaHistorySale.stock_count = parseInt(order.stock_count);
        areaHistorySale.onway_count = parseInt(order.onway_count);

        areaHistorySale.save(function (err) {
          if (err) {
            console.log(err);
          }
          return eachCallback();
        });
      });
    });
  }, function (err, result) {
    return callback(err, {});
  });
};
