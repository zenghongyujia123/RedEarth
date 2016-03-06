/**
 * Created by zenghong on 16/1/20.
 */
'use strict';

var appDb = require('./../../libraries/mongoose').appDb,
  error = require('./../../errors/all'),
  async = require('async'),
  Desk = appDb.model('Desk'),
  Product = appDb.model('Product');

exports.getProducts = function (user, callback) {
  Product.find({}, function (err, products) {
    if (err || !products) {
      return callback({err: error.system.db_error});
    }

    return callback(null, products);
  });
};

exports.importProducts = function (user, products, callback) {
  async.each(products, function (product, eachCallback) {
    Product.findOne({product_number: product.product_number}, function (err, findProduct) {
      if (err) {
        return eachCallback();
      }

      if (!findProduct) {
        findProduct = new Product({});
      }

      findProduct.product_number = product.product_number;
      findProduct.product_barcode = product.product_barcode;
      findProduct.sap_code = product.sap_code;
      findProduct.product_name = product.product_name;
      findProduct.specification = product.specification;
      findProduct.category = product.category;
      findProduct.series_name = product.series_name;
      findProduct.mid_classify = product.mid_classify;
      findProduct.small_classify = product.small_classify;
      findProduct.sales_price = isNaN(parseInt(product.sales_price)) ? 0 : parseInt(product.sales_price);
      findProduct.jinyi_cost = isNaN(parseInt(product.jinyi_cost)) ? 0 : parseInt(product.jinyi_cost);
      findProduct.start_sales_date = product.start_sales_date;
      findProduct.end_sales_date = product.end_sales_date;
      findProduct.expiration_date = product.expiration_date;
      findProduct.sales_unit = product.sales_unit;
      findProduct.factory_name = product.factory_name;
      findProduct.factory_moq = product.factory_moq;
      findProduct.moq_remark = product.moq_remark;
      findProduct.factory_delivery_cycle = product.factory_delivery_cycle;
      findProduct.is_star_product = product.is_star_product;
      findProduct.top_sku_ranking = product.top_sku_ranking;
      findProduct.abc_classify = product.abc_classify;
      findProduct.abc_classify_explain = product.abc_classify_explain;
      findProduct.abc_category = product.abc_category || 50;
      findProduct.desk_sales_reference = product.desk_sales_reference;
      findProduct.desk_minimum_order_count = product.desk_minimum_order_count;
      findProduct.desk_safe_stock = product.desk_safe_stock;
      findProduct.area_sales_reference = product.area_sales_reference;
      findProduct.area_safe_stock = product.area_safe_stock;
      findProduct.area_modify_exceed = product.area_modify_exceed;
      findProduct.area_modify_exceed_remark = product.area_modify_exceed_remark;
      findProduct.hq_sales_reference = product.hq_sales_reference;
      findProduct.hq_safe_stock = product.hq_safe_stock;
      findProduct.approval_modify_exceed = product.approval_modify_exceed;
      findProduct.approval_modify_exceed_remark = product.approval_modify_exceed_remark;
      findProduct.order_count_exceed_moq = product.order_count_exceed_moq;
      findProduct.is_area_speciality = product.is_area_speciality;
      findProduct.area_speciality_more = product.area_speciality_more;
      findProduct.is_season_speciality = product.is_season_speciality;
      findProduct.season_speciality_more = product.season_speciality_more;
      findProduct.desk_promotion_month = product.desk_promotion_month;
      findProduct.desk_promotion_rate = product.desk_promotion_rate;
      findProduct.field_1 = product.field_1;
      findProduct.field_2 = product.field_2;
      findProduct.field_3 = product.field_3;
      findProduct.field_4 = product.field_4;
      findProduct.field_5 = product.field_5;
      findProduct.save(function (err) {
        return eachCallback();
      });
    });
  }, function (err, result) {
    return callback(err, {});
  });
};

exports.getDesks = function (user, callback) {
  Desk.find({}, function (err, desks) {
    if (err || !desks) {
      return callback({err: error.system.db_error});
    }
    return callback(null, desks)
  });
};

exports.importDesks = function (user, callback) {

};


