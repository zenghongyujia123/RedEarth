angular.module('agilesales-web').directive('zzLoading', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',

    template: '<div class="zz-loading-layer">' +
    '<div class="zz-loading-info"> ' +
    '<img ng-src="images/load.gif"/>' +
    ' </div> </div>',
    replace: true,
    controller: function ($scope, $element) {
      $rootScope.$on('loading.hide',function(){
        $element.hide();
      });
      $rootScope.$on('loading.show',function(){
        $element.show();
      });
    }
  }
}]);