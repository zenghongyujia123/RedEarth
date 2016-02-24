/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderQueryCtrl', ['$scope', '$state', 'AreaOrderService', 'HqOrderService', 'AuthService', 'Loading',
  function ($scope, $state, AreaOrderService, HqOrderService, AuthService, Loading) {
    $scope.goDetail = function (o) {
      if ($scope.user.account_type === '地区总部') {
        $state.go('order_hq_approve_area', {order_number: o.order_number});
      }

      if ($scope.user.account_type === '地区分公司') {
        $state.go('order_detail', {order_number: o.order_number});
      }

      if ($scope.user.account_type === '澳妆供应链') {
        $state.go('order_re_approve_hq', {order_number: o.order_number});
      }


    };
    $scope.user = AuthService.getUser() || {};
    $scope.signOut = function () {
      AuthService.signOut();
    };

    $scope.orders = [];
    $scope.getAreaOrderList = function (callback) {
      Loading.show();
      AreaOrderService.getAreaOrderList().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.orders = $scope.orders.concat(data);
        }
        if (callback) {
          return callback();
        }
        Loading.hide();
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    $scope.getHqOrderList = function () {
      Loading.show();
      HqOrderService.getHqOrderList().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.orders = $scope.orders.concat(data);
        }
        Loading.hide();
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    if ($scope.user.account_type === '地区总部') {
      $scope.getAreaOrderList();
    }

    if ($scope.user.account_type === '地区分公司') {
      $scope.getAreaOrderList();
    }

    if ($scope.user.account_type === '澳妆供应链') {
      $scope.getHqOrderList();
    }

  }]);