/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderQueryCtrl', ['$scope', '$state', 'AreaOrderService', 'HqOrderService', 'AuthService',
  function ($scope, $state, AreaOrderService, HqOrderService, AuthService) {
    $scope.goDetail = function (o) {
      $state.go('order_detail', {order_number: o.order_number});
    };
    $scope.user = AuthService.getUser() || {};
    $scope.signOut = function () {
      AuthService.signOut();
    };

    $scope.orders = [];
    $scope.getAreaOrderList = function (callback) {
      AreaOrderService.getAreaOrderList().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.orders = $scope.orders.concat(data);
        }
        if (callback) {
          return callback();
        }
      }, function (data) {
        console.log(data);
      });
    };

    $scope.getHqOrderList = function () {
      HqOrderService.getHqOrderList().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.orders = $scope.orders.concat(data);
        }
      }, function (data) {
        console.log(data);
      });
    };

    if ($scope.user.account_type === '地区总部') {
      $scope.getHqOrderList();
    }
    $scope.getAreaOrderList();


  }]);