/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaLastMonthCtrl', ['$scope', '$rootScope', 'AreaOrderService',
  function ($scope, rootScope, AreaOrderService) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单',
      btns: [
        {
          text: '导入上月销售,库存,在途'
        }
      ]
    });

    $scope.getSalesByArea =function(){
      AreaOrderService.getSalesByArea().then(function(data){
        console.log(data);
      },function(data){
        console.log(data);
      });
    };

    $scope.getSalesByArea();
  }]);