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
  HqHistoryOrder = appDb.model('HqHistoryOrder'),
  AreaSales = appDb.model('AreaSales');


exports.areaHistoryOrderImport = function (user, orders, callback) {
  async.each(orders, function (order, eachCallback) {
    if (!order.department || !order.product_number || !order.month) {
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

        areaHistorySale.sale_count = isNaN(parseInt(order.sale_count)) ? 0 : parseInt(order.sale_count);
        areaHistorySale.stock_count = isNaN(parseInt(order.stock_count)) ? 0 : parseInt(order.stock_count);
        areaHistorySale.onway_count = isNaN(parseInt(order.onway_count)) ? 0 : parseInt(order.onway_count);

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


exports.hqHistoryOrderImport = function (user, orders, callback) {
  async.each(orders, function (order, eachCallback) {
    if (!order.product_number || !order.month) {
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

      HqHistoryOrder.findOne({
        product_number: order.product_number,
        month: order.month
      }, function (err, hqHistorySale) {
        if (err) {
          return eachCallback();
        }

        if (!hqHistorySale) {
          hqHistorySale = new HqHistoryOrder({});
        }
        else {
          console.log('sdfadfads-------' + hqHistorySale.product_number);
        }

        hqHistorySale.month = order.month;
        hqHistorySale.product_number = order.product_number;
        hqHistorySale.product = product;

        hqHistorySale.zhengpin = isNaN(parseInt(order.zhengpin)) ? 0 : parseInt(order.zhengpin);
        hqHistorySale.zaitu = isNaN(parseInt(order.zaitu)) ? 0 : parseInt(order.zaitu);
        hqHistorySale.jinxiaoqi = isNaN(parseInt(order.jinxiaoqi)) ? 0 : parseInt(order.jinxiaoqi);
        hqHistorySale.cipin = isNaN(parseInt(order.cipin)) ? 0 : parseInt(order.cipin);

        hqHistorySale.save(function (err) {
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

exports.getHqOrderHistory = function (user, callback) {
  HqHistoryOrder.find({}).populate('product').exec(function (err, results) {
    return callback(err, results);
  });
};


exports.getAreaOrderHistory = function (user, callback) {
  var condition = {};
  if (user.account_type == '地区分公司') {
    condition.department = user.department;
  }

  AreaHistoryOrder.find(condition).populate('product').exec(function (err, results) {
    return callback(err, results);
  });
};
