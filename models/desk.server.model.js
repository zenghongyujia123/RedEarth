/**
 * Created by zenghong on 16/1/20.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

module.exports = function (appDb) {
  var DeskSchema = new Schema({
    object: {
      type: String,
      default: 'desk'
    },
    //所属区域
    area: {
      type: String
    },
    //地区
    child_area: {
      type: String
    },
    //柜台号
    desk_number: {
      type: String
    },
    //柜台号
    desk_name: {
      type: String
    }
  });

  DeskSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });

  appDb.model('Desk', DeskSchema);
};
