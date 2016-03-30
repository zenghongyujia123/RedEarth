/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderReApproveHqCtrl', ['$scope', '$state', '$stateParams', 'AuthService', 'AreaOrderService', 'HqOrderService', 'Loading',
  function ($scope, $state, $stateParams, AuthService, AreaOrderService, HqOrderService, Loading) {
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

    $scope.importDeliveryTime = function () {

    };

    //function importDeliveryTime() {
    //  var headers = [
    //    {key: 'A1', value: 'SKU编码'},
    //    {key: 'B1', value: '产品名称'},
    //    {key: 'C1', value: '产品条码'},
    //    {key: 'D1', value: '品类'},
    //    {key: 'E1', value: '中分类名称'},
    //    {key: 'F1', value: '销售价格'},
    //    {key: 'G1', value: '订单数量'},
    //    {key: 'H1', value: '总销售价格'}
    //  ];
    //
    //  function upload(orders, i) {
    //    AreaOrderService.otherOrderImport(orders[i++])
    //      .then(function (data) {
    //        console.log(data);
    //
    //        if (data && data.err && data.err.type === 'product_not_exist') {
    //          alert(data.err.message);
    //          return $state.go('order_suggest.suggest_area_other_D02', {}, {reload: true});
    //        }
    //
    //        if (orders[i]) {
    //          upload(orders, i);
    //        }
    //        else {
    //          Loading.hide();
    //          $state.go('order_suggest.suggest_area_other_D02', {}, {reload: true});
    //        }
    //      }, function (err) {
    //        Loading.hide();
    //        console.log(err);
    //      });
    //  }
    //
    //  function getContentKey(type) {
    //    switch (type) {
    //      case  'D02':
    //        return '批发订单';
    //      case  'D03':
    //        return '试用订单';
    //      case  'D04':
    //        return '陈列订单';
    //    }
    //    return '';
    //  }
    //
    //  $scope.otherOrderImport = function (orders) {
    //    var i = 0;
    //    Loading.show();
    //    upload(orders, i);
    //  };
    //
    //  $rootScope.$broadcast('show.dialogUpload', {
    //    title: '上传' + getContentKey(orderType),
    //    contents: [{
    //      key: getContentKey(orderType),
    //      value: '点击选择文件',
    //      tip: '点击选择文件',
    //      sheetName: '地区上传其他订单页面格式'
    //    }],
    //    color: 'blue',
    //    headers: headers,
    //    callback: function (data) {
    //      var result = [];
    //      data.forEach(function (item) {
    //        result.push({
    //          product_number: item['SKU编码'],
    //          product_name: item['产品名称'],
    //          product_barcode: item['产品条码'],
    //          category: item['品类'],
    //          mid_classify: item['中分类名称'],
    //          sales_price: item['销售价格'],
    //          order_count: item['订单数量'],
    //          order_type: orderType,
    //          total_price: item['总销售价格']
    //        });
    //      });
    //      var orders = [];
    //      for (var i = 0, len = result.length; i < len; i += 100) {
    //        orders.push(result.slice(i, i + 100));
    //      }
    //      if (orders.length > 0) {
    //        $scope.otherOrderImport(orders);
    //      }
    //      console.log(orders);
    //    }
    //  });
    //}

  }]);