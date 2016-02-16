/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaLastMonthCtrl', ['$scope', '$rootScope', function ($scope, rootScope) {
  $scope.$emit('suggest.import.changed',[
    {
      text:'导入上月销售,库存,在途'
    }
  ])
}]);