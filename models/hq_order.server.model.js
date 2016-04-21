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
    month: {
      type: String
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    product_number: {
      type: String
    },
    product_name: {
      type: String
    },
    mid_classify: {
      type: String
    },
    product_barcode: {
      type: String
    },
    category: {
      type: String
    },
    sales_price: {
      type: Number
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
    //Y01:正品 Y02:批发 Y03:试用装 YO4:陈列 Y05:经销商 Y06:电商 Y07:茂姿订单
    order_type: {
      type: String,
      enum: ['Y01', 'Y02', 'Y03', 'Y04', 'Y05', 'Y06', 'Y07'],
      default: 'Y01'
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
