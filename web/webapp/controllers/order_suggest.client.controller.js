/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderSuggestCtrl', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {
  $scope.location = window.location;
  $scope.importBtns = [];
  $rootScope.$on('suggest.import.changed', function (event, data) {
    $scope.importBtns = data;
  });
}]);