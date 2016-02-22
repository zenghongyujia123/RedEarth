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
  AreaSales = appDb.model('AreaSales');

exports.areaSalesStockOnwayImport = function (user, sales, callback) {
  var month = getLastMonth(1);

  async.each(sales, function (sale, eachCallback) {
    Product.findOne({product_number: sale.product_number}, function (err, product) {
      if (err || !product)
        return eachCallback();

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
        areaSales.last_month_sales_count_1 = isNaN(parseInt(sale.last_month_sales_count)) ? 0 : parseInt(sale.last_month_sales_count);
        areaSales.last_month_stock_count_1 = isNaN(parseInt(sale.last_month_stock_count)) ? 0 : parseInt(sale.last_month_stock_count);
        areaSales.product = product;
        areaSales.month = month;
        areaSales.department = user.department;

        AreaSales.findOne({
          month: getLastMonth(2),
          product_number: sale.product_number,
          department: user.department
        }, function (err, areaSales2) {
          areaSales.last_month_sales_count_2 = 0;
          areaSales.last_month_stock_count_2 = 0;
          if (areaSales2) {
            areaSales.last_month_sales_count_2 = areaSales2.last_month_sales_count;
            areaSales.last_month_stock_count_2 = areaSales2.last_month_stock_count;
          }
          AreaSales.findOne({
            month: getLastMonth(3),
            product_number: sale.product_number,
            department: user.department
          }, function (err, areaSales3) {
            areaSales.last_month_sales_count_3 = 0;
            areaSales.last_month_stock_count_3 = 0;
            if (areaSales3) {
              areaSales.last_month_sales_count_3 = areaSales3.last_month_sales_count;
              areaSales.last_month_stock_count_3 = areaSales3.last_month_stock_count;
            }
            areaSales.save(function (err) {
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

function getOrderNumber(username) {
  return getLastMonth(1) + username;
}

function getLastMonth(index) {
  var cur = new Date();
  cur = cur.setMonth(cur.getMonth() - index);
  cur = moment(cur).format('YYYYMM');
  return cur;
}

exports.otherOrderImport = function (user, orders, callback) {
  var order_number = getOrderNumber(user.username);
  var month = getLastMonth(1);
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
  var month = getLastMonth(1);
  AreaOrder.find({department: user.department, month: month}, function (err, orders) {
    if (err || !orders) {
      return callback({err: error.system.db_error});
    }
    return callback(null, orders);
  });
};

exports.getSalesByArea = function (user, callback) {
  var month = getLastMonth(1);
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

exports.getAreaSuggestOrder = function (user, callback) {
  var month = getLastMonth(1);
  var suggests = [];
  AreaSales.find({department: user.department, month: month}).populate('product').exec(function (err, areaSales) {
    if (err || !areaSales) {
      return callback({err: error.system.db_error});
    }
    async.each(areaSales, function (areaSale, eachCallback) {
      var suggest = {};
      if (areaSale.toObject)
        areaSale = areaSale.toObject();
      AreaOrder.aggregate([
        {
          $match: {
            product_number: areaSale.product_number,
            month: month,
            department: areaSale.department
          }
        },
        {
          $group: {
            _id: '$order_type',
            count: {$sum: '$order_count'}
          }
        }
      ]).exec(function (err, result) {
        suggest = areaSale;
        if (result) {
          result.forEach(function (item) {
            suggest[item._id] = item.count;
          })
        }
        suggests.push(suggest);
        return eachCallback();
      });
    }, function (err) {
      return callback(null, suggests);
    });
  });
};

exports.suggestOrderSubmit = function (user, sales, callback) {
  var month = getLastMonth(1);
  AreaSubmitOrder.findOne({month: month, user_number: user.number}, function (err, areaSubmitOrder) {
    if (err) {
      return callback({err: error.system.db_error});
    }
    if (!areaSubmitOrder) {
      areaSubmitOrder = new AreaSubmitOrder({
        month: month,
        user_number: user.number,
        order_number: month + user.username + user.number,
        status: '未审核'
      });
    }
    areaSubmitOrder.order_number = month + user.username + user.number;
    areaSubmitOrder.save(function (err, saveAreaSubmitOrder) {
      if (err || !saveAreaSubmitOrder) {
        return callback({err: error.system.db_error});
      }
      async.each(sales, function (sale, eachCallback) {
        if (sale.status === '已审核') {
          return eachCallback();
        }
        AreaSales.findOne({_id: sale._id}, function (err, areaSales) {
          if (err || !AreaSales) {
            return eachCallback();
          }

          areaSales.system_suggest_count = sale.system_suggest_count;
          areaSales.system_suggest_count_modify = sale.system_suggest_count_modify;
          areaSales.system_suggest_count_modify_percent = sale.system_suggest_count_modify_percent;
          areaSales.status = '未审核';
          areaSales.order_number = areaSubmitOrder.order_number;
          areaSales.D02 = sale.D02;
          areaSales.D03 = sale.D03;
          areaSales.D04 = sale.D04;
          areaSales.save(function () {
            return eachCallback();
          });
        });
      }, function (err, result) {

        return callback(err, {});
      });


    });
  });


};

exports.getAreaOrderList = function (user, callback) {
  var condition = {};
  if (user.account_type === 'account_type') {
    condition.user_number = user.number;
  }
  AreaSubmitOrder.find(condition).sort('month').exec(function (err, aresSales) {
    if (err || !aresSales) {
      return callback({err: error.system.db_error});
    }
    return callback(null, aresSales);
  });
};

exports.getAreaOrderDetail = function (user, order_number, callback) {
  AreaSales.find({order_number: order_number}).populate('product').exec(function (err, areaSales) {
    if (err || !areaSales) {
      return callback({err: error.system.db_error});
    }
    return callback(null, areaSales);
  });
};

exports.approveAreaOrder = function (user, order, callback) {
  AreaSales.findOne({_id: order._id}, function (err, areaSales) {
    if (err) {
      return callback({err: error.system.db_error});
    }
    if (!areaSales) {
      return callback({err: error.business.area_sale_not_found});
    }

    areaSales.D02_approve = order.D02_approve;
    areaSales.D03_approve = order.D03_approve;
    areaSales.D04_approve = order.D04_approve;
    areaSales.status = '已审核';
    areaSales.save(function (err, saveAreaSales) {
      if (err || !saveAreaSales) {
        return callback({err: error.system.db_error});
      }
      return callback(null, saveAreaSales)
    });
  });
};



