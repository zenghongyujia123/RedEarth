/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderReApproveHqCtrl', ['$scope', '$state', '$stateParams', 'AuthService', 'AreaOrderService', 'HqOrderService', 'Loading', '$rootScope', 'ExcelReaderService',
  function ($scope, $state, $stateParams, AuthService, AreaOrderService, HqOrderService, Loading, $rootScope, ExcelReaderService) {
    $scope.importBtns = [];
    $scope.order_number = $stateParams.order_number;
    $scope.location = window.location;
    $scope.$on('suggest.import.changed', function (event, data) {
      $scope.importBtns = data.btns;
      $scope.title = data.title;
    });

    $scope.orders = [];
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

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('AuthService', function (user) {
      $scope.user = user;
    });
    $scope.getAreaOrderDetail();

    $scope.approveHqOrders = function () {
      var sales = [];
      Loading.show();

      $scope.orders.forEach(function (sale) {
        sales.push({
          _id: sale._id,
          order_number: sale.order_number,
          final_purchased_count: sale.final_purchased_count,
          final_purchased_price: sale.final_purchased_price
        });
      });
      var final_sales = [];
      for (var i = 0, len = sales.length; i < len; i += 40) {
        final_sales.push(sales.slice(i, i + 40));
      }

      upload(final_sales, 0);
    };


    function upload(orders, i) {
      HqOrderService.approveHqOrders(orders[i++])
        .then(function (data) {
          console.log(data);
          if (orders[i]) {
            upload(orders, i);
          }
          else {
            Loading.hide();
            $state.go('order_re_approve_hq', {}, {reload: true});
          }
        }, function (err) {
          console.log(err);
          Loading.hide();
        });
    }

    $scope.approveHqOrder = function (o) {
      HqOrderService.approveHqOrder(o).then(function (data) {
        console.log(data);
        if (data && !data.err) {
          o.status = data.status;
          alert('ok');
        }
      }, function (data) {
        console.log(data);
      });
    };

    $scope.inputPurchaseCount = function (order) {
      order.final_purchased_price = order.final_purchased_count * order.product.sales_price;
    };

    $scope.importHqDeliveryTime = function () {
      importHqDeliveryTime()
    };

    function importHqDeliveryTime() {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '实际收货数'},
        {key: 'D1', value: '实际交期'},
        {key: 'E1', value: '剩余计划交期'}
      ];

      function upload(timeInfos, i) {
        HqOrderService.importHqDeliveryTime($scope.order_number, timeInfos[i++])
          .then(function (data) {
            console.log(data);

            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              return $state.go('order_re_approve_hq', {}, {reload: true});
            }

            if (timeInfos[i]) {
              upload(timeInfos, i);
            }
            else {
              Loading.hide();
              $state.go('order_re_approve_hq', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      $scope.otherOrderImport = function (orders) {
        var i = 0;
        Loading.show();
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传交期',
        contents: [{
          key: '上传交期',
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '澳妆审批采购订单页面'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              product_name: item['产品名称'],
              real_delivery_count: item['实际收货数'],
              real_delivery_time: item['实际交期'],
              final_plan_delivery_time: item['剩余计划交期']
            });
          });
          var timeInfos = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            timeInfos.push(result.slice(i, i + 100));
          }
          if (timeInfos.length > 0) {
            upload(timeInfos, 0);
          }
          console.log(timeInfos);
        }
      });
    }

    $scope.exportSystemSuggest = function () {
      exportSystemSuggest();
    };

    function exportSystemSuggest() {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        'SKU编码',
        '产品条码',
        '品类',
        '中分类名称',
        '销售价格',
        '晋颖成本价',
        'ABC分类',
        'ABC类说明',
        'ABC类别%',
        '上月月结库存总部正品库存',
        '上月月结总部在途',
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

      $scope.orders.forEach(function (s) {
        rows.push([
          s.product.product_name,
          s.product_number,
          s.product.product_barcode,
          s.product.category,
          s.product.mid_classify,
          s.product.sales_price,
          s.product.jinyi_cost,
          s.product.abc_classify,
          s.product.abc_classify_explain,
          s.product.abc_category,
          s.genuine_goods,
          s.onway_goods,
          s.product.jinyi_ungenuine_goods,
          s.product.jinyi_validity,
          s.next_month_sales_forecast_0,
          s.safe_stock,
          s.next_month_sales_forecast_1,
          s.next_month_sales_forecast_2,
          s.next_month_sales_forecast_3,
          s.next_month_sales_forecast_4,
          s.next_month_sales_forecast_5,
          s.next_month_sales_forecast_6,
          s.D01_approve,
          s.D03,
          s.D04,
          s.Y02,
          s.Y03,
          s.Y04,
          s.Y05,
          s.Y06,
          s.Y07,
          s.system_suggest_count,
          s.final_system_suggest_count,
          s.system_suggest_count_modify,
          s.system_suggest_count_modify_percent + '%',
          s.remark,
          s.is_sure === '是' ? '是' : '',
          s.product.factory_moq,
          s.product.moq_remark,
          s.product.order_count_exceed_moq,
          s.final_purchased_count,
          s.final_purchased_count*s.product.jinyi_cost,
          s.final_purchased_count*s.product.sales_price,
          s.plan_delivery_count,
          s.plan_delivery_time,
          s.real_delivery_count,
          s.real_delivery_time,
          s.onway_count,
          s.final_plan_delivery_time,
          s.status
        ]);
      });
      execlReader.exportExcel(rows);
    }
  }]);