/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqWholeSalerCtrl', ['$scope', '$rootScope', function ($scope, rootScope) {
  $scope.$emit('suggest.import.changed',{
    title:'建议订单',
    btns:[
      {
        text:'导入批发商订单'
      }
    ]
  });
}]);