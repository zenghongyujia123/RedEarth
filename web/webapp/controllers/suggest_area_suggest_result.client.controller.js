/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaSuggestResultCtrl', ['$scope', '$rootScope', 'AreaOrderService',
  function ($scope, $rootScope, AreaOrderService) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单',
      btns: [
        {
          text: '提交',
          clickCallback: suggestOrderSubmit
        }
      ]
    });
    $scope.orders = [];
    $scope.getAreaSuggestOrder = function () {
      AreaOrderService.getAreaSuggestOrder().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.orders = data;
        }
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getAreaSuggestOrder();

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

    $scope.modifySystemAreaSuggestPercent = function (sale) {
      sale.system_suggest_count_modify_percent = parseInt((sale.system_suggest_count_modify) * 100 / sale.system_suggest_count)
    };

    function suggestOrderSubmit() {
      var sales = [];

      $scope.orders.forEach(function (sale) {
        if (sale.status !== '已审核') {
          sales.push({
            _id: sale._id,
            system_suggest_count: sale.system_suggest_count,
            system_suggest_count_modify: sale.system_suggest_count_modify,
            system_suggest_count_modify_percent: sale.system_suggest_count_modify_percent,
            D02: sale.D02,
            D03: sale.D03,
            D04: sale.D04
          });
        }
      });
      var final_sales = [];
      for (var i = 0, len = sales.length; i < len; i += 40) {
        final_sales.push(sales.slice(i, i + 40));
      }

      upload(final_sales, 0);
    };

    function upload(sales, i) {
      AreaOrderService.suggestOrderSubmit(sales[i++])
        .then(function (data) {
          console.log(data);
          if (sales[i]) {
            upload(sales, i);
          }
          else {
            alert('ok');
          }
        }, function (err) {
          console.log(err);
        });
    }
  }]);