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
  HqSubmitOrder = appDb.model('HqSubmitOrder'),
  HqSales = appDb.model('HqSales');


exports.getCurrentHqSubmitOrder = function (user, callback) {
  var month = getLastMonth(1);
  HqSubmitOrder.findOne({month: month}, function (err, hqSubmitOrder) {
    if (err) {
      return callback({err: error.system.db_error});
    }
    if (hqSubmitOrder) {
      return callback(null, hqSubmitOrder);
    }
    else {
      hqSubmitOrder = new HqSubmitOrder({});
      hqSubmitOrder.month = month;
      hqSubmitOrder.user_number = user.number;
      hqSubmitOrder.order_number = month + user.username + user.number;
      hqSubmitOrder.save(function (err, saveHqSubmitOrder) {
        if (err || !saveHqSubmitOrder) {
          return callback({err: error.system.db_error});
        }
        return callback(null, saveHqSubmitOrder);
      });
    }
  });
};
exports.updateSubmitOtherOrderStatus = function (user, submitOrder, callback) {
  HqSubmitOrder.findOne({_id: submitOrder._id}, function (err, order) {
    if (err || !order) {
      return callback({err: error.system.db_error});
    }
    order.has_Y02 = submitOrder.has_Y02;
    order.has_Y03 = submitOrder.has_Y03;
    order.has_Y04 = submitOrder.has_Y04;
    order.has_Y05 = submitOrder.has_Y05;
    order.has_Y06 = submitOrder.has_Y06;
    order.has_Y07 = submitOrder.has_Y07;
    order.save(function (err, saveOrder) {
      if (err) {
        return callback({err: error.system.db_error});
      }
      return callback(null, saveOrder);
    });
  })
};

exports.sureOrder = function (user, order, callback) {
  HqSales.findOne({_id: order._id}, function (err, hqOrder) {
    if (err) {
      return callback({err: error.system.db_error});
    }
    if (!hqOrder) {
      return callback(null, order);
    }
    hqOrder.is_sure = '是';
    hqOrder.save(function (err, saveAreaOrder) {
      if (err || !saveAreaOrder) {
        return callback({err: error.system.db_error});
      }
      return callback(null, saveAreaOrder);
    });
  });
};

exports.hqStockImport = function (user, stocks, callback) {
  var month = getLastMonth(1);

  async.each(stocks, function (stock, eachCallback) {
    Product.findOne({product_number: stock.product_number}, function (err, product) {
      if (err)
        return eachCallback();

      if (!product) {
        return eachCallback({
          err: {
            type: 'product_not_exist',
            message: '产品编号为 : ' + stock.product_number + ' 的产品不存在'
          }
        });
      }

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

        product.jinyi_ungenuine_goods = stock.ungenuine_goods;
        product.jinyi_validity = stock.validity;
        product.save(function (err, saveProduct) {
          if (err || !saveProduct) {
            return eachCallback();
          }

          hqSales.product_number = stock.product_number;
          hqSales.genuine_goods = stock.genuine_goods;
          hqSales.ungenuine_goods = stock.ungenuine_goods;
          hqSales.validity = stock.validity;
          hqSales.onway_goods = stock.onway_goods;
          hqSales.mid_classify = product.mid_classify;
          hqSales.hq_safe_stock = product.hq_safe_stock;
          hqSales.series_name = product.series_name;
          hqSales.category = product.category;
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
                hqSales.D01_approve = item.D_01_approve + item.D_03_approve + item.D_04_approve;
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
    });
  }, function (err, result) {
    return callback(err, result);
  });
};

exports.getHqCurrentStocks = function (user, callback) {
  HqSales.find({month: getLastMonth(1)}).sort({product_number: 1}).exec(function (err, hqSales) {
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
  HqOrder.find(condition).sort({mid_classify: 1, product_number: 1}).exec(function (err, hqOrders) {
    if (err || !hqOrders) {
      return callback({err: error.system.db_error});
    }
    return callback(null, hqOrders);
  });
};

exports.hqOtherOrderImport = function (user, orders, callback) {
  var month = getLastMonth(1);
  async.each(orders, function (order, eachCallback) {
    Product.findOne({product_number: order.product_number}, function (err, product) {
      if (err) {
        return eachCallback({err: error.system.db_error});
      }

      if (!product) {
        return eachCallback({
          err: {
            type: 'product_not_exist',
            message: '产品编号为 : ' + order.product_number + ' 的产品不存在'
          }
        });
      }

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
        hqOrder.product = product;
        hqOrder.product_barcode = order.product_barcode;
        hqOrder.category = order.category;
        hqOrder.mid_classify = order.mid_classify;
        hqOrder.sales_price = isNaN(parseFloat(order.sales_price)) ? 0 : parseFloat(order.sales_price);
        hqOrder.jinyi_cost = product.jinyi_cost;
        hqOrder.order_number = month + user.username + order.order_type;
        hqOrder.order_count = isNaN(parseInt(order.order_count)) ? 0 : parseInt(order.order_count);
        hqOrder.order_type = order.order_type;
        hqOrder.jinyi_total_price = isNaN(parseFloat(order.jinyi_total_price)) ? 0 : parseFloat(order.jinyi_total_price);
        hqOrder.save(function (err) {
          HqSales.findOne({
            product_number: hqOrder.product_number,
            month: getLastMonth(1)
          }, function (err, hqSales) {
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
    });

  }, function (err) {
    return callback(err, {});
  });
};

exports.getHqSuggestOrders = function (user, callback) {
  HqSales.find({month: getLastMonth(1)}).sort({
    mid_classify: 1,
    product_number: 1
  }).sort({
    category: 1,
    mid_classify: 1,
    series_name: 1,
    product_number: 1
  }).populate('product').exec(function (err, hqSales) {
    if (err || !hqSales) {
      return callback({err: error.system.db_error});
    }
    return callback(null, hqSales);
  });
};

exports.hqSuggestOrderSubmit = function (user, sales, callback) {
  var month = getLastMonth(1);
  HqSubmitOrder.findOne({month: month}, function (err, hqSubmitOrder) {
    if (err) {
      return callback({err: error.system.db_error});
    }
    if (!hqSubmitOrder) {
      hqSubmitOrder = new HqSubmitOrder({});
    }
    if (hqSubmitOrder.status === '已审核') {
      return callback(null, {});
    }
    hqSubmitOrder.month = month;
    hqSubmitOrder.submit_time = new Date();
    hqSubmitOrder.user_number = user.number;
    hqSubmitOrder.order_number = month + user.username + user.number;
    hqSubmitOrder.status = '未审核';
    hqSubmitOrder.save(function (err, saveHqSubmitOrder) {
      if (err || !saveHqSubmitOrder) {
        return callback({err: error.system.db_error});
      }

      async.each(sales, function (sale, eachCallback) {
        if (sale.status === '已审核') {
          return eachCallback();
        }

        HqSales.findOne({_id: sale._id}, function (err, hqSales) {
          if (err || !hqSales) {
            return eachCallback();
          }

          hqSales.remark = sale.remark;
          hqSales.system_suggest_count = sale.system_suggest_count;
          hqSales.final_system_suggest_count = sale.final_system_suggest_count;
          hqSales.system_suggest_count_modify = isNaN(parseInt(sale.system_suggest_count_modify)) ? 0 : parseInt(sale.system_suggest_count_modify);
          hqSales.system_suggest_count_modify_percent = isNaN(parseInt(sale.system_suggest_count_modify_percent)) ? 0 : parseInt(sale.system_suggest_count_modify_percent);
          hqSales.final_purchased_count = sale.final_purchased_count;
          hqSales.status = '未审核';
          hqSales.order_number = hqSubmitOrder.order_number;
          hqSales.D01 = sale.D01;
          hqSales.D01_approve = sale.D01_approve;
          hqSales.D02 = sale.D02;
          hqSales.D02_approve = sale.D02_approve;
          hqSales.D03 = sale.D03;
          hqSales.D03_approve = sale.D03_approve;
          hqSales.D04 = sale.D04;
          hqSales.D04_approve = sale.D04_approve;
          hqSales.save(function () {
            return eachCallback();
          });
        });
      }, function (err) {
        return callback(err, {});
      });
    });
  });
};

exports.getHqOrderList = function (user, callback) {
  HqSubmitOrder.find({}).exec(function (err, hqSubmitOrders) {
    if (err || !hqSubmitOrders) {
      return callback({err: error.system.db_error});
    }
    return callback(null, hqSubmitOrders);
  });
};

exports.approveHqOrder = function (user, order, callback) {
  HqSales.findOne({_id: order._id}, function (err, hqSales) {
    if (err) {
      return callback({err: error.system.db_error});
    }

    if (!hqSales) {
      return callback()
    }

    hqSales.status = '已审核';
    hqSales.final_purchased_count = order.final_purchased_count;
    hqSales.final_purchased_price = order.final_purchased_price;
    hqSales.save(function (err, saveHqSales) {
      if (err || !saveHqSales) {
        return callback({err: error.system.db_error});
      }
      return callback(null, saveHqSales);
    });
  });
};

exports.approveHqOrders = function (user, orders, callback) {
  if (!orders || orders.length === 0) {
    return callback(null, {});
  }
  HqSubmitOrder.findOne({order_number: orders[0].order_number}, function (err, hqSubmitOrder) {
    if (err || !hqSubmitOrder) {
      return callback(null, {});
    }

    hqSubmitOrder.status = '已审核';
    hqSubmitOrder.re_submit_time = new Date();
    async.each(orders, function (order, eachCallback) {
      HqSales.findOne({_id: order._id}, function (err, hqSales) {
        if (err || !hqSales) {
          return eachCallback();
        }
        hqSales.status = '已审核';
        hqSales.D01_approve = order.D01_approve;
        hqSales.final_purchased_count = order.final_purchased_count;
        hqSales.final_purchased_price = order.final_purchased_price;
        hqSales.save(function (err) {
          return eachCallback();
        });
      });
    }, function (err) {
      hqSubmitOrder.save(function (err, saveHqSubmitOrder) {
        return callback(err, {});
      });
    });
  });
};

exports.getHqOrderDetail = function (user, order_number, callback) {
  HqSales.find({order_number: order_number}).populate('product').exec(function (err, areaSales) {
    if (err || !areaSales) {
      return callback({err: error.system.db_error});
    }
    return callback(null, areaSales);
  });
};

exports.importHqDeliveryTime = function (user, order_number, timeInfos, callback) {
  HqSubmitOrder.findOne({order_number: order_number}, function (err, hqSubmitOrder) {
    if (err) {
      return callback({err: error.system.db_error});
    }

    if (!hqSubmitOrder) {
      return callback(null, {});
    }

    hqSubmitOrder.has_delivery_time = true;
    async.each(timeInfos, function (timeInfo, eachCalback) {
      HqSales.findOne({
        order_number: order_number,
        product_number: timeInfo.product_number
      }).populate('product').exec(function (err, hqSale) {
        if (err) {
          return eachCalback({err: error.system.db_error});
        }

        if (!hqSale) {
          return eachCalback(null, {});
        }

        hqSale.plan_delivery_count = hqSale.final_purchased_count;
        hqSale.plan_delivery_time = addDay(hqSubmitOrder.re_submit_time, parseInt(hqSale.product.factory_delivery_cycle) * 30);
        hqSale.onway_count = hqSale.final_purchased_count - parseInt(timeInfo.real_delivery_count);
        hqSale.real_delivery_time = new Date(timeInfo.real_delivery_time);
        hqSale.real_delivery_count = parseInt(timeInfo.real_delivery_count);
        hqSale.final_plan_delivery_time = new Date(timeInfo.final_plan_delivery_time);
        hqSale.save(function (err) {
          return eachCalback();
        });
      });
    }, function (err) {
      if (err) {
        return callback(err);
      }
      hqSubmitOrder.save(function (err) {
        return callback(null, {});
      });
    });
  });
};

function getOrderNumber(username) {
  return getLastMonth(1) + username;
}

function addDay(time, day) {
  return new Date(time.getTime() + 24 * 60 * 60 * 1000 * day);
}

function getLastMonth(index) {
  var cur = new Date();
  cur = cur.setMonth(cur.getMonth() - index + 1);
  cur = moment(cur).format('YYYYMM');
  return cur;
}

exports.getHqReports = function (user, month, nextMonth, callback) {
  HqSales.find({month: month}).populate('product').exec(function (err, hqSales) {
    if (err) {
      return callback({err: error.system.db_error});
    }

    async.each(hqSales, function (hqSale, eachCallback) {
      AreaSales.aggregate([
        {
          $match: {
            product_number: hqSale.product_number,
            month: nextMonth
          }
        },
        {
          $group: {
            _id: '$month',
            sales_count: {$sum: '$last_month_sales_count_1'}
          }
        }
      ]).exec(function (err, result) {
        result.forEach(function (item) {
          hqSale.last_month_sales_count_0 = item.sales_count
        });
        return eachCallback();
      });
    }, function (err) {
      return callback(err, hqSales);
    });
  });
};
