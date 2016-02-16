/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHomeCtrl', ['$scope', function ($scope) {
  $scope.$emit('suggest.import.changed', {
    title: '建议订单',
    btns: []
  });

}]);