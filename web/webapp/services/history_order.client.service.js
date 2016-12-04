/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('HistoryOrderService', ['HttpService', function (HttpService) {
    return {
        areaHistoryOrderImport: function (orders) {
            return HttpService.post('/webapp/area/order/history/import', {orders: orders});
        }
    };
}]);