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
    department: {
      type: String
    },
    //上月月份
    month: {
      type: String
    },
    //产品编码
    product_number: {
      type: String
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
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
    },
    username: {
      type: String
    },
    next_month_sales_forecast_0: {
      type: Number
    },
    next_month_sales_forecast_1: {
      type: Number
    },
    next_month_sales_forecast_2: {
      type: Number
    },
    next_month_sales_forecast_3: {
      type: Number
    },
    next_month_sales_forecast_4: {
      type: Number
    },
    next_month_sales_forecast_5: {
      type: Number
    },
    next_month_sales_forecast_6: {
      type: Number
    },
    last_month_sales_count_1: {
      type: Number
    },
    last_month_sales_count_2: {
      type: Number
    },
    last_month_sales_count_3: {
      type: Number
    }
  });

  AreaSalesSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });
  appDb.model('AreaSales', AreaSalesSchema);
};
