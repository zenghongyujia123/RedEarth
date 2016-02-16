/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HomeCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
  $scope.user = AuthService.getUser() || {};
  AuthService.onUserUpdated('AuthService', function (user) {
    $scope.user = user;
  });
}]);