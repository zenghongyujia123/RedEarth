/**
 * Created by zenghong on 16/1/20.
 */
'use strict';
var _ = require('lodash');
exports = _.extend(exports, {
  user: require('./user'),
  area_order: require('./area_order'),
  hq_order: require('./hq_order'),
  re_log: require('./re_log'),
  history_order: require('./history_order'),
  product: require('./product')
});