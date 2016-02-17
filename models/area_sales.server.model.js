/**
 * Created by zenghong on 16/2/17.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

module.exports = function (appDb) {
  var AreaSalesSchema = new Schema({
    object: {
      type: String,
      default: 'areaSales'
    },
    area: {
      type: String
    },
    month: {
      type: String
    },
    //产品编码
    product_number: {
      type: String
    },
    //上月销量
    last_month_sales_count: {
      type: Number,
      default: 0
    },
    //上月月结库存
    last_month_stock_count: {
      type: Number,
      default: 0
    },
    //上月月结在途量
    last_month_onway_count: {
      type: Number,
      default: 0
    }
  });

  AreaSalesSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });

  appDb.model('AreaSales', AreaSalesSchema);
};
