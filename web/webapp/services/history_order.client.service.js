/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('HistoryOrderService', ['HttpService', function (HttpService) {
  return {
    areaHistoryOrderImport: function (orders) {
      return HttpService.post('/webapp/area/order/history/import', {orders: orders});
    },
    hqHistoryOrderImport: function (orders) {
      return HttpService.post('/webapp/hq/order/history/import', {orders: orders});
    },
    getAreaOrderHistory: function () {
      return HttpService.get('/webapp/area/order/history/get', {});
    },
    getHqOrderHistory: function () {
      return HttpService.get('/webapp/hq/order/history/get', {});
    }
  };
}]);