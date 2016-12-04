/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistoryHqBackupCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'AreaOrderService', 'AuthService', 'Loading', 'ExcelReaderService', 'HistoryOrderService',
  function ($scope, $rootScope, $stateParams, $state, AreaOrderService, AuthService, Loading, ExcelReaderService, HistoryOrderService) {
    $scope.$emit('suggest.import.changed', {
      title: '4-9月地区历史数据',
      btns: [
        {
          text: '导入4-9月总部数据',
          clickCallback: importClickCallback
        },
        {
          text: '导出',
          clickCallback: exportExecl
        }
      ]
    });

    $scope.orders = [];

    $scope.getHqOrderHistory = function () {
      Loading.show();
      HistoryOrderService.getHqOrderHistory().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.orders = data;
        }
        Loading.hide();
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    $scope.getHqOrderHistory();
    function importClickCallback() {
      var headers = [
        {key: 'A1', value: '月份年'},
        {key: 'B1', value: 'SKU编码'},
        {key: 'C1', value: '正品'},
        {key: 'D1', value: '在途'},
        {key: 'E1', value: '近效期'},
        {key: 'F1', value: '次品'}
      ];

      function upload(sales, i) {
        console.log(i);
        HistoryOrderService.hqHistoryOrderImport(sales[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              return $state.go('order_history.history_hq_backup', {}, {reload: true});
            }

            console.log(data);
            if (sales[i]) {
              upload(sales, i);
            }
            else {
              Loading.hide();
              $state.go('order_history.history_hq_backup', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      $scope.hqHistoryOrderImport = function (sales) {
        var i = 0;
        Loading.show();
        upload(sales, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传3-9月总部',
        contents: [{
          key: '请选择需要上传资料文件',
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '数据'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            var p = {};
            p.product_number = item['SKU编码'];
            p.month = item['月份年'];
            p.zhengpin = isNaN(parseInt(item['正品'])) ? 0 : parseInt(item['正品']);
            p.zaitu = isNaN(parseInt(item['在途'])) ? 0 : parseInt(item['在途']);
            p.jinxiaoqi = isNaN(parseInt(item['近效期'])) ? 0 : parseInt(item['近效期']);
            p.cipin = isNaN(parseInt(item['次品'])) ? 0 : parseInt(item['次品']);
            result.push(p);
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 50) {
            orders.push(result.slice(i, i + 50));
          }
          if (orders.length > 0) {
            $scope.hqHistoryOrderImport(orders);
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
        '正品',
        '在途',
        '近效期'
      ]];

      $scope.orders.forEach(function (s) {
        rows.push([
          s.product_number,
          s.product.product_name,
          s.month,
          s.zhengpin,
          s.zaitu,
          s.jinxiaoqi,
          s.cipin
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }


  }]);