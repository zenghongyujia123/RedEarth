/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistorySalesCtrl', ['$scope', '$state', '$rootScope', 'AreaOrderService', 'Loading',
  function ($scope, $state, $rootScope, AreaOrderService, Loading) {
    $scope.$emit('suggest.import.changed', {
      title: '历史数据',
      btns: [
        {
          text: '导入历史销售,库存',
          clickCallback: importClickCallback
        }
      ]
    });

    $scope.sales = [];

    $scope.getHistorySales = function () {
      Loading.show();
      AreaOrderService.getHistorySales().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.sales = data;
        }
        Loading.hide();
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    $scope.getHistorySales();
    function importClickCallback() {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '地区'},
        {key: 'C1', value: '月份'},
        {key: 'D1', value: '月销售量'},
        {key: 'E1', value: '月结库存量'},
        {key: 'F1', value: '月结在途量'}
      ];

      function upload(sales, i) {
        console.log(i);
        AreaOrderService.importsHistorySales(sales[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              return $state.go('order_history.history_sales', {}, {reload: true});
            }

            console.log(data);
            if (sales[i]) {
              upload(sales, i);
            }
            else {
              Loading.hide();
              $state.go('order_history.history_sales', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      $scope.importsHistorySales = function (sales) {
        var i = 0;
        Loading.show();
        upload(sales, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传历史销量库存在途量资料',
        contents: [{
          key: '请选择需要上传资料文件',
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '历史销量库存在途量'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            var p = {};
            p.product_number = item['SKU编码'];
            p.department = item['地区'];
            p.month = item['月份'];
            p.last_month_sales_count = parseInt(item['月销售量']);
            p.last_month_stock_count = parseInt(item['月结库存量']);
            p.last_month_onway_count = parseInt(item['月结在途量']);
            result.push(p);
          });
          var sales = [];
          for (var i = 0, len = result.length; i < len; i += 50) {
            sales.push(result.slice(i, i + 50));
          }
          if (sales.length > 0) {
            $scope.importsHistorySales(sales);
          }
          console.log(data);
          console.log(sales);
        }
      });
    }

  }]);