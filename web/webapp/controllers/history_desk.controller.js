/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistoryDeskCtrl', ['$scope', function ($scope) {
  $scope.$emit('suggest.import.changed', {
    title: '历史数据',
    btns: [
      {
        text: '导入柜台资料',
        clickCallback: importClickCallback
      }
    ]
  });

  function importClickCallback() {
  }


}]);