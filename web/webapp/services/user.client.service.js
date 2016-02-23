/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('UserService', ['HttpService', function (HttpService) {
  return {
    getMe: function () {
      return HttpService.get('/webapp/user/me', {});
    },
    getLog: function () {
      return HttpService.get('/webapp/user/log', {});
    },
    changePassword: function (oldP, newP) {
      return HttpService.post('/webapp/user/password', {old_p: oldP, new_p: newP});
    }
  };
}]);