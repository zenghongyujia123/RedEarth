/**
 * Created by zenghong on 16/1/26.
 */
angular.module('agilesales-web').factory('ShopService', ['HttpService', function (HttpService) {
  return {
    uploadMultiShops: function (shops) {
      return HttpService.post('/webapp/shop/multi/upload', {shops: shops});
    },
    getShops: function () {
      return HttpService.get('/webapp/shops', {});
    }
  };
}]);