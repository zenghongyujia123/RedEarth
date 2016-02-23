/**
 * Created by zenghong on 16/2/21.
 */

angular.module('agilesales-web').factory('HqOrderService', ['HttpService', function (HttpService) {
  return {
    getHqCurrentStocks: function () {
      return HttpService.get('/webapp/hq/stocks', {});
    },
    hqStockImport: function (stocks) {
      return HttpService.post('/webapp/hq/stocks/import', {stocks: stocks});
    },
    getHqOtherOrders: function (order_type) {
      return HttpService.get('/webapp/hq/orders', {order_type:order_type||''});
    },
    hqOtherOrderImport: function (orders) {
      return HttpService.post('/webapp/hq/orders/import', {orders: orders});
    },
    getHqSuggestOrders:function(){
      return HttpService.get('/webapp/hq/orders/suggest', {});
    }

  };
}]);