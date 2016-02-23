/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqSuggestResultCtrl', ['$scope', '$rootScope', 'HqOrderService',
  function ($scope, $rootScope,HqOrderService) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单',
      btns: [
        {
          text: '提交'
        }
      ]
    });
    $scope.suggests = [];
    $scope.getHqSuggestOrders = function () {
      HqOrderService.getHqSuggestOrders().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.suggests = data;
        }
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHqSuggestOrders();

    $scope.getSystemAreaSuggest = function (sale) {
      var next_6_month_forecast =
        sale.next_month_sales_forecast_0 +
        sale.next_month_sales_forecast_1 +
        sale.next_month_sales_forecast_2 +
        sale.next_month_sales_forecast_3 +
        sale.next_month_sales_forecast_4 +
        sale.next_month_sales_forecast_5;
      sale.system_suggest_count = parseInt(sale.next_month_sales_forecast_0 - (sale.last_month_stock_count + sale.last_month_onway_count - next_6_month_forecast - parseInt(sale['D02'])) * sale.product.abc_category / 100);

      if (sale.system_suggest_count_modify === 0) {
        sale.system_suggest_count_modify = sale.system_suggest_count;
      }

      return sale.system_suggest_count;
    };
  }]);