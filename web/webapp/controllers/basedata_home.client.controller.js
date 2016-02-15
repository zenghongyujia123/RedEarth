/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('BasedataHomeCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.showUpload = function () {
    $rootScope.$broadcast($scope.getUploadType());
  };

  $scope.getDataType = function () {
    var location = window.location.hash;
    switch (location) {
      case '#/basedata_home/basedata_customer':
        return '客户';
      case '#/basedata_home/basedata_area':
        return '地区';
      case '#/basedata_home/basedata_people':
        return '人员';
      case '#/basedata_home/basedata_sku':
        return 'SKU';
      case '#/basedata_home/basedata_shop':
        return '门店';
    }
  };

  $scope.getUploadType = function () {
    var location = window.location.hash;
    switch (location) {
      case '#/basedata_home/basedata_customer':
        return 'show.importCustomers';
      case '#/basedata_home/basedata_area':
        return 'show.importAreas';
      case '#/basedata_home/basedata_people':
        return 'show.importPeoples';
      case '#/basedata_home/basedata_sku':
        return 'show.importProducts';
      case '#/basedata_home/basedata_shop':
        return 'show.importShops';
    }
  };


  $scope.location = window.location;
  $scope.isMenuClose = false;
  $scope.toggleMenu = function () {
    $scope.isMenuClose = !$scope.isMenuClose;
  }
}]);