/**
 * Created by zenghong on 16/2/21.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

module.exports = function (appDb) {
  var HqOrderSchema = new Schema({
    object: {
      type: String,
      default: 'hqOrder'
    },
    product_number: {
      type: String
    },
    product_name: {
      type: String
    },
    product_barcode: {
      type: String
    },
    category: {
      type: String
    },
    sales_price: {
      type: String
    },
    jinyi_cost: {
      type: Number
    },
    order_number: {
      type: String
    },
    order_count: {
      type: Number
    },
    order_type: {
      type: String
    },
    jinyi_total_price: {
      type: Number
    }
  });

  HqOrderSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });
  appDb.model('HqOrder', HqOrderSchema);
};
