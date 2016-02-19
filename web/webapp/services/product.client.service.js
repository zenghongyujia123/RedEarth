/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('ProductService', ['HttpService', function (HttpService) {
  return {
    getProducts: function () {
      return HttpService.get('/webapp/product', {});
    },
    importProducts: function (products) {
      return HttpService.post('/webapp/product/import', {products: products});
    }
  };
}]);