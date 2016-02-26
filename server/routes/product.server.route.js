/**
 * Created by zenghong on 16/1/7.
 */
'use strict';
var all = require('../controllers/all');
var filter = require('../filters/all').user;

module.exports = function (app) {
  app.route('/webapp/product/import').post(filter.requireUser, all.product.importProducts);
  app.route('/webapp/product').get(filter.requireUser, all.product.getProducts);
  app.route('/webapp/desk').get(filter.requireUser, all.product.getDesks);
};