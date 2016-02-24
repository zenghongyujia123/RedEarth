/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaSuggestResultCtrl', ['$scope', '$rootScope', '$state', 'AreaOrderService','Loading',
  function ($scope, $rootScope, $state, AreaOrderService,Loading) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单 地区建议订单（SKU）=当月预测-[地区库存(包括店柜库存) +在途-未来6月销售预测-其他订单(批发)-安全库存）] * 产品分类（ABC）?%',
      btns: [
        {
          text: '提交',
          clickCallback: suggestOrderSubmit
        }
      ]
    });
    $scope.orders = [];
    $scope.getAreaSuggestOrder = function () {
      Loading.show();
      AreaOrderService.getAreaSuggestOrder().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.orders = data;
        }
        Loading.hide();
      }, function (data) {
        Loading.hide();
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

      for (var i = 0; i < $scope.orders.length; i++) {
        var sale = $scope.orders[i];
        if (sale.system_suggest_count_modify > sale.system_suggest_count) {
          if (!sale.remark) {
            return alert('产品编码:' + sale.product.product_number + '超额订购需填写备注');
          }
        }

        sales.push({
          _id: sale._id,
          system_suggest_count: sale.system_suggest_count,
          system_suggest_count_modify: sale.system_suggest_count_modify,
          system_suggest_count_modify_percent: sale.system_suggest_count_modify_percent,
          D01: sale.D01,
          remark:sale.remark,
          D02: sale.D02,
          D03: sale.D03,
          D04: sale.D04,
          D01_approve: sale.D01_approve,
          D02_approve: sale.D02_approve,
          D03_approve: sale.D03_approve,
          D04_approve: sale.D04_approve
        });
      }
      var final_sales = [];
      for (var i = 0, len = sales.length; i < len; i += 40) {
        final_sales.push(sales.slice(i, i + 40));
      }
      Loading.show();
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
            Loading.hide();
            $state.go('order_suggest.suggest_area_suggest_result', {}, {reload: true});
          }
        }, function (err) {
          Loading.hide();
          console.log(err);
        });
    }
  }]);