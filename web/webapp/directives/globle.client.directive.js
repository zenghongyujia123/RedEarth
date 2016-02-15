/**
 * Created by zenghong on 16/1/19.
 */
angular.module('agilesales-web').directive('agGlobalEvent', ['$window', function ($window) {
  return {
    restrict: 'AE',
    link: function ($scope, $element, $attrs) {
      $(window).resize(function () {
        $element.height($(this).height()-60);
      }).resize();
    }
  }
}]);