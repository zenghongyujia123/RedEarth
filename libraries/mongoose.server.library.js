/**
 * Created by zenghong on 16/1/20.
 */
'use strict';

var mongoose = require('mongoose');

var appDb = mongoose.createConnection(process.env.appDb,{server:{poolSize:20}}, function (err) {
  if (err) {
    console.log('create app db connection failed : ' + err.toString());
  } else {
    console.log('create app db connection success');
  }
});

exports.appDb = appDb;
