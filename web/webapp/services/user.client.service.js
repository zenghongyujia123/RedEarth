/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('UserService', [ 'HttpService', function (HttpService) {
  return {
    getMe: function () {
      return HttpService.get('/webapp/user/me', {});
    }
  };
}]);