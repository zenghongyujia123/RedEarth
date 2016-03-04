angular.module('agilesales-web').directive('zzFloatLeft', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',
    replace: false,
    controller: function ($scope, $element) {
      var parent = $element.parents('.re-table');
      parent.scroll(function () {
        $element.css({left: parent.scrollLeft() + 'px'});
      });
    }
  }
}]);