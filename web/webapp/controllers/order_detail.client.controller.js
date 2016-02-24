/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderDetailCtrl', ['$scope', '$stateParams', '$state', 'AreaOrderService', 'AuthService','Loading',
  function ($scope, $stateParams, $state, AreaOrderService, AuthService,Loading) {
    $scope.order_number = $stateParams.order_number;
    $scope.orders = [];
    $scope.getAreaOrderDetail = function () {
      Loading.show();
      AreaOrderService.getAreaOrderDetail($scope.order_number).then(function (data) {
        if (data && !data.err) {
          $scope.orders = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    $scope.getAreaOrderDetail();

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('AuthService', function (user) {
      $scope.user = user;
    });

    $scope.approveAreaOrder = function (o) {
      if (o.status === '已审核') {
        return;
      }
      AreaOrderService.approveAreaOrder(o).then(function (data) {
        if (data && !data.err) {
          $state.go('order_detail', {}, {reload: true});
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
  }]);