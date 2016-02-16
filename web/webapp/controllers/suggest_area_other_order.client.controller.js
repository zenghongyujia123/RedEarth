/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaOtherOrderCtrl', ['$scope', '$rootScope', function ($scope, rootScope) {
  $scope.$emit('suggest.import.changed',[
    {
      text:'上传批发订单'
    },
    {
      text:'上传试用订单'
    },
    {
      text:'上传陈列订单'
    }
  ])
}]);