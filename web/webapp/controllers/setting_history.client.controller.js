/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SettingHistoryCtrl', ['$scope', 'UserService', function ($scope, UserService) {
  $scope.logs = [];
  $scope.getLog = function () {
    UserService.getLog().then(function (data) {
      console.log(data);
      if (data && !data.err) {
        $scope.logs = data;
      }
    }, function (data) {
      console.log(data);
    });
  };
  $scope.getLog();
}]);