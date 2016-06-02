/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderHqDetailCtrl', ['$scope', '$state', '$stateParams', 'AuthService', 'AreaOrderService', 'HqOrderService', 'Loading', 'ExcelReaderService',
  function ($scope, $state, $stateParams, AuthService, AreaOrderService, HqOrderService, Loading, ExcelReaderService) {
    $scope.importBtns = [{
      text: '导出',
      clickCallback: exportExecl
    }];
    $scope.order_number = $stateParams.order_number;
    $scope.location = window.location;

    $scope.orders = [];
    $scope.getHqOrderDetail = function () {
      Loading.show();
      HqOrderService.getHqOrderDetail($scope.order_number).then(function (data) {
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

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('AuthService', function (user) {
      $scope.user = user;
    });
    $scope.getHqOrderDetail();

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        '产品编码',
        '产品条码',
        '品类',
        '中分类名称',
        '销售价格',
        '晋颖成本价',
        'ABC分类',
        'ABC类说明',
        'ABC类别%',
        '上月月结库存总部正品库存',
        '在途以采购地区在途',
        '地区月结库存包括店柜库存',
        '地区在途',
        '次品',
        '近效期库存',
        '月均销售前3个月平均',
        '安全库存2个月',
        '后1月销售',
        '后2月销售',
        '后3月销售',
        '后4月销售',
        '后5月销售',
        '后6月销售',
        '当月汇总地区已审批订单',
        '当月汇总地区使用装',
        '当月汇总地区陈列',
        '上传其他订单批发',
        '上传其他订单试用装',
        '上传其他订单陈列',
        '上传其他订单经销商',
        '上传其他订单电商',
        '上传其他订单茂姿',
        '当月总部订单系统建议',
        'MOQ系统建议',
        '修改',
        '修改%',
        '备注',
        '已取得上级核准',
        '工厂MOQ',
        'MOQ备注',
        '订单达MOQ%必采购',
        '澳妆最终审批采购量',
        '澳妆最终审批采购金额',
        '澳妆最终审批采购零售金额',
        '计划交货数',
        '计划交期',
        '实际收货数',
        '实际交期',
        '在途数',
        '剩余计划交期',
        '状态'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product.product_name,
          o.product_number,
          o.product.product_barcode,
          o.product.category,
          o.product.mid_classify,
          o.product.sales_price,
          o.product.jinyi_cost,
          o.product.abc_classify,
          o.product.abc_classify_explain,
          o.product.abc_category,
          o.genuine_goods,
          '',
          '',
          '',
          o.product.jinyi_ungenuine_goods,
          o.product.jinyi_validity,
          o.next_month_sales_forecast_0,
          o.safe_stock,
          o.next_month_sales_forecast_1,
          o.next_month_sales_forecast_2,
          o.next_month_sales_forecast_3,
          o.next_month_sales_forecast_4,
          o.next_month_sales_forecast_5,
          o.next_month_sales_forecast_6,
          o.D01_approve,
          o.D03,
          o.D04,
          o.Y02,
          o.Y03,
          o.Y04,
          o.Y05,
          o.Y06,
          o.Y07,
          o.system_suggest_count,
          o.final_system_suggest_count,
          o.system_suggest_count_modify,
          o.system_suggest_count_modify_percent + '%',
          o.remark,
          o.is_sure === '是' ? '是' : '',
          o.product.factory_moq,
          o.product.moq_remark,
          o.product.order_count_exceed_moq,
          o.final_purchased_count,
          o.final_purchased_count * o.product.jinyi_cost,
          o.final_purchased_count * o.product.sales_price,
          o.plan_delivery_count,
          o.plan_delivery_time,
          o.real_delivery_count,
          o.real_delivery_time,
          o.onway_count,
          o.final_plan_delivery_time,
          o.status
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }

  }]);