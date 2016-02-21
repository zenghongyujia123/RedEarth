/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('DashboardQueryCtrl', ['$scope', 'AreaOrderService', function ($scope, AreaOrderService) {
  $scope.getAreaOrderList = function () {
    AreaOrderService.getAreaOrderList().then(function (data) {
      console.log(data);
    }, function (data) {
      console.log(data);
    });
  };
  $scope.getAreaOrderList();
}]);