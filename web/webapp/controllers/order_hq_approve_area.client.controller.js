/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderHqApproveAreaCtrl', ['$scope', '$state', '$stateParams', 'AuthService', 'AreaOrderService',
  function ($scope, $state, $stateParams, AuthService, AreaOrderService) {
    $scope.importBtns = [];
    $scope.order_number = $stateParams.order_number;
    $scope.location = window.location;
    $scope.$on('suggest.import.changed', function (event, data) {
      $scope.importBtns = data.btns;
      $scope.title;
    });

    $scope.orders = [];
    $scope.getAreaOrderDetail = function () {
      AreaOrderService.getAreaOrderDetail($scope.order_number).then(function (data) {
        if (data && !data.err) {
          $scope.orders = data;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('AuthService', function (user) {
      $scope.user = user;
    });
    $scope.getAreaOrderDetail();


    $scope.approveAreaOrder = function (o) {
      AreaOrderService.approveAreaOrder(o).then(function (data) {
        if (data && !data.err) {
          o.status = data.status;
          alert('ok');
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };

    $scope.approveAreaOrders = function () {
      var sales = [];

      $scope.orders.forEach(function (sale) {
        sales.push({
          _id: sale._id,
          order_number: sale.order_number,
          D02_approve: sale.D02_approve,
          D03_approve: sale.D03_approve,
          D04_approve: sale.D04_approve
        });
      });
      var final_sales = [];
      for (var i = 0, len = sales.length; i < len; i += 40) {
        final_sales.push(sales.slice(i, i + 40));
      }

      upload(final_sales, 0);
    };


    function upload(orders, i) {
      AreaOrderService.approveAreaOrders(orders[i++])
        .then(function (data) {
          console.log(data);
          if (orders[i]) {
            upload(orders, i);
          }
          else {
            $state.go('order_hq_approve_area', {}, {reload: true});
          }
        }, function (err) {
          console.log(err);
        });
    }
  }]);