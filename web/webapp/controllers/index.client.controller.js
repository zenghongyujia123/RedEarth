/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('IndexCtrl', ['$scope', function ($scope) {
  $scope.location = window.location;
  $scope.headers = [
    {
      text: '建议订单'
    },
    {
      text: '查看订单'
    },
    {
      text: '历史数据'
    },
    {
      text: '系统设置'
    },
    {
      text: '订单详情'
    },
    {
      text: '查看报表'
    }
  ]
}]);