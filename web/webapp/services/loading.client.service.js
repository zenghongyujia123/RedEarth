/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('Loading', ['$rootScope', function ($rootScope) {
  return {
    show: function () {
      $rootScope.$broadcast('loading.show');
    },
    hide: function () {
      $rootScope.$broadcast('loading.hide');
    }
  };
}]);