/**
 * Created by zenghong on 16/2/21.
 */
'use strict';
var all = require('../controllers/all');
var filter = require('../filters/all').user;

module.exports = function (app) {
  app.route('/webapp/hq/stocks/import').post(filter.requireUser, all.hq_order.hqStockImport);

};