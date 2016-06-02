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
        getOrdersByArea: function (order_type) {
            return HttpService.get('/webapp/area/order', {order_type: order_type});
        },
        getSalesByArea: function () {
            return HttpService.get('/webapp/area/sales', {});
        },
        getHistorySales: function () {
            return HttpService.get('/webapp/area/sales/history', {});
        },
        importsHistorySales: function (sales) {
            return HttpService.post('/webapp/area/sales/history_import', {sales: sales});
        },
        getAreaSuggestOrder: function () {
            return HttpService.get('/webapp/area/order/suggest', {});
        },
        suggestOrderSubmit: function (sales) {
            return HttpService.post('/webapp/area/sales/submit', {sales: sales});
        },
        getAreaOrderList: function () {
            return HttpService.get('/webapp/area/query', {});
        },
        getAreaOrderDetail: function (order_number) {
            return HttpService.get('/webapp/area/order/detail', {order_number: order_number});
        },
        approveAreaOrder: function (order) {
            return HttpService.post('/webapp/area/sales/approve', {order: order});
        },
        approveAreaOrders: function (orders) {
            return HttpService.post('/webapp/area/sales/approve/multi', {orders: orders});
        },
        updateSubmitOhterOrderStatus: function (submit_order) {
            return HttpService.post('/webapp/area/sales/submit_order/update', {submit_order: submit_order});
        },
        getCurrentAreaSubmitOrder: function () {
            return HttpService.get('/webapp/area/sales/submit', {});
        },
        sureOrder: function (order) {
            return HttpService.post('/webapp/area/order/sure', {order: order});
        },
        getAreaReports: function (month, name) {
            return HttpService.get('/webapp/area/reports', {name: name, month: month});
        }
    };
}]);