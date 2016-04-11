/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('DashboardQueryCtrl', ['$scope', 'HqOrderService', 'AreaOrderService', function ($scope, HqOrderService, AreaOrderService) {
  $scope.curName = '总部';
  $scope.reports = [];
  $scope.clickBtn = function (name) {
    $scope.curName = name;
    if (name === '总部') {
      $scope.getHqReports();
    }
    else {
      $scope.getAreaReports(name);
    }
  };

  $scope.getAreaReports = function (name) {
    AreaOrderService.getAreaReports(name).then(function (data) {
      console.log(data);
      if (data && !data.err) {
        $scope.reports = data;
      }
    }, function (data) {
      console.log(data);
    });
  };

  $scope.getHqReports = function (name) {
    HqOrderService.getHqReports(name).then(function (data) {
      console.log(data);
      if (data && !data.err) {
        $scope.reports = data;
      }
    }, function (data) {
      console.log(data);
    });
  };

  $scope.getHqOrderDiff = function (sale) {
    if (sale.final_purchased_count === 0) {
      return 0;
    }
    return parseInt((sale.final_purchased_count - sale.system_suggest_count) * 100 / sale.final_purchased_count);
  };

  $scope.getHqSaleDiff = function (sale) {
    if (sale.genuine_goods === 0) {
      return 0;
    }

    return parseInt((sale.genuine_goods - sale.next_month_sales_forecast_0) * 100 / sale.genuine_goods);
  };

  $scope.getAreaOrderDiff = function (sale) {
    if (sale.D01_approve === 0) {
      return 0;
    }
    return parseInt((sale.D01_approve - sale.system_suggest_count) * 100 / sale.D01_approve);
  };

  $scope.getAreaSaleDiff = function (sale) {
    if (sale.last_month_sales_count_1 === 0) {
      return 0;
    }
    return parseInt((sale.last_month_sales_count_1 - sale.next_month_sales_forecast_0) * 100 / sale.last_month_sales_count_1);
  };

  $scope.clickBtn('总部');
}]);