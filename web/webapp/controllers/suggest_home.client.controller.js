/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHomeCtrl', ['$scope', 'AuthService',function ($scope,AuthService) {
  $scope.$emit('suggest.import.changed', {
    title: '建议订单',
    btns: []
  });
  $scope.user = AuthService.getUser() || {};
  $scope.signOut = function () {
    AuthService.signOut();
  };

}]);