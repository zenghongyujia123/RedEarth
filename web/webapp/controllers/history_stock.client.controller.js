/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistoryStockCtrl', ['$scope', 'AreaOrderService',
  function ($scope, AreaOrderService) {
    $scope.$emit('suggest.import.changed', {
      title: '历史数据',
      btns: [
        {
          text: '导入历史库存',
          clickCallback: importClickCallback
        }
      ]
    });

    function importClickCallback(){}


    $scope.sales = [];

    $scope.getHistorySales = function () {
      AreaOrderService.getHistorySales().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.sales = data;
        }
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHistorySales();

    function importClickCallback() {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品条码'},
        {key: 'C1', value: 'SAP CODE'},
        {key: 'D1', value: '产品名称'},
        {key: 'E1', value: '规格'},
        {key: 'F1', value: '品类'},
        {key: 'G1', value: '系列名称'},
        {key: 'H1', value: '中分类名称'},
        {key: 'I1', value: '小分类名称'},
        {key: 'J1', value: '销售价格'},
        {key: 'K1', value: '晋颖成本价'},
        {key: 'L1', value: '开始销售日期'},
        {key: 'M1', value: '停止销售日期'},
        {key: 'N1', value: '保质期'},
        {key: 'O1', value: '销售单位'},
        {key: 'P1', value: '工厂名称'},
        {key: 'Q1', value: '工厂MOQ'},
        {key: 'R1', value: 'MOQ备注'},
        {key: 'S1', value: '工厂交货週期'},
        {key: 'T1', value: '是否明星产品'},
        {key: 'U1', value: 'TOP SKU排名'},
        {key: 'V1', value: 'ABC分类'},
        {key: 'W1', value: 'ABC类说明'},
        {key: 'X1', value: 'ABC类別%'},
        {key: 'Y1', value: '柜枱销售參考(月)'},
        {key: 'Z1', value: '柜枱安全库存(月)'},
        {key: 'AA1', value: '柜枱最少订量'},
        {key: 'AB1', value: '地区销售參考(月)'},
        {key: 'AC1', value: '地区安全库存(月)'},
        {key: 'AD1', value: '地区修改订单超出% (需颜色提醒)'},
        {key: 'AE1', value: '地区修改订单超出% (需备注及确认)'},
        {key: 'AF1', value: '总部销售參考(月)'},
        {key: 'AG1', value: '总部安全库存(月)'},
        {key: 'AH1', value: '审批地区修改订单超出% (需颜色提醒)'},
        {key: 'AI1', value: '审批地区修改订单超出% (需上级确认)'},
        {key: 'AJ1', value: '订量达MOQ之%必采购'},
        {key: 'AK1', value: '是否有地区特性'},
        {key: 'AL1', value: '地区特性加20%'},
        {key: 'AM1', value: '是否有季節性'},
        {key: 'AN1', value: '季節性加20%'},
        {key: 'AO1', value: '柜枱促销活动月份'},
        {key: 'AP1', value: '柜枱促销活动比率'},
        {key: 'AQ1', value: '字段1'},
        {key: 'AR1', value: '字段2'},
        {key: 'AS1', value: '字段3'},
        {key: 'AT1', value: '字段4'},
        {key: 'AU1', value: '字段5'}
      ];

      function upload(products, i) {
        ProductService.importProducts(products[i++])
          .then(function (data) {
            console.log(data);
            if (products[i]) {
              upload(products, i);
            }
          }, function (err) {
            console.log(err);
          });
      }

      $scope.importProducts = function (products) {
        var i = 0;
        upload(products, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传产品资料',
        contents: [{
          key: '请选择需要上传产品资料文件',
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '产品数据'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            var p = {};
            p.product_number = item['SKU编码'];
            p.product_barcode = item['产品条码'];
            p.sap_code = item['SAP CODE'];
            p.product_name = item['产品名称'];
            p.specification = item['规格'];
            p.category = item['品类'];
            p.series_name = item['系列名称'];
            p.mid_classify = item['中分类名称'];
            p.small_classify = item['小分类名称'];
            p.sales_price = item['销售价格'];
            p.jinyi_cost = item['晋颖成本价'];
            p.start_sales_date = item['开始销售日期'];
            p.end_sales_date = item['停止销售日期'];
            p.expiration_date = item['保质期'];
            p.sales_unit = item['销售单位'];
            p.factory_name = item['工厂名称'];
            p.factory_moq = item['工厂MOQ'];
            p.moq_remark = item['MOQ备注'];
            p.factory_delivery_cycle = item['工厂交货週期'];
            p.is_star_product = item['是否明星产品'];
            p.top_sku_ranking = item['TOP SKU排名'];
            p.abc_classify = item['ABC分类'];
            p.abc_classify_explain = item['ABC类说明'];
            p.abc_category = item['ABC类別%'];
            p.desk_sales_reference = item['柜枱销售參考(月)'];
            p.desk_minimum_order_count = item['柜枱安全库存(月)'];
            p.desk_safe_stock = item['柜枱最少订量'];
            p.area_sales_reference = item['地区销售參考(月)'];
            p.area_safe_stock = item['地区安全库存(月)'];
            p.area_modify_exceed = item['地区修改订单超出% (需颜色提醒)'];
            p.area_modify_exceed_remark = item['地区修改订单超出% (需备注及确认)'];
            p.hq_sales_reference = item['总部销售參考(月)'];
            p.hq_safe_stock = item['总部安全库存(月)'];
            p.approval_modify_exceed = item['审批地区修改订单超出% (需颜色提醒)'];
            p.approval_modify_exceed_remark = item['审批地区修改订单超出% (需上级确认)'];
            p.order_count_exceed_moq = item['订量达MOQ之%必采购'];
            p.is_area_speciality = item['是否有地区特性'];
            p.area_speciality_more = item['地区特性加20%'];
            p.is_season_speciality = item['是否有季節性'];
            p.season_speciality_more = item['季節性加20%'];
            p.desk_promotion_month = item['柜枱促销活动月份'];
            p.desk_promotion_rate = item['柜枱促销活动比率'];
            p.field_1 = item['字段1'];
            p.field_2 = item['字段2'];
            p.field_3 = item['字段3'];
            p.field_4 = item['字段4'];
            p.field_5 = item['字段5'];
            result.push(p);
          });
          var products = [];
          for (var i = 0, len = result.length; i < len; i += 50) {
            products.push(result.slice(i, i + 50));
          }
          if (products.length > 0) {
            $scope.importProducts(products);
          }
          console.log(data);
          console.log(products);
        }
      });
    }

  }]);