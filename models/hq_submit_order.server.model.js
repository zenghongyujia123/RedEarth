/**
 * Created by zenghong on 16/2/21.
 */
/**
 * Created by zenghong on 16/2/17.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

module.exports = function (appDb) {
  var HqSubmitOrderSchema = new Schema({
    object: {
      type: String,
      default: 'areaSubmitOrder'
    },
    month: {
      type: String
    },
    user_number: {
      type: String
    },
    order_number: {
      type: String,
      unique: true
    },
    has_Y01: {
      type: String,
      default: '未选择'
    },
    has_Y02: {
      type: String,
      default: '未选择'
    },
    has_Y03: {
      type: String,
      default: '未选择'
    },
    has_Y04: {
      type: String,
      default: '未选择'
    },
    has_Y05: {
      type: String,
      default: '未选择'
    },
    has_Y06: {
      type: String,
      default: '未选择'
    },
    has_Y07: {
      type: String,
      default: '未选择'
    },
    status: {
      type: String,
      default: '未审核'
    }
  });

  HqSubmitOrderSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });
  appDb.model('HqSubmitOrder', HqSubmitOrderSchema);
};
