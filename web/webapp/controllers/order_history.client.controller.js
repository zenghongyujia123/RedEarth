/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderHistoryCtrl', ['$scope', function ($scope) {
  $scope.importBtns = [];
  $scope.location = window.location;
  $scope.$on('suggest.import.changed', function (event,data) {
    $scope.importBtns = data.btns;
    $scope.title = data.title;
  });
}]);