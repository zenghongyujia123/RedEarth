/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('AreaOrderService', ['HttpService', function (HttpService) {
  return {
    otherOrderImport: function (orders) {
      return HttpService.post('/webapp/area/order/import', {orders: orders});
    },
    areaSalesStockOnwayImport: function (sales) {
      return HttpService.post('/webapp/area/sales/import', {sales: sales});
    },
    getOrdersByArea: function () {
      return HttpService.get('/webapp/area/order', {});
    },
    getSalesByArea: function () {
      return HttpService.get('/webapp/area/sales', {});
    },
    getHistorySales:function(){
      return HttpService.get('/webapp/area/sales/history', {});
    }
  };
}]);