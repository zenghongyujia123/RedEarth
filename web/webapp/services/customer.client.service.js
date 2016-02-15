/**
 * Created by zenghong on 16/1/22.
 */
angular.module('agilesales-web').factory('CustomerService', ['HttpService', function (HttpService) {
  return {
    uploadMultiCustomers: function (customers) {
      return HttpService.post('/webapp/customer/multi/upload', {customers: customers});
    },
    updateCustomerCard: function (customer_id, card_id) {
      return HttpService.post('/webapp/customers/card/update', {customer_id: customer_id, card_id: card_id});
    },
    getCustomers: function () {
      return HttpService.get('/webapp/customers', {});
    }
  };
}]);