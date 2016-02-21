/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqCurrentCtrl', ['$scope', '$rootScope', 'HqOrderService',
  function ($scope, $rootScope, HqOrderService) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单',
      btns: [{
        text: '导入当前库存',
        clickCallback: ClickCallback
      }]
    });


    $scope.stocks = [];
    $scope.getHqCurrentStocks = function () {
      HqOrderService.getHqCurrentStocks().then(function (data) {
        if (!data.err) {
          $scope.stocks = data;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHqCurrentStocks();

    function ClickCallback() {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '正品'},
        {key: 'C1', value: '近效期'},
        {key: 'D1', value: '次品'}
      ];

      function upload(stocks, i) {
        HqOrderService.hqStockImport(stocks[i++])
          .then(function (data) {
            console.log(data);
            if (stocks[i]) {
              upload(stocks, i);
            }
          }, function (err) {
            console.log(err);
          });
      }

      $scope.hqStockImport = function (stocks) {
        var i = 0;
        upload(stocks, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传当前湖村',
        contents: [{
          key: '请选择需要上传的库存文件',
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '总部库存'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              genuine_goods: item['正品'],
              validity: item['近效期'],
              ungenuine_goods: item['次品']
            });
          });
          var stocks = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            stocks.push(result.slice(i, i + 100));
          }
          if (stocks.length > 0) {
            $scope.hqStockImport(stocks);
          }
          console.log(stocks);
        }
      });
    }
  }]);