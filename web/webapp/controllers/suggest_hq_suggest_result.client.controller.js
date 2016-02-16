/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqSuggestResultCtrl',['$scope', '$rootScope', function ($scope, rootScope) {
  $scope.$emit('suggest.import.changed',[
    {
      text:'提交'
    }
  ])
}]);