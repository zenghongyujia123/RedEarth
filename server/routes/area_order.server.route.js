/**
 * Created by zenghong on 16/1/7.
 */
'use strict';
var all = require('../controllers/all');
var filter = require('../filters/all').user;

module.exports = function (app) {
  app.route('/webapp/area/order/import').post(filter.requireUser, all.area_order.otherOrderImport);
  app.route('/webapp/area/sales/import').post(filter.requireUser, all.area_order.areaSalesStockOnwayImport);
  app.route('/webapp/area/order/').get(filter.requireUser, all.area_order.getOrdersByArea);
};