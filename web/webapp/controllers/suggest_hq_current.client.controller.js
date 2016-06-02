/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqCurrentCtrl', ['$scope','$state', '$rootScope', 'HqOrderService','Loading','ExcelReaderService',
  function ($scope,$state, $rootScope, HqOrderService,Loading,ExcelReaderService) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单',
      btns: [{
        text: '导入当前库存',
        clickCallback: ClickCallback
      },
        {
          text: '导出',
          clickCallback: exportExecl
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
        {key: 'C1', value: '在途'},
        {key: 'D1', value: '近效期'},
        {key: 'E1', value: '次品'}
      ];

      function upload(stocks, i) {
        HqOrderService.hqStockImport(stocks[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              Loading.hide();
              return $state.go('order_suggest.suggest_hq_current', {}, {reload: true});
            }

            console.log(data);
            if (stocks[i]) {
              upload(stocks, i);
            }
            else {
              Loading.hide();
              $state.go('order_suggest.suggest_hq_current', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      $scope.hqStockImport = function (stocks) {
        Loading.show();
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
              onway_goods: item['在途'],
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

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        'SKU编码',
        '正品',
        '在途',
        '近效期',
        '次品'
      ]];

      $scope.stocks.forEach(function (o) {
        rows.push([
          s.product_number,
          s.genuine_goods,
          s.onway_goods,
          s.validity,
          s.ungenuine_goods
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);