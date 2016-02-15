/**
 * Created by zenghong on 16/1/20.
 */
'use strict';
var error = require('./../../errors/all');
var crypto = require('./../../libraries/crypto');

var appDb = require('./../../libraries/mongoose').appDb,
  User = appDb.model('User');


exports.requireUser = function (req, res, next) {
  var access_token = req.body.access_token || req.query.access_token || '';

  if (!access_token) {
    return res.send({err: error.business.user_token_empty});
  }

  try {
    access_token = crypto.decrpToken(access_token, 'secret');
  }
  catch (e) {
    return res.send({err: error.business.user_token_invalid});
  }

  User.findOne({_id: access_token._id}).populate('company').exec(function (err, user) {
    if (err)
      return res.send({err: error.system.db_error});

    if (!user)
      return res.send({err: error.business.user_token_invalid});

    req.user = user;
    return next();
  });
};

exports.requireOtherUser = function (req, res, next) {
  var user_id = req.body.user_id || req.query.user_id || '';

  if (!user_id) {
    return res.send({err: error.business.user_id_empty});
  }

  User.findOne({_id: user_id}).populate('company').exec(function (err, user) {
    if (err)
      return res.send({err: error.system.db_error});

    if (!user)
      return res.send({err: error.business.user_id_invalid});

    req.otherUser = user;
    return next();
  });

};