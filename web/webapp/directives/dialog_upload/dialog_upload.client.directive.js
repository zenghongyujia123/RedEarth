/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agDialogUpload', ['$rootScope', 'ExcelReaderService', function ($rootScope, ExcelReaderService) {
  return {
    restrict: 'AE',
    templateUrl: 'directives/dialog_upload/dialog_upload.client.view.html',
    replace: true,
    scope: {},
    link: function ($scope, $element, $attrs) {
      $scope.info = {
        title: '',
        contents: [{
          key: '请输入拜访卡名称',
          value: '点击输入名称'
        }],
        color: 'blue',
        type: 'execel',
        headers: [
          {key: 'A1', value: '大区'},
          {key: 'B1', value: '省区'},
          {key: 'C1', value: '办事处'}
        ]
      };

      $scope.show = function () {
        $element.addClass('show');
      };
      $scope.hide = function () {
        $element.removeClass('show');
      };
      $scope.submit = function () {
        $element.removeClass('show');
      };
      $rootScope.$on('show.dialogUpload', function (event, data) {
        setTheme(data);
        $scope.show();
      });

      $scope.handleFile = function (ele) {
        var excelReader = ExcelReaderService.getReader();

        excelReader.getWorkSheet(ele, function (err, excelSheet) {
          excelReader.checkHeader(excelSheet, $scope.info.headers, function (isOurTemplate) {
            if (!isOurTemplate) {
              var a = isOurTemplate;
            }
            excelReader.getSheetData(excelSheet, $scope.info.headers, function (err, sheetData) {
              if ($scope.info.callback) {
                $scope.info.callback(sheetData);
              }
              $scope.hide();
            });
          });
        });
      };

      function setTheme(info) {
        $element.find('.ag-dialog-panel').removeClass($scope.info.color).addClass(info.color);
        $scope.info = info;
      }
    }
  }
}]);