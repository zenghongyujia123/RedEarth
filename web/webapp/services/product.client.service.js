/**
 * Created by zenghong on 16/1/26.
 */
angular.module('agilesales-web').factory('ProductService', ['HttpService', function (HttpService) {
  return {
    uploadMultiProducts: function (products) {
      return HttpService.post('/webapp/product/multi/upload', {products: products});
    },
    getProducts: function () {
      return HttpService.get('/webapp/products', {});
    }
  };
}]);