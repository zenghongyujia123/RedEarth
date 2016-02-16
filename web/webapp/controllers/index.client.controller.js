/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('IndexCtrl', ['$scope', '$rootScope', 'AuthService', function ($scope, $rootScope, AuthService) {
  $scope.location = window.location;
  $scope.user = AuthService.getUser() || {};
  $scope.signOut = function () {
    AuthService.signOut();
  };

  $rootScope.$on('header.text.change', function (event, data) {
    $scope.headers = data;
  });

  AuthService.onUserUpdated('IndexCtrl', function (user) {
    $scope.user = user;
  });

  $scope.headers = [
    {
      text: '快速开始',
      location:'#/'
    },
    {
      text: '建议订单'
    },
    {
      text: '查看订单'
    },
    {
      text: '历史数据'
    },
    {
      text: '系统设置'
    },
    {
      text: '查看报表'
    }
  ]
}]);