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
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    nick_photo: '',
    telephone: {
      type: String
    },
    //promotion, salesman ,
    roles: [],
    //用户编号
    number: {
      type: String
    },
    //用户工号
    job_number: {
      type: String
    },
    //昵称
    nickname: {
      type: String
    },
    //姓名
    name: {
      type: String
    },
    //岗位
    job: {
      type: String
    },
    //职务
    duty: {
      type: String
    },
    email: {
      type: String
    },
    sex: {
      type: String,
      enum: ['男', '女'],
      default: '男'
    },
    //上级id
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    //上级编号
    parent_number: {
      type: String
    },
    //上级姓名
    parent_name: {
      type: String
    },
    city: {
      type: String
    },
    area: {
      type: String
    },
    create_date: {
      type: String
    },
    job_status: {
      type: String,
      enum: ['在职', '离职', '请假'],
      default: '在职'
    },
    path: {
      type:String
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    }
  });

  UserSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });

  appDb.model('User', UserSchema);
};
