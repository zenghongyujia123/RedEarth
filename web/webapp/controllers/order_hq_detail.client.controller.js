/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderHqDetailCtrl', ['$scope', '$state', '$stateParams', 'AuthService', 'AreaOrderService', 'HqOrderService','Loading',
  function ($scope, $state, $stateParams, AuthService, AreaOrderService, HqOrderService,Loading) {
    $scope.importBtns = [];
    $scope.order_number = $stateParams.order_number;
    $scope.location = window.location;

    $scope.orders = [];
    $scope.getHqOrderDetail = function () {
      Loading.show();
      HqOrderService.getHqOrderDetail($scope.order_number).then(function (data) {
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

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('AuthService', function (user) {
      $scope.user = user;
    });
    $scope.getHqOrderDetail();
  }]);