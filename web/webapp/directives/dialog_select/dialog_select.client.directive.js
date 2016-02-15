/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agDialogSelect', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'AE',
    templateUrl: 'directives/dialog_select/dialog_select.client.view.html',
    replace: true,
    scope: {},
    link: function ($scope, $element, $attrs) {
      $scope.options = [];
      $scope.info = {
        title: '',
        contents: [{
          key: '请输入拜访卡名称',
          value: '点击输入名称'
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
        $scope.info.callback($scope.info);
      };
      $scope.toggleOptions = function (index) {
        if ($element.find('.ag-row-option-container').eq(index).hasClass('show')) {
          $scope.hideOptions(index);
        }
        else {
          $scope.showOptions(index);
        }
      };

      $scope.selectOption = function (content, option) {
        content.value = option;
      };

      $rootScope.$on('show.dialogSelect', function (event, data) {
        setTheme(data);
        $scope.show();
      });
      function setTheme(info) {
        $element.find('.ag-dialog-panel').removeClass($scope.info.color).addClass(info.color);
        $scope.info = info;
      }

      $scope.showOptions = function (index) {
        $element.find('.ag-row-option-container').eq(index).addClass('show');
      };
      $scope.hideOptions = function (index) {
        $element.find('.ag-row-option-container').eq(index).removeClass('show');
      }
    }
  }
}]);