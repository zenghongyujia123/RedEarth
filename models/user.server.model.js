/**
 * Created by zenghong on 16/1/20.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

module.exports = function (appDb) {
  var UserSchema = new Schema({
    object: {
      type: String,
      default: 'user'
    },
    //区域
    area: {
      type: String
    },
    //部门
    department: {
      type: String
    },
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    show_name: {
      type: String
    },
    //负责人名称
    principal_name: {
      type: String
    },
    //负责人邮箱
    principal_email: {
      type: String
    },
    //promotion, salesman ,
    roles: [],
    //备注
    remark: {
      type: String
    }
  });

  UserSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });

  appDb.model('User', UserSchema);
};
