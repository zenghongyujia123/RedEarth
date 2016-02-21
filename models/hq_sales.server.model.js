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
    genuine_goods: {
      type: Number,
      default: 0
    },
    validity: {
      type: String,
    },
    ungenuine_goods: {
      type: Number,
      default: 0
    }
  });

  HqSalesSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });
  appDb.model('HqSales', HqSalesSchema);
};
