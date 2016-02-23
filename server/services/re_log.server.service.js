/**
 * Created by zenghong on 16/1/20.
 */
'use strict';

var appDb = require('./../../libraries/mongoose').appDb,
  error = require('./../../errors/all'),
  moment = require('moment'),
  ReLog = appDb.model('ReLog');

exports.insertLog = function (username, content) {
  new ReLog({
    username: username,
    operation: content,
    date: moment().format('YYYY-MM-DD HH:mm:ss')
  }).save(function (err) {
    console.log(username + ' ' + content);
  });
};

exports.getLogs = function (user, callback) {
  ReLog.find({}).sort({created: -1}).exec(function (err, logs) {
    if (err || !logs) {
      return callback({err: error.system.db_error});
    }
    return callback(null, logs);
  });
};