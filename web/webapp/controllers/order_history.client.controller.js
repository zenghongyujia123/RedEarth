/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderHistoryCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
  $scope.importBtns = [];
  $scope.location = window.location;
  $scope.$on('suggest.import.changed', function (event, data) {
    $scope.importBtns = data.btns;
    $scope.title = data.title;
  });

  $scope.user = AuthService.getUser() || {};
  AuthService.onUserUpdated('AuthService', function (user) {
    $scope.user = user;
  });

}]);