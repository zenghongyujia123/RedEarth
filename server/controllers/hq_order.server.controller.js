/**
 * Created by zenghong on 16/1/20.
 */
'use strict';
var areaOrderService = require('./../services/all').area_order;

exports.hqStockImport = function (req, res, next) {
  areaOrderService.hqStockImport(req.user, req.body.stocks, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};
