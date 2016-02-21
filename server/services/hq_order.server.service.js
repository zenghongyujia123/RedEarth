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
  Product = appDb.model('Product'),
  AreaSubmitOrder = appDb.model('AreaSubmitOrder'),
  HqSales = appDb.model('HqSales ');

exports.hqStockImport = function (user, stocks, callback) {
  var month = getLastMonth(1);

  async.each(stocks, function (stock, eachCallback) {
    Product.findOne({product_number: stock.product_number}, function (err, product) {
      if (err || !product)
        return eachCallback();

      HqSales.findOne({
        month: month,
        product_number: stock.product_number
      }, function (err, hqSales) {
        if (err) {
          return eachCallback();
        }

        if (!hqSales) {
          hqSales = new AreaSales({
            username: user.username
          });
        }

        hqSales.product_number = stock.product_number;
        hqSales.genuine_goods = stock.genuine_goods;
        hqSales.ungenuine_goods = stock.ungenuine_goods;
        hqSales.validity = stock.validity;
        hqSales.month = month;
        hqSales.save(function (err) {
          return eachCallback();
        });
      });
    });
  }, function (err, result) {
    return callback(err, result);
  });
};

function getOrderNumber(username) {
  return getLastMonth(1) + username;
}

function getLastMonth(index) {
  var cur = new Date();
  cur = cur.setMonth(cur.getMonth() - index);
  cur = moment(cur).format('YYYYMM');
  return cur;
}
