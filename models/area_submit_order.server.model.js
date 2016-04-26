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
  var AreaSubmitOrderSchema = new Schema({
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
    status: {
      type: String
    },
    //未选择,没有,有
    has_D02: {
      type: String,
      default: '未选择'
    },
    has_D03: {
      type: String,
      default: '未选择'
    },
    has_D04: {
      type: String,
      default: '未选择'
    },
    submit_time:{
      type:Date
    }
  });

  AreaSubmitOrderSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });
  appDb.model('AreaSubmitOrder', AreaSubmitOrderSchema);
};
