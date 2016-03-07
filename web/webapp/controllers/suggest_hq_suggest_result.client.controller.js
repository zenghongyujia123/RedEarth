/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqSuggestResultCtrl', ['$scope', '$state', '$rootScope', 'HqOrderService',
  function ($scope, $state, $rootScope, HqOrderService) {
    $scope.curSubmitOrder = {};
    $scope.getCurrentHqSubmitOrder = function () {
      HqOrderService.getCurrentHqSubmitOrder().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          if ($scope.curSubmitOrder.has_Y02 === '未选择') {
            return alert('请选择是否上传批发订单');
          }
          if ($scope.curSubmitOrder.has_Y03 === '未选择') {
            return alert('请选择是否上传试用装订单');
          }
          if ($scope.curSubmitOrder.has_Y04 === '未选择') {
            return alert('请选择是否上传陈列订单');
          }
          if ($scope.curSubmitOrder.has_Y05 === '未选择') {
            return alert('请选择是否上传经销商订单');
          }
          if ($scope.curSubmitOrder.has_Y06 === '未选择') {
            return alert('请选择是否上传电商订单');
          }
          if ($scope.curSubmitOrder.has_Y07 === '未选择') {
            return alert('请选择是否上传茂姿订单');
          }

          if (data.status !== '已审核') {
            $scope.$emit('suggest.import.changed', {
              title: '建议订单 总部建议订单（SKU）=(地区已审批订单+其他订单)-(总部库存+在途-安全库存) +判断条件（是否TOP SKU? 是否MOQ之%必采购？）',
              btns: [
                {
                  text: '提交',
                  clickCallback: suggestOrderSubmit
                }
              ]
            });
          }

          $scope.getHqSuggestOrders();
        }
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getCurrentHqSubmitOrder();


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

    $scope.getSystemAreaSuggest = function (sale) {
      sale.system_suggest_count = (sale.D01_approve + sale.Y01 + sale.Y02 + sale.Y03 + sale.Y04 + sale.Y05 + sale.Y06 + sale.Y07);
      sale.system_suggest_count = sale.system_suggest_count - (sale.genuine_goods + sale.onway_goods + sale.product.onway_count - sale.safe_stock);

      if (sale.system_suggest_count_modify === 0) {
        sale.system_suggest_count_modify = sale.system_suggest_count;
      }

      var factory_moq = parseInt(sale.product.factory_moq);
      var order_count_exceed_moq = parseInt(sale.product.order_count_exceed_moq);
      var min_factory_moq = parseInt(factory_moq * order_count_exceed_moq / 100);

      sale.final_system_suggest_count = sale.system_suggest_count_modify;
      if (sale.system_suggest_count_modify < min_factory_moq) {
        sale.final_system_suggest_count = 0;
      }
      if (sale.system_suggest_count_modify > min_factory_moq && sale.system_suggest_count_modify < factory_moq) {
        sale.final_system_suggest_count = factory_moq;
      }

      if (sale.final_purchased_count === 0) {
        sale.final_purchased_count = sale.final_system_suggest_count;
      }

      return sale.system_suggest_count;
    };

    $scope.modifySystemAreaSuggestPercent = function (sale) {
      sale.system_suggest_count_modify_percent = parseInt((sale.system_suggest_count_modify - sale.system_suggest_count) * 100 / ((sale.system_suggest_count > 0) ? sale.system_suggest_count : (-sale.system_suggest_count)));
      sale.final_purchased_count = sale.final_system_suggest_count;
    };

    function suggestOrderSubmit() {
      var sales = [];

      $scope.suggests.forEach(function (sale) {
        if (sale.status !== '已审核') {
          sales.push({
            _id: sale._id,
            remark: sale.remark,
            final_purchased_count: sale.final_purchased_count,
            system_suggest_count: sale.system_suggest_count,
            final_system_suggest_count: sale.final_system_suggest_count,
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