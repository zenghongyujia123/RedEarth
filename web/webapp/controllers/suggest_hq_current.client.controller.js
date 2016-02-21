/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqCurrentCtrl', ['$scope', '$rootScope', 'HqOrderService',
  function ($scope, $rootScope, HqOrderService) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单',
      btns: [{
        text: '导入当前库存',
        clickCallback: salesClickCallback
      }]
    });


    $scope.stocks = [];
    $scope.getSalesByArea = function () {
      AreaOrderService.getSalesByArea().then(function (data) {
        if (!data.err) {
          $scope.sales = data;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getSalesByArea();

    function salesClickCallback() {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '上月销售量'},
        {key: 'C1', value: '上月月结库存量'},
        {key: 'D1', value: '上月月结在途量'}
      ];

      function upload(saleses, i) {
        AreaOrderService.areaSalesStockOnwayImport(saleses[i++])
          .then(function (data) {
            console.log(data);
            if (saleses[i]) {
              upload(saleses, i);
            }
          }, function (err) {
            console.log(err);
          });
      }

      $scope.areaSalesStockOnwayImport = function (saleses) {
        var i = 0;
        upload(saleses, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传销量库存在途量',
        contents: [{
          key: '请选择需要上传的销量库存在途量文件',
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '分区'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              last_month_sales_count: item['上月销售量'],
              last_month_stock_count: item['上月月结库存量'],
              last_month_onway_count: item['上月月结在途量'],
            });
          });
          var sales = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            sales.push(result.slice(i, i + 100));
          }
          if (sales.length > 0) {
            $scope.areaSalesStockOnwayImport(sales);
          }
          console.log(sales);
        }
      });
    }
  }]);