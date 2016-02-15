/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agDialogConfirm', ['$rootScope',function ($rootScope) {
  return {
    restrict: 'AE',
    templateUrl: 'directives/dialog_confirm/dialog_confirm.client.view.html',
    replace: true,
    scope: {},
    link: function ($scope, $element, $attrs) {
      $scope.info = {
        title: '',
        content:'',
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
      $rootScope.$on('show.dialogConfirm', function (event, data) {
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