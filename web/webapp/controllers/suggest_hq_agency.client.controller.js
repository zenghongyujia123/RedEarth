/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqAgencyCtrl',['$scope', '$rootScope', function ($scope, rootScope) {
  $scope.$emit('suggest.import.changed',[
    {
      text:'导入批发商订单'
    }
  ])
}]);