/**
 * Created by zenghong on 16/1/20.
 */
'use strict';

var appDb = require('./../../libraries/mongoose').appDb,
  error = require('./../../errors/all'),
  async = require('async'),
  User = appDb.model('User'),
  moment = require('moment'),
  AreaOrder = appDb.model('AreaOrder'),
  AreaSales = appDb.model('AreaSales'),
  Product = appDb.model('Product'),
  HqOrder = appDb.model('HqOrder'),
  HqSales = appDb.model('HqSales');

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
          hqSales = new HqSales({});
        }

        hqSales.product_number = stock.product_number;
        hqSales.genuine_goods = stock.genuine_goods;
        hqSales.ungenuine_goods = stock.ungenuine_goods;
        hqSales.validity = stock.validity;
        hqSales.product = product;
        hqSales.month = month;

        AreaSales.aggregate([
          {
            $match: {
              product_number: stock.product_number,
              month: {$in: [getLastMonth(1), getLastMonth(2), getLastMonth(3)]}
            }
          },
          {
            $group: {
              _id: '$month',
              sales_count: {$sum: '$last_month_sales_count'},
              D_01: {$sum: '$D01'},
              D_01_approve: {$sum: '$D01_approve'},
              D_02: {$sum: '$D02'},
              D_02_approve: {$sum: '$D02_approve'},
              D_03: {$sum: '$D03'},
              D_03_approve: {$sum: '$D03_approve'},
              D_04: {$sum: '$D04'},
              D_04_approve: {$sum: '$D04_approve'}
            }
          }
        ]).exec(function (err, result) {
          result.forEach(function (item) {
            if (item._id === getLastMonth(1)) {
              hqSales.D01 = item.D_01;
              hqSales.D02 = item.D_02;
              hqSales.D03 = item.D_03;
              hqSales.D04 = item.D_04;
              hqSales.D01_approve = item.D_01_approve;
              hqSales.D02_approve = item.D_02_approve;
              hqSales.D03_approve = item.D_03_approve;
              hqSales.D04_approve = item.D_04_approve;

              hqSales.last_month_sales_count_1 = item.sales_count;
            }
            if (item._id === getLastMonth(2)) {
              hqSales.last_month_sales_count_2 = item.sales_count;
            }
            if (item._id === getLastMonth(3)) {
              hqSales.last_month_sales_count_3 = item.sales_count;
            }
          });

          HqSales.aggregate([
            {
              $match: {
                product_number: stock.product_number,
                month: {$in: [getLastMonth(2), getLastMonth(3)]}
              }
            },
            {
              $group: {
                _id: '$month',
                stock: {$sum: '$genuine_goods'}
              }
            }
          ]).exec(function (err, result) {
            result.forEach(function (item) {
              if (item._id === getLastMonth(2)) {
                hqSales.last_month_stock_count_2 = item.genuine_goods;

              }
              if (item._id === getLastMonth(3)) {
                hqSales.last_month_stock_count_3 = item.genuine_goods;
              }
            });
            hqSales.last_month_stock_count_1 = hqSales.genuine_goods;
            hqSales.save(function (err) {
              return eachCallback();
            });
          });
        });
      });
    });
  }, function (err, result) {
    return callback(err, result);
  });
};

exports.getHqCurrentStocks = function (user, callback) {
  HqSales.find({month: getLastMonth(1)}, function (err, hqSales) {
    if (err || !hqSales) {
      return callback({err: error.system.db_error});
    }

    return callback(null, hqSales);
  });
};

exports.getHqOtherOrders = function (user, info, callback) {
  var condition = {
    month: getLastMonth(1)
  };
  if (info.order_type) {
    condition.order_type = info.order_type;
  }
  else {
    condition.order_type = {$in: ['Y02', 'Y03', 'Y04']};
  }
  HqOrder.find(condition, function (err, hqOrders) {
    if (err || !hqOrders) {
      return callback({err: error.system.db_error});
    }
    return callback(null, hqOrders);
  });
};

exports.hqOtherOrderImport = function (user, orders, callback) {
  var month = getLastMonth(1);
  async.each(orders, function (order, eachCallback) {
    HqOrder.findOne({
      month: month,
      product_number: order.product_number,
      order_type: order.order_type
    }, function (err, hqOrder) {
      if (err) {
        return callback({err: error.system.db_error});
      }

      if (!hqOrder) {
        hqOrder = new HqOrder({
          month: month,
          product_number: order.product_number
        });
      }

      hqOrder.product_name = order.product_name;
      hqOrder.product_barcode = order.product_barcode;
      hqOrder.category = order.category;
      hqOrder.sales_price = isNaN(parseFloat(order.sales_price)) ? 0 : parseFloat(order.sales_price);
      hqOrder.jinyi_cost = isNaN(parseFloat(order.jinyi_cost)) ? 0 : parseFloat(order.jinyi_cost);
      hqOrder.order_number = month + user.username + order.order_type;
      hqOrder.order_count = isNaN(parseInt(order.order_count)) ? 0 : parseInt(order.order_count);
      hqOrder.order_type = order.order_type;
      hqOrder.jinyi_total_price = isNaN(parseFloat(order.jinyi_total_price)) ? 0 : parseFloat(order.jinyi_total_price);
      hqOrder.save(function (err) {
        HqSales.findOne({product_number: hqOrder.product_number, month: getLastMonth(1)}, function (err, hqSales) {
          if (err || !hqSales) {
            return eachCallback();
          }
          hqSales[hqOrder.order_type] = hqOrder.order_count;
          hqSales.save(function (err) {
            return eachCallback();
          })
        });
      });
    });
  }, function (err) {
    return callback(err, {});
  });
};

exports.getHqSuggestOrders = function (user, callback) {
  HqSales.find({month: getLastMonth(1)}).populate('product').exec(function (err, hqSales) {
    if (err || !hqSales) {
      return callback({err: error.system.db_error});
    }
    return callback(null, hqSales);
  });
};

exports.hqSuggestOrderSubmit = function (user, sales, callback) {

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
