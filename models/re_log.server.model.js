/**
 * Created by zenghong on 16/2/17.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

module.exports = function (appDb) {
  var ReLogSchema = new Schema({
    object: {
      type: String,
      default: 'areaOrder'
    },
    username: {
      type: String
    },
    operation: {
      type: String
    },
    date: {
      type: String
    }
  });

  ReLogSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });

  appDb.model('ReLog', ReLogSchema);
};
