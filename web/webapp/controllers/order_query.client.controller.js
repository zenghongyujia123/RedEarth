/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderQueryCtrl', ['$scope', '$state', 'AreaOrderService', function ($scope, $state, AreaOrderService) {
  $scope.orders = [];
  $scope.getAreaOrderList = function () {
    AreaOrderService.getAreaOrderList().then(function (data) {
      console.log(data);
      if (data && !data.err) {
        $scope.orders = data;
      }
    }, function (data) {
      console.log(data);
    });
  };
  $scope.getAreaOrderList();

  $scope.goDetail = function (o) {
    $state.go('order_detail', {order_number: o.order_number});
  }
}]);