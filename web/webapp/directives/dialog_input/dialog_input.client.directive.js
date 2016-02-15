/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agDialogInput', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'AE',
    templateUrl: 'directives/dialog_input/dialog_input.client.view.html',
    replace: true,
    scope: {},
    link: function ($scope, $element, $attrs) {
      $scope.info = {
        title: '',
        contents: [{
          key: '请输入拜访卡名称',
          tip: '点击输入名称',
          value: ''
        }],
        color: 'blue'
      };

      $scope.show = function () {
        $element.addClass('show');
      };
      $scope.hide = function () {
        $element.removeClass('show');
      };
      $scope.submit = function () {
        $element.removeClass('show');
        if ($scope.info.callback) {
          $scope.info.callback($scope.info);
        }
      };
      $rootScope.$on('show.dialogInput', function (event, data) {
        setTheme(data);
        $scope.show();
      });

      function setTheme(info) {
        $element.find('.ag-dialog-panel').removeClass($scope.info.color).addClass(info.color);
        $scope.info = info;
      }
    }
  }
}]);