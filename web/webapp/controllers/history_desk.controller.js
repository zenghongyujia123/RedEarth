/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistoryDeskCtrl', ['$scope', 'ProductService', 'Loading','ExcelReaderService',
  function ($scope, ProductService, Loading,ExcelReaderService) {
    $scope.$emit('suggest.import.changed', {
      title: '历史数据',
      btns: [
        {
          text: '导出',
          clickCallback: exportExecl
        }
      ]
    });

    $scope.desks = [];

    $scope.getDesk = function () {
      Loading.show();
      ProductService.getDesks().then(function (data) {
        if (data && !data.err) {
          $scope.desks = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };
    $scope.getDesk();

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '所属地区',
        '地区',
        '柜台号',
        '柜台名'
      ]];

      $scope.desks.forEach(function (d) {
        rows.push([
          d.area,
          d.child_area,
          d.desk_number,
          d.desk_name
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }

  }]);