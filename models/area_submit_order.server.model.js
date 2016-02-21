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
    user_number:{
      type:String
    },
    order_number: {
      type: String,
      unique: true
    },
    status: {
      type: String
    }
  });

  AreaSubmitOrderSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });
  appDb.model('AreaSubmitOrder', AreaSubmitOrderSchema);
};
