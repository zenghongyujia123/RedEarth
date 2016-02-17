/**
 * Created by zenghong on 16/1/7.
 */
'use strict';
var all = require('../controllers/all');
var filter = require('../filters/all').user;

module.exports = function (app) {
  app.route('/webapp/area/order/import').post(filter.requireUser, all.area_order.otherOrderImport);
  app.route('/webapp/area/sales/import').post(filter.requireUser, all.area_order.areaSalesStockOnwayImport);
  app.route('/webapp/area/sales/history_import').post(filter.requireUser, all.area_order.historyAreaSalesStockOnwayImport);
  app.route('/webapp/area/order').get(filter.requireUser, all.area_order.getOrdersByArea);
  app.route('/webapp/area/sales').get(filter.requireUser, all.area_order.getSalesByArea);
  app.route('/webapp/area/sales/history').get(filter.requireUser, all.area_order.getHistoryAreaSalesStockOnway);

};