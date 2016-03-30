/**
 * Created by zenghong on 16/2/21.
 */
'use strict';
var all = require('../controllers/all');
var filter = require('../filters/all').user;

module.exports = function (app) {
  app.route('/webapp/hq/stocks/import').post(filter.requireUser, all.hq_order.hqStockImport);
  app.route('/webapp/hq/stocks').get(filter.requireUser, all.hq_order.getHqCurrentStocks);
  app.route('/webapp/hq/orders').get(filter.requireUser, all.hq_order.getHqOtherOrders);
  app.route('/webapp/hq/orders/import').post(filter.requireUser, all.hq_order.hqOtherOrderImport);
  app.route('/webapp/hq/orders/suggest').get(filter.requireUser, all.hq_order.getHqSuggestOrders);
  app.route('/webapp/hq/sales/submit').post(filter.requireUser, all.hq_order.hqSuggestOrderSubmit);

  app.route('/webapp/hq/sales/submit').get(filter.requireUser, all.hq_order.getCurrentHqSubmitOrder);
  app.route('/webapp/hq/sales/submit_order/update').post(filter.requireUser, all.hq_order.updateSubmitOtherOrderStatus);

  app.route('/webapp/hq/sales/query').get(filter.requireUser, all.hq_order.getHqOrderList);
  app.route('/webapp/hq/sales/approve').post(filter.requireUser, all.hq_order.approveHqOrder);
  app.route('/webapp/hq/sales/approve/multi').post(filter.requireUser, all.hq_order.approveHqOrders);

  app.route('/webapp/hq/order/sure').post(filter.requireUser, all.hq_order.sureOrder);

  app.route('/webapp/hq/order/detail').get(filter.requireUser, all.hq_order.getHqOrderDetail);


  app.route('/webapp/hq/order/delivery_time').post(filter.requireUser, all.hq_order.importHqDeliveryTime);


};