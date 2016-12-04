/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistoryBackupCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'AreaOrderService', 'AuthService', 'Loading', 'ExcelReaderService', 'HistoryOrderService',
  function ($scope, $rootScope, $stateParams, $state, AreaOrderService, AuthService, Loading, ExcelReaderService, HistoryOrderService) {
    $scope.$emit('suggest.import.changed', {
      title: '4-9月历史数据',
      btns: [
        {
          text: '导入4-9月历史销售,库存',
          clickCallback: importClickCallback
        },
        {
          text: '导出',
          clickCallback: exportExecl
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

    //$scope.getHistorySales();
    function importClickCallback() {
      var headers = [
        {key: 'A1', value: '城市'},
        {key: 'B1', value: '年月'},
        {key: 'C1', value: 'SKU编码'},
        {key: 'D1', value: '上月销售量'},
        {key: 'E1', value: '上月月结库存量'},
        {key: 'F1', value: '上月月结在途量'}
      ];

      function upload(sales, i) {
        console.log(i);
        HistoryOrderService.areaHistoryOrderImport(sales[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              return $state.go('order_history.history_backup', {}, {reload: true});
            }

            console.log(data);
            if (sales[i]) {
              upload(sales, i);
            }
            else {
              Loading.hide();
              $state.go('order_history.history_backup', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      $scope.areaHistoryOrderImport = function (sales) {
        var i = 0;
        Loading.show();
        upload(sales, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传3-9月历史销量库存在途量资料',
        contents: [{
          key: '请选择需要上传资料文件',
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '汇总'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            var p = {};
            p.product_number = item['SKU编码'];
            p.department = item['城市'];
            p.month = item['年月'];
            p.sale_count = isNaN(parseInt(item['上月销售量'])) ? 0 : parseInt(item['上月销售量']);
            p.stock_count = isNaN(parseInt(item['上月月结库存量'])) ? 0 : parseInt(item['上月月结库存量']);
            p.onway_count = isNaN(parseInt(item['上月月结在途量'])) ? 0 : parseInt(item['上月月结在途量']);
            result.push(p);
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 50) {
            orders.push(result.slice(i, i + 50));
          }
          if (orders.length > 0) {
            $scope.areaHistoryOrderImport(orders);
          }
          console.log(data);
          console.log(orders);
        }
      });
    }

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        'SKU编码',
        '产品名称',
        '月份',
        '地区',
        '销售量',
        '月结库存',
        '月结在途'
      ]];

      $scope.sales.forEach(function (s) {
        rows.push([
          s.product_number,
          s.product.product_name,
          s.month,
          s.department,
          s.last_month_sales_count,
          s.last_month_stock_count,
          s.last_month_onway_count
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }


  }]);