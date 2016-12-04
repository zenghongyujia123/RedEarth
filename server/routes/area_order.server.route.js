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
  app.route('/webapp/area/order/suggest').get(filter.requireUser, all.area_order.getAreaSuggestOrder);
  app.route('/webapp/area/sales').get(filter.requireUser, all.area_order.getSalesByArea);
  app.route('/webapp/area/query').get(filter.requireUser, all.area_order.getAreaOrderList);
  app.route('/webapp/area/sales/history').get(filter.requireUser, all.area_order.getHistoryAreaSalesStockOnway);
  app.route('/webapp/area/order/detail').get(filter.requireUser, all.area_order.getAreaOrderDetail);

  app.route('/webapp/area/sales/submit').post(filter.requireUser, all.area_order.suggestOrderSubmit);
  app.route('/webapp/area/sales/submit_order/update').post(filter.requireUser, all.area_order.updateSubmitOhterOrderStatus);
  app.route('/webapp/area/sales/submit').get(filter.requireUser, all.area_order.getCurrentAreaSubmitOrder);

  app.route('/webapp/area/sales/approve').post(filter.requireUser, all.area_order.approveAreaOrder);
  app.route('/webapp/area/sales/approve/multi').post(filter.requireUser, all.area_order.approveAreaOrders);

  app.route('/webapp/area/order/sure').post(filter.requireUser, all.area_order.sureOrder);

  app.route('/webapp/area/reports').get(filter.requireUser, all.area_order.getAreaReports);

  app.route('/webapp/area/order/history/import').post(filter.requireUser, all.history_order.areaHistoryOrderImport);
  app.route('/webapp/hq/order/history/import').post(filter.requireUser, all.history_order.hqHistoryOrderImport);
  app.route('/webapp/area/order/history/get').get(filter.requireUser, all.history_order.getAreaOrderHistory);
  app.route('/webapp/hq/order/history/get').get(filter.requireUser, all.history_order.getHqOrderHistory);
};