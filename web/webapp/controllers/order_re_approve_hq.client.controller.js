/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderReApproveHqCtrl', ['$scope', '$stateParams', 'AuthService', 'AreaOrderService',
  function ($scope, $stateParams, AuthService, AreaOrderService) {
    $scope.importBtns = [];
    $scope.order_number = $stateParams.order_number;
    $scope.location = window.location;
    $scope.$on('suggest.import.changed', function (event, data) {
      $scope.importBtns = data.btns;
      $scope.title = data.title;
    });

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

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('AuthService', function (user) {
      $scope.user = user;
    });
    $scope.getAreaOrderDetail();

  }]);