/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderDetailCtrl', ['$scope', '$stateParams', 'AreaOrderService', 'AuthService',
  function ($scope, $stateParams, AreaOrderService, AuthService) {
    $scope.order_number = $stateParams.order_number;
    $scope.orders = [];
    $scope.getAreaOrderDetail = function () {
      AreaOrderService.getAreaOrderDetail($scope.order_number).then(function (data) {
        if (data && !data.err) {
          $scope.orders = data;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };

    $scope.getAreaOrderDetail();

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('AuthService', function (user) {
      $scope.user = user;
    });

  }]);