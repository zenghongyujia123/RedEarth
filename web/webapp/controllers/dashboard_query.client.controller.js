/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('DashboardQueryCtrl', ['$scope', 'AreaOrderService', function ($scope, HqOrderService, AreaOrderService) {
  $scope.curName = '总部';

  $scope.clickBtn = function (name) {
    $scope.curName = name;
  };

  $scope.getAreaReports = function () {
    AreaOrderService.getAreaReports().then(function (data) {
      console.log(data);
    }, function (data) {
      console.log(data);
    });
  };

  $scope.getHqReports = function (name) {
    HqOrderService.getHqReports(name).then(function (data) {
      console.log(data);
    }, function (data) {
      console.log(data);
    });
  };


}]);