/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqSuggestResultCtrl', ['$scope', '$rootScope', 'HqOrderService',
  function ($scope, $rootScope,HqOrderService) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单',
      btns: [
        {
          text: '提交'
        }
      ]
    });
    $scope.suggests = [];
    $scope.getHqSuggestOrders = function () {
      HqOrderService.getHqSuggestOrders().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.suggests = data;
        }
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHqSuggestOrders();
  }]);