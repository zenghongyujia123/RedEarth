/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqAgencyCtrl', ['$scope', '$state', '$rootScope', 'AuthService', 'HqOrderService',
  function ($scope, $state, $rootScope, AuthService, HqOrderService) {
    $scope.curSubmitOrder = {};
    $scope.getCurrentHqSubmitOrder = function () {
      HqOrderService.getCurrentHqSubmitOrder().then(function (data) {
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y05);
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getCurrentHqSubmitOrder();

    $scope.changeImportBtn = function (text) {
      if (text === '有') {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: [
            {
              text: '上传经销商订单',
              clickCallback: function () {
                orderClickCallback('Y05');
              }
            }
          ]
        });
      }
      else {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: []
        });
      }
    };

    $scope.clickOrderStatus = function (status) {
      $scope.curSubmitOrder.has_Y05 = status;
      $scope.updateSubmitOrderStatus();
    };

    $scope.updateSubmitOrderStatus = function () {
      HqOrderService.updateSubmitOtherOrderStatus({
        _id: $scope.curSubmitOrder._id,
        has_Y02: $scope.curSubmitOrder.has_Y02,
        has_Y03: $scope.curSubmitOrder.has_Y03,
        has_Y04: $scope.curSubmitOrder.has_Y04,
        has_Y05: $scope.curSubmitOrder.has_Y05,
        has_Y06: $scope.curSubmitOrder.has_Y06,
        has_Y07: $scope.curSubmitOrder.has_Y07
      }).then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y05);
        }
      }, function (data) {
        console.log(data);
      });
    };

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('SuggestHqAgencyCtrl', function (user) {
      $scope.user = user;
    });

    $scope.orders = [];
    $scope.getHqOtherOrders = function () {
      HqOrderService.getHqOtherOrders('Y05').then(function (data) {
        if (!data.err) {
          $scope.orders = data;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHqOtherOrders();

    function orderClickCallback(orderType) {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '产品条码'},
        {key: 'D1', value: '品类'},
        {key: 'E1', value: '中分类名称'},
        {key: 'F1', value: '销售价格'},
        {key: 'G1', value: '晋颖成本价'},
        {key: 'H1', value: '订单数量'},
        {key: 'I1', value: '晋颖总价格'}
      ];

      function upload(orders, i) {
        HqOrderService.hqOtherOrderImport(orders[i++])
          .then(function (data) {
            console.log(data);
            if (orders[i]) {
              upload(orders, i);
            }
            else {
              $state.go('order_suggest.suggest_hq_agency', {}, {reload: true});
            }
          }, function (err) {
            console.log(err);
          });
      }

      function getContentKey(type) {
        switch (type) {
          case  'Y05':
            return '批发订单';
        }
        return '';
      }

      $scope.hqOtherOrderImport = function (orders) {
        var i = 0;
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传' + getContentKey(orderType),
        contents: [{
          key: getContentKey(orderType),
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '总部上传其他订单页面格式'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              product_name: item['产品名称'],
              product_barcode: item['产品条码'],
              category: item['品类'],
              mid_classify: item['中分类名称'],
              sales_price: item['销售价格'],
              order_count: item['订单数量'],
              order_type: orderType,
              total_price: item['总销售价格'],
              jinyi_cost: item['晋颖成本价'],
              jinyi_total_price: item['晋颖总价格']
            });
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            orders.push(result.slice(i, i + 100));
          }
          if (orders.length > 0) {
            $scope.hqOtherOrderImport(orders);
          }
          console.log(orders);
        }
      });
    }


  }]);