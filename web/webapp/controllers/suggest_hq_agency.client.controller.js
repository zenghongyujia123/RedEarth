/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqAgencyCtrl', ['$scope', '$rootScope', 'AuthService',
  function ($scope, rootScope, AuthService) {
    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('SuggestHqEcommerceCtrl', function (user) {
      $scope.user = user;
      btnsChange();
    });
    btnsChange();
    function btnsChange() {
      var btns = [];
      if ($scope.user.show_name === '总部经销商部') {
        btns.push({
          text: '导入经销商订单'
        });
      }
      $scope.$emit('suggest.import.changed', {
        title: '建议订单',
        btns: btns
      });
    }
  }]);