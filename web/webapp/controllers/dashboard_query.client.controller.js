/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('DashboardQueryCtrl', ['$scope', 'HqOrderService', 'AreaOrderService', 'ExcelReaderService',
  function ($scope, HqOrderService, AreaOrderService, ExcelReaderService) {
    $scope.curName = '总部';
    $scope.reports = [];
    $scope.monthInfo = {
      month: getMonth(-1),
      show: false,
      months: []
    };

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
      var nextMonth = $scope.monthInfo.months[$scope.monthInfo.months.indexOf($scope.monthInfo.month) - 1];

      AreaOrderService.getAreaReports($scope.monthInfo.month, nextMonth, name).then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.reports = data;
        }
      }, function (data) {
        console.log(data);
      });
    };

    $scope.getHqReports = function (name) {
      var nextMonth = $scope.monthInfo.months[$scope.monthInfo.months.indexOf($scope.monthInfo.month) - 1];

      HqOrderService.getHqReports($scope.monthInfo.month,nextMonth).then(function (data) {
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
      if (sale.last_month_sales_count_0 === 0) {
        return 0;
      }

      return parseInt((sale.last_month_sales_count_0 - sale.next_month_sales_forecast_0) * 100 / sale.last_month_sales_count_0);
    };

    $scope.getAreaOrderDiff = function (sale) {
      if (sale.D01_approve === 0) {
        return 0;
      }
      return parseInt((sale.D01_approve - sale.system_suggest_count) * 100 / sale.D01_approve);
    };

    $scope.getAreaSaleDiff = function (sale) {
      if (sale.last_month_sales_count_0 === 0) {
        return 0;
      }
      return parseInt((sale.last_month_sales_count_0 - sale.next_month_sales_forecast_0) * 100 / sale.last_month_sales_count_0);
    };

    $scope.exportReports = function () {
      $scope.exportExcel();
    };

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows;

      if ($scope.curName === '总部') {
        rows = [[
          '品类',
          '中分类名称',
          '系列名称',
          '产品名称',
          '产品条码',
          'SKU编码',
          'ABC分类',
          '总部销售预测',
          '系统建议订单',
          '总部订单MOQ建议数',
          '实际订货数',
          '销售',
          '销售差异比',
          '订单差异'
        ]];
        $scope.reports.forEach(function (s) {
          rows.push([
            s.product.category,
            s.product.mid_classify,
            s.product.series_name,
            s.product.product_name,
            s.product.product_barcode,
            s.product_number,
            s.product.abc_classify,
            s.next_month_sales_forecast_0,
            s.system_suggest_count,
            s.final_system_suggest_count,
            s.final_purchased_count,
            s.last_month_sales_count_0,
            $scope.getHqSaleDiff(s) + '%',
            $scope.getHqOrderDiff(s) + '%'
          ]);
        });
      }
      else {
        rows = [[
          '品类',
          '中分类名称',
          '系列名称',
          '产品名称',
          '产品条码',
          'SKU编码',
          'ABC分类',
          '地区销售预测',
          '系统建议订货数',
          '实际订货数',
          '销售',
          '销售差异比',
          '订单差异比'
        ]];
        $scope.reports.forEach(function (s) {
          rows.push([
            s.product.category,
            s.product.mid_classify,
            s.product.series_name,
            s.product.product_name,
            s.product.product_barcode,
            s.product_number,
            s.product.abc_classify,
            s.next_month_sales_forecast_0,
            s.system_suggest_count,
            s.D01_approve,
            s.last_month_sales_count_0,
            $scope.getAreaSaleDiff(s) + '%',
            $scope.getAreaOrderDiff(s) + '%'
          ]);
        });
      }

      execlReader.exportExcel(rows);
    };


    $scope.showMonth = function () {
      $scope.monthInfo.show = true;
    };

    $scope.hideMonth = function (month, event) {
      event.stopPropagation();
      $scope.monthInfo.month = month;
      $scope.monthInfo.show = false;
      if ($scope.curName === '总部') {
        $scope.getHqReports();
      }
      else {
        $scope.getAreaReports($scope.curName);
      }
    };

    function initMonth() {
      for (var i = 0; i < 120; i++) {
        $scope.monthInfo.months.push(getMonth(-i));
      }
    }

    initMonth();
    function getMonth(index) {
      return moment().add(index, 'month').format('YYYYMM');
    }

    $scope.clickBtn('总部');
  }]);