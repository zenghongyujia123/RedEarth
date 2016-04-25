/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaSuggestResultCtrl', ['$scope', '$rootScope', '$state', 'AreaOrderService', 'Loading', 'ExcelReaderService',
  function ($scope, $rootScope, $state, AreaOrderService, Loading, ExcelReaderService) {
    $scope.curSubmitOrder = {};
    $scope.getCurrentAreaSubmitOrder = function () {
      AreaOrderService.getCurrentAreaSubmitOrder().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          if ($scope.curSubmitOrder.has_D02 === '未选择') {
            return alert('请选择是否上传批发订单');
          }
          if ($scope.curSubmitOrder.has_D03 === '未选择') {
            return alert('请选择是否上传试用装订单');
          }
          if ($scope.curSubmitOrder.has_D04 === '未选择') {
            return alert('请选择是否上传陈列订单');
          }

          if (data.status !== '已审核') {
            $scope.$emit('suggest.import.changed', {
              title: '建议订单 地区建议订单（SKU）=当月预测-[地区库存(包括店柜库存) +在途-未来6月销售预测-其他订单(批发)-安全库存）]',
              btns: [
                {
                  text: '提交',
                  clickCallback: suggestOrderSubmit
                },
                {
                  text: '导出',
                  clickCallback: exportExecl
                }
              ]
            });
          }
          else {
            $scope.$emit('suggest.import.changed', {
              title: '建议订单 地区建议订单（SKU）=当月预测-[地区库存(包括店柜库存) +在途-未来6月销售预测-其他订单(批发)-安全库存）]',
              btns: [
                {
                  text: '导出',
                  clickCallback: exportExecl
                }
              ]
            });
          }

          $scope.getAreaSuggestOrder();
        }
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getCurrentAreaSubmitOrder();

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

    $scope.getSystemAreaSuggest = function (sale) {
      var next_6_month_forecast =
        sale.next_month_sales_forecast_1 +
        sale.next_month_sales_forecast_2 +
        sale.next_month_sales_forecast_3 +
        sale.next_month_sales_forecast_4 +
        sale.next_month_sales_forecast_5 +
        sale.next_month_sales_forecast_6;
      var other_order_count = parseInt(sale.D02) + parseInt(sale.D03) + parseInt(sale.D04);
      sale.system_suggest_count = parseInt(sale.next_month_sales_forecast_0 - (sale.last_month_stock_count + sale.last_month_onway_count - next_6_month_forecast - other_order_count - sale.safe_stock));

      if (sale.system_suggest_count_modify === 0) {
        sale.system_suggest_count_modify = sale.system_suggest_count;
      }
      if (sale.D02_approve === 0) {
        sale.D02_approve = sale.D02;
      }

      if (sale.D03_approve === 0) {
        sale.D03_approve = sale.D03;
      }

      if (sale.D04_approve === 0) {
        sale.D04_approve = sale.D04;
      }

      if (sale.D01_approve === 0) {
        sale.D01_approve = sale.system_suggest_count_modify;
      }

      return sale.system_suggest_count;
    };

    $scope.modifySystemAreaSuggestPercent = function (sale) {
      sale.system_suggest_count_modify_percent = parseInt((sale.system_suggest_count_modify - sale.system_suggest_count) * 100 / ((sale.system_suggest_count > 0) ? sale.system_suggest_count : (-sale.system_suggest_count)));
      sale.D01_approve = sale.system_suggest_count_modify;
    };

    function suggestOrderSubmit() {
      var sales = [];

      for (var i = 0; i < $scope.orders.length; i++) {
        var sale = $scope.orders[i];
        if (sale.system_suggest_count_modify_percent >= 50 || sale.system_suggest_count_modify_percent < -50 || isNaN(sale.system_suggest_count_modify_percent)) {
          if (!sale.remark) {
            return alert('产品编码:' + sale.product.product_number + '超额订购需填写备注');
          }
          if (sale.is_sure !== '是') {
            return alert('产品编码:' + sale.product.product_number + '超额订购需上级确认');
          }
        }

        sales.push({
          _id: sale._id,
          system_suggest_count: sale.system_suggest_count,
          system_suggest_count_modify: sale.system_suggest_count_modify,
          system_suggest_count_modify_percent: sale.system_suggest_count_modify_percent,
          D01: sale.D01,
          remark: sale.remark,
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

    $scope.sureOrder = function (order) {
      AreaOrderService.sureOrder(order).then(function (data) {
        if (data && !data.err) {
          order.is_sure = data.is_sure;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [['SKU编码',
        '产品名称',
        '产品条码',
        '品类',
        '中分类名称',
        '系列名称',
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
        '确认超额订购',
        '上传订单试用装',
        '上传订单陈列',
        '最终审批试用装',
        '最终审批陈列',
        '最终审批订货数',
        '总金额',
        '审批状态'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product.product_number,
          o.product.product_name,
          o.product.product_barcode,
          o.product.category,
          o.product.mid_classify,
          o.product.series_name,
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
          o.system_suggest_count_modify_percent + '%',
          o.remark,
          o.is_sure === '是' ? '已确认' : '',
          o.D03,
          o.D04,
          o.D03_approve,
          o.D04_approve,
          o.D01_approve,
          (o.D01_approve + o.D02_approve + o.D03_approve) * o.product.sales_price,
          o.status
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);