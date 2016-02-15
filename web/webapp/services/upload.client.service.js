/**
 * Created by zenghong on 16/1/26.
 */
angular.module('agilesales-web').factory('UploadService', ['HttpService', function (HttpService) {
  return {
    upload: function (url, data) {
      return HttpService.post(url, data);
    }
  };
}]);