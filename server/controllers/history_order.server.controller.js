/**
 * Created by zenghong on 16/1/20.
 */
'use strict';
var historyOrderService = require('./../services/all').history_order;
var logService = require('./../services/all').re_log;

exports.areaHistoryOrderImport = function(req,res,next){
  logService.insertLog(req.user.username, '导入历史4-9月地区销量,库存,在途');
  historyOrderService.areaHistoryOrderImport(req.user, req.body.sales, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
};






