/**
 * Created by zenghong on 16/1/20.
 */
'use strict';

var _ = require('lodash');

exports = _.extend(exports, {
  business: require('./business'),
  system: require('./system'),
  params: require('./params'),
  third: require('./third')
});