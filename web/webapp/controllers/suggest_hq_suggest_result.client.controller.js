/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqSuggestResultCtrl', ['$scope', '$state', '$rootScope', 'HqOrderService',
  function ($scope, $state, $rootScope, HqOrderService) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单 总部建议订单（SKU）=(地区已审批订单+其他订单)-(总部库存+在途-安全库存) +判断条件（是否TOP SKU? 是否MOQ之%必采购？）',
      btns: [
        {
          text: '提交',
          clickCallback: suggestOrderSubmit
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
      sale.system_suggest_count = (sale.D01_approve + sale.Y01 + sale.Y02 + sale.Y03 + sale.Y04 + sale.Y05 + sale.Y06 + sale.Y07);
      sale.system_suggest_count = sale.system_suggest_count - (sale.genuine_goods - sale.safe_stock);

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

      $scope.suggests.forEach(function (sale) {
        if (sale.status !== '已审核') {
          sales.push({
            _id: sale._id,
            system_suggest_count: sale.system_suggest_count,
            system_suggest_count_modify: sale.system_suggest_count_modify,
            system_suggest_count_modify_percent: sale.system_suggest_count_modify_percent,
            D01: sale.D01,
            D02: sale.D02,
            D03: sale.D03,
            D04: sale.D04,
            D01_approve: sale.D01_approve,
            D02_approve: sale.D02_approve,
            D03_approve: sale.D03_approve,
            D04_approve: sale.D04_approve
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
      HqOrderService.hqSuggestOrderSubmit(sales[i++])
        .then(function (data) {
          console.log(data);
          if (sales[i]) {
            upload(sales, i);
          }
          else {
            alert('ok');
            $state.go('order_suggest.suggest_hq_suggest_result', {}, {reload: true});

          }
        }, function (err) {
          console.log(err);
        });
    }

  }]);