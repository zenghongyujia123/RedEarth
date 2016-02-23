/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SettingPasswordCtrl', ['$scope', 'UserService', function ($scope, UserService) {
  $scope.info = {
    old_password: '',
    new_password: '',
    re_password: ''
  };


  $scope.changePassword = function () {
    if (!$scope.info.old_password) {
     return alert('请输入原始密码');
    }
    if (!$scope.info.new_password) {
      return alert('请输入新密码');
    }
    if (!$scope.info.re_password) {
      return alert('请确认密码');
    }

    if ($scope.info.re_password !== $scope.info.new_password) {
      return alert('确认密码不一致');
    }

    UserService.changePassword($scope.info.old_password, $scope.info.new_password).then(function (data) {
      console.log(data);
      if (data && !data.err) {
        alert('修改成功');
        $scope.info = {
          old_password: '',
          new_password: '',
          re_password: ''
        };
      }
    }, function (data) {
      console.log(data);
    });
  }
}]);