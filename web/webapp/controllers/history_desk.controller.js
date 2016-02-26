/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistoryDeskCtrl', ['$scope', 'ProductService', 'Loading',
  function ($scope, ProductService, Loading) {
    $scope.$emit('suggest.import.changed', {
      title: '历史数据',
      btns: []
    });

    $scope.desks = [];

    function importClickCallback() {

    }

    $scope.getDesk = function () {
      Loading.show();
      ProductService.getDesks().then(function (data) {
        if (data && !data.err) {
          $scope.desks = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };
    $scope.getDesk();

  }]);