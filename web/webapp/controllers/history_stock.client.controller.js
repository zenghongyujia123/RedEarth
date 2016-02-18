/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistoryStockCtrl', ['$scope', 'AreaOrderService',
  function ($scope, AreaOrderService) {
    $scope.$emit('suggest.import.changed', {
      title: '历史数据',
      btns: [
        {
          text: '导入历史库存',
          clickCallback: importClickCallback
        }
      ]
    });

    function importClickCallback(){}


    $scope.sales = [];

    $scope.getHistorySales = function () {
      AreaOrderService.getHistorySales().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.sales = data;
        }
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHistorySales();
  }]);