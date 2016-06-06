/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderDetailCtrl', ['$scope', '$stateParams', '$state', 'AreaOrderService', 'AuthService', 'Loading', 'ExcelReaderService',
  function ($scope, $stateParams, $state, AreaOrderService, AuthService, Loading, ExcelReaderService) {
    $scope.order_number = $stateParams.order_number;
    $scope.orders = [];
    $scope.importBtns = [{
      text: '导出',
      clickCallback: exportExecl
    }];
    $scope.getAreaOrderDetail = function () {
      Loading.show();
      AreaOrderService.getAreaOrderDetail($scope.order_number).then(function (data) {
        if (data && !data.err) {
          $scope.orders = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    $scope.getAreaOrderDetail();

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('AuthService', function (user) {
      $scope.user = user;
    });

    $scope.approveAreaOrder = function (o) {
      if (o.status === '已审核') {
        return;
      }
      AreaOrderService.approveAreaOrder(o).then(function (data) {
        if (data && !data.err) {
          $state.go('order_detail', {}, {reload: true});
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        'SKU编码',
        '产品条码',
        '品类',
        '中分类名称',
        '销售价格',
        'ABC分类',
        'ABC类说明',
        'ABC类别%',
        '上月月结库存包括店柜库存',
        '在途已订购未交货',
        '安全库存2个月',
        '当月销售预测',
        '后1月销售预测',
        '后2月销售预测',
        '后3月销售预测',
        '后4月销售预测',
        '后5月销售预测',
        '后6月销售预测',
        '当月上传批发订单',
        '当月订单系统建议',
        '修改',
        '修改%',
        '备注',
        '确认超额订购?',
        '上传订单适用装',
        '最终审批适用装',
        '上传订单陈列',
        '最终审批陈列',
        '最终审批大货数',
        '总金额',
        '审批状态'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product.product_name,
          o.product.product_number,
          o.product.product_barcode,
          o.product.category,
          o.product.mid_classify,
          o.product.sales_price,
          o.product.abc_classify,
          o.product.abc_classify_explain,
          o.product.abc_category,
          o.last_month_stock_count,
          o.last_month_onway_count,
          o.safe_stock,
          o.next_month_sales_forecast_0,
          o.next_month_sales_forecast_1,
          o.next_month_sales_forecast_2,
          o.next_month_sales_forecast_3,
          o.next_month_sales_forecast_4,
          o.next_month_sales_forecast_5,
          o.next_month_sales_forecast_6,
          o.D02,
          o.system_suggest_count,
          o.system_suggest_count_modify,
          o.system_suggest_count_modify_percent,
          o.remark,
          '',
          o.D03,
          o.D03_approve,
          o.D04,
          o.D04_approve,
          o.D01_approve,
          '',
          o.status
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);