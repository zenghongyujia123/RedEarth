/**
 * Created by zenghong on 16/1/7.
 */
'use strict';
var all = require('../controllers/all');
var filter = require('../filters/all').user;

module.exports = function (app) {
  app.route('/webapp/signin').post(all.user.signin);
  app.route('/webapp/user/me').get(filter.requireUser,all.user.getMe);
  app.route('/webapp/user/log').get(filter.requireUser,all.user.getLogs);
};