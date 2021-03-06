/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderSuggestCtrl', ['$scope', '$state', '$rootScope', 'AuthService',function ($scope, $state, $rootScope,AuthService) {
  $scope.location = window.location;
  $scope.importBtns = [];
  $scope.info={
    title:''
  };
  $rootScope.$on('suggest.import.changed', function (event, data) {
    $scope.importBtns = data.btns;
    $scope.info.title = data.title;
  });
  $scope.user = AuthService.getUser() || {};
  $scope.signOut = function () {
    AuthService.signOut();
  };

}]);