/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('BasedataSkuCtrl', ['$scope', '$rootScope', 'ProductService', function ($scope, $rootScope, ProductService) {
  $scope.products = [];
  $scope.headers = [
    '产品编码', '产品条码', '产品名称',
    '产品简称', '品牌', '系列',
    '大类', '小类', '包装单位',
    '规格', '系统供价', '价格',
    '产品等级', '是否新品', '是否重点产品',
    '是否档期促销品'
  ];

  function upload(products, i) {
    ProductService.uploadMultiProducts(products[i++])
      .then(function (data) {
        console.log(data);
        if (products[i]) {
          upload(products, i);
        }
      }, function (err) {
        console.log(err);
      });
  }

  $scope.uploadMultiProducts = function (products) {
    var i = 0;
    upload(products, i);
  };

  $scope.getProducts = function () {
    ProductService.getProducts().then(function (data) {
      if (data && !data.err) {
        $scope.products = data;
      }
      console.log(data);
    }, function (data) {
      console.log(data);
    });
  };

  $scope.getProducts();

  $rootScope.$on('show.importProducts', function () {
    var headers = [
      {key: 'A1', value: '产品编码'},
      {key: 'B1', value: '产品条码'},
      {key: 'C1', value: '产品名称'},
      {key: 'D1', value: '产品简称'},
      {key: 'E1', value: '品牌'},
      {key: 'F1', value: '系列'},
      {key: 'G1', value: '大类'},
      {key: 'H1', value: '小类'},
      {key: 'I1', value: '包装单位'},
      {key: 'J1', value: '规格'},
      {key: 'K1', value: '系统供价'},
      {key: 'L1', value: '价格'},
      {key: 'M1', value: '产品等级'},
      {key: 'N1', value: '是否新品'},
      {key: 'O1', value: '是否重点产品'},
      {key: 'P1', value: '是否档期促销品'}
    ];

    $rootScope.$broadcast('show.dialogUpload', {
      title: '上传产品',
      contents: [{
        key: '请选择需要上传的产品文件',
        value: '点击选择文件',
        tip: '点击选择文件'
      }],
      color: 'blue',
      headers: headers,
      callback: function (data) {
        var obj = {};
        var arr = [];
        data.forEach(function (item) {
          if (!obj[item['产品名称']]) {
            obj[item['产品名称']] = {};
            $scope.headers.forEach(function (header) {
              obj[item['产品名称']][header] = item[header];
            });
          }
        });

        var result = [];

        for (var p in obj) {
          var item = {};
          for (var i in obj[p]) {
            switch (i) {
              case '产品编码':
                item.number = obj[p][i];
                break;
              case '产品条码':
                item.barcode = obj[p][i];
                break;
              case '产品名称':
                item.name = obj[p][i];
                break;
              case '产品简称':
                item.short_name = obj[p][i];
                break;
              case '品牌':
                item.brand = obj[p][i];
                break;
              case '系列':
                item.series = obj[p][i];
                break;
              case '大类':
                item.large_type = obj[p][i];
                break;
              case '小类':
                item.small_type = obj[p][i];
                break;
              case '包装单位':
                item.package_unit = obj[p][i];
                break;
              case '规格':
                item.specification = obj[p][i];
                break;
              case '系统供价':
                item.system_price = obj[p][i];
                break;
              case '价格':
                item.price = obj[p][i];
                break;
              case '产品等级':
                item.product_level = obj[p][i];
                break;
              case '是否新品':
                item.is_new = obj[p][i];
                break;
              case '是否重点产品':
                item.is_key = obj[p][i];
                break;
              case '是否档期促销品':
                item.is_promotion = obj[p][i];
                break;
            }

          }
          result.push(item);
        }
        var products = [];
        for (var i = 0, len = result.length; i < len; i += 100) {
          products.push(result.slice(i, i + 100));
        }

        console.log(obj);
        console.log(result);
        console.log(products);
        $scope.uploadMultiProducts(products);
      }
    });


  });


}]);