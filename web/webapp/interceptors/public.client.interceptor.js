angular.module('agilesales-web').factory('PublicInterceptor', ['AuthService', function (AuthService) {
  return {
    'request': function (req) {
      req.data = req.data ? req.data : {};
      req.data.access_token = AuthService.getToken();
      req.params = req.params ? req.params : {};
      req.params.access_token = AuthService.getToken();
      req.params.no_cache =new Date().getTime();
      return req;
    },
    'response': function (resp) {
      return resp;
    },
    'requestError': function (rejection) {
      return rejection;
    },
    'responseError': function (rejection) {
      return rejection;
    }
  }
}]);

