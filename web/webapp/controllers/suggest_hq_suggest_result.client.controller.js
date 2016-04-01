/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqSuggestResultCtrl', ['$scope', '$state', '$rootScope', 'HqOrderService','ExcelReaderService',
  function ($scope, $state, $rootScope, HqOrderService,ExcelReaderService) {
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
                },
                {
                  text: '导出',
                  clickCallback: exportExecl
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
      if (sale.system_suggest_count_modify >= min_factory_moq && sale.system_suggest_count_modify < factory_moq) {
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

      for (var i = 0; i < $scope.suggests.length; i++) {
        var sale = $scope.suggests[i];
        if (sale.system_suggest_count_modify_percent >= 50 || sale.system_suggest_count_modify_percent < -50 || isNaN(sale.system_suggest_count_modify_percent)) {
          if (!sale.remark) {
            return alert('产品编码:' + sale.product.product_number + '超额订购需填写备注');
          }
          if (sale.is_sure !== '是') {
            return alert('产品编码:' + sale.product.product_number + '超额订购需上级确认');
          }
        }

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
      }

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

    $scope.sureOrder = function (order) {
      HqOrderService.sureOrder(order).then(function (data) {
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
      var rows = [[
        'SKU编码',
        '产品名称',
        '产品条码',
        '品类',
        '中分类名称',
        '系列名称',
        '销售价格',
        '晋颖成本价',
        'ABC分类',
        'ABC类说明',
        'ABC类别%',
        '上月月结库存总部正品库存',
        '上月月结总部在途',
        '月均销售前3个月平均',
        '安全库存2个月',
        '后1月销售预测',
        '后2月销售预测',
        '后3月销售预测',
        '后4月销售预测',
        '后5月销售预测',
        '后6月销售预测',
        '当月汇总地区已审批订单',
        '当月汇总地区已审批试用装',
        '当月汇总地区已审批陈列',
        '上传其他订单批发',
        '上传其他订单试用装',
        '上传其他订单陈列',
        '上传其他订单经销商',
        '上传其他订单电商',
        '上传其他订单茂姿',
        '当月总部订单系统建议',
        '修改',
        '修改%',
        '当月总部订单moq系统建议',
        '备注',
        '已取得上级核准',
        '澳妆最终审批采购量',
        '澳妆最终审批采购金额',
        '澳妆最终审批零售金额',
        '审核状态'
      ]];

      $scope.suggests.forEach(function (o) {
        rows.push([
          o.product.product_number,
          o.product.product_name,
          o.product.product_barcode,
          o.product.category,
          o.product.mid_classify,
          o.product.series_name,
          o.product.sales_price,
          o.product.jinyi_cost,
          o.product.abc_classify,
          o.product.abc_classify_explain,
          o.product.abc_category,
          o.genuine_goods,
          o.onway_goods,
          o.next_month_sales_forecast_0,
          o.safe_stock,
          o.next_month_sales_forecast_1,
          o.next_month_sales_forecast_2,
          o.next_month_sales_forecast_3,
          o.next_month_sales_forecast_4,
          o.next_month_sales_forecast_5,
          o.next_month_sales_forecast_6,
          o.D01_approve,
          o.D03_approve,
          o.D04_approve,
          o.Y02,
          o.Y03,
          o.Y04,
          o.Y05,
          o.Y06,
          o.Y07,
          o.system_suggest_count,
          o.system_suggest_count_modify,
          o.system_suggest_count_modify_percent+'%',
          o.final_system_suggest_count,
          o.remark,
          o.is_sure==='是'?'已确认':'',
          o.final_purchased_count,
          o.final_purchased_count*o.product.jinyi_cost,
          o.final_purchased_count*o.product.sales_price,
          o.status
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);