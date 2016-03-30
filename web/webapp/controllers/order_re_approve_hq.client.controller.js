/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderReApproveHqCtrl', ['$scope', '$state', '$stateParams', 'AuthService', 'AreaOrderService', 'HqOrderService', 'Loading', '$rootScope',
  function ($scope, $state, $stateParams, AuthService, AreaOrderService, HqOrderService, Loading, $rootScope) {
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

  }]);