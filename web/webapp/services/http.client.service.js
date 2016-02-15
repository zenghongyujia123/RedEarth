/**
 * Created by zenghong on 16/1/21.
 */
/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('HttpService', ['$http', '$q', function ($http, $q) {
  return {
    post: function (url, params) {
      var q = $q.defer();
      $http.post(url, params)
        .success(function (data) {
          q.resolve(data);
        })
        .error(function (data) {
          q.reject(data);
        });
      return q.promise;
    },
    get: function (url, params) {
      var q = $q.defer();
      $http.get(url, {params: params})
        .success(function (data) {
          q.resolve(data);
        })
        .error(function (data) {
          q.reject(data);
        });
      return q.promise;
    }
  };
}]);