/**
 * Created by zenghong on 16/2/21.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

module.exports = function (appDb) {
  var HqSalesSchema = new Schema({
    object: {
      type: String,
      default: 'hqSales'
    },
    product_number: {
      type: String
    },
    //正品
    genuine_goods: {
      type: Number,
      default: 0
    },
    month:{
      type:String
    },
    //近效期
    validity: {
      type: String,
    },
    //次品
    ungenuine_goods: {
      type: Number,
      default: 0
    },
    next_month_sales_forecast_0: {
      type: Number,
      default: 0
    },
    next_month_sales_forecast_1: {
      type: Number,
      default: 0
    },
    next_month_sales_forecast_2: {
      type: Number,
      default: 0
    },
    next_month_sales_forecast_3: {
      type: Number,
      default: 0
    },
    next_month_sales_forecast_4: {
      type: Number,
      default: 0
    },
    next_month_sales_forecast_5: {
      type: Number,
      default: 0
    },
    next_month_sales_forecast_6: {
      type: Number,
      default: 0
    },
    last_month_sales_count_1: {
      type: Number,
      default:0
    },
    last_month_sales_count_2: {
      type: Number,
      default:0
    },
    last_month_sales_count_3: {
      type: Number,
      default:0
    },
    last_month_stock_count_1: {
      type: Number,
      default:0
    },
    last_month_stock_count_2: {
      type: Number,
      default:0
    },
    last_month_stock_count_3: {
      type: Number,
      default:0
    }
  });

  HqSalesSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });
  appDb.model('HqSales', HqSalesSchema);
};
