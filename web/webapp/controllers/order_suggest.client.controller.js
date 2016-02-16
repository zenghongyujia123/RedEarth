/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderSuggestCtrl',['$scope','$state', function ($scope,$state) {
  $state.go('order_suggest.suggest_home');
}]);