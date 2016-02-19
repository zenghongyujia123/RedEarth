/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaSuggestResultCtrl', ['$scope', '$rootScope', 'AreaOrderService',
  function ($scope, $rootScope, AreaOrderService) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单',
      btns: [
        {
          text: '提交'
        }
      ]
    });
    $scope.orders = [];
    $scope.getAreaSuggestOrder = function () {
      AreaOrderService.getAreaSuggestOrder().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.orders = data;
        }
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getAreaSuggestOrder();
  }]);