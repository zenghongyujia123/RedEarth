/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaOtherOrderCtrl', ['$scope', '$rootScope', '$state', 'AreaOrderService','Loading',
  function ($scope, $rootScope, $state, AreaOrderService,Loading) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单',
      btns: [
        {
          text: '上传批发订单',
          clickCallback: function () {
            orderClickCallback('D02');
          }
        },
        {
          text: '上传试用订单',
          clickCallback: function () {
            orderClickCallback('D03');
          }
        },
        {
          text: '上传陈列订单',
          clickCallback: function () {
            orderClickCallback('D04');
          }
        }
      ]
    });
    $scope.orders = [];
    $scope.getOrdersByArea = function () {
      Loading.show();
      AreaOrderService.getOrdersByArea().then(function (data) {
        if (!data.err) {
          $scope.orders = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };
    $scope.getOrdersByArea();

    function orderClickCallback(orderType) {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '产品条码'},
        {key: 'D1', value: '品类'},
        {key: 'E1', value: '中分类名称'},
        {key: 'F1', value: '销售价格'},
        {key: 'G1', value: '订单数量'},
        {key: 'H1', value: '总销售价格'}
      ];

      function upload(orders, i) {
        AreaOrderService.otherOrderImport(orders[i++])
          .then(function (data) {
            console.log(data);
            if (orders[i]) {
              upload(orders, i);
            }
            else {
              Loading.hide();
              $state.go('order_suggest.suggest_area_other_order', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      function getContentKey(type) {
        switch (type) {
          case  'D02':
            return '批发订单';
          case  'D03':
            return '试用订单';
          case  'D04':
            return '陈列订单';
        }
        return '';
      }

      $scope.otherOrderImport = function (orders) {
        var i = 0;
        Loading.show();
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传' + getContentKey(orderType),
        contents: [{
          key: getContentKey(orderType),
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '地区上传其他订单页面格式'
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
              total_price: item['总销售价格']
            });
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            orders.push(result.slice(i, i + 100));
          }
          if (orders.length > 0) {
            $scope.otherOrderImport(orders);
          }
          console.log(orders);
        }
      });
    }
  }]);