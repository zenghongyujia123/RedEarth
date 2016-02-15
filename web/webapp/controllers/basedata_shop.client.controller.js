/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('BasedataShopCtrl', ['$scope', '$rootScope', 'ShopService', function ($scope, $rootScope, ShopService) {
  $scope.shops = [];
  $scope.headers = [
    '门店编码', '门店名称', '门店等级',
    '所属区域', '所属城市', '地址',
    '渠道类型', '门店类型', '渠道',
    '所属客户', '业务员姓名', '业务员工号', '促销员工号', '促销员姓名',
    '月拜访频次', '门店状态', '品牌', '经度', '纬度'
  ];


  $scope.getPeoples = function () {
    ShopService.getShops().then(function (data) {
      console.log(data);
      if (data && !data.err) {
        $scope.shops = data;
      }
    }, function (data) {
      console.log(data);
    });
  };

  $scope.getPeoples();

  $rootScope.$on('show.importShops', function () {
    var headers = [
      {key: 'A1', value: '门店编码'},
      {key: 'B1', value: '门店名称'},
      {key: 'C1', value: '门店等级'},
      {key: 'D1', value: '所属区域'},
      {key: 'E1', value: '所属城市'},
      {key: 'F1', value: '地址'},
      {key: 'G1', value: '渠道类型'},
      {key: 'H1', value: '门店类型'},
      {key: 'I1', value: '渠道'},
      {key: 'J1', value: '所属客户'},
      {key: 'K1', value: '业务员姓名'},
      {key: 'L1', value: '业务员工号'},
      {key: 'M1', value: '促销员工号'},
      {key: 'N1', value: '促销员姓名'},
      {key: 'O1', value: '月拜访频次'},
      {key: 'P1', value: '门店状态'},
      {key: 'Q1', value: '品牌'},
      {key: 'R1', value: '经度'},
      {key: 'S1', value: '纬度'}
    ];

    function upload(shops, i) {
      ShopService.uploadMultiShops(shops[i++])
        .then(function (data) {
          console.log(data);
          if (shops[i]) {
            upload(shops, i);
          }
        }, function (err) {
          console.log(err);
        });
    }

    $scope.uploadMultiShops = function (shops) {
      var i = 0;
      upload(shops, i);
    };

    $rootScope.$broadcast('show.dialogUpload', {
      title: '上传门店',
      contents: [{
        key: '请选择需要上传的门店文件',
        value: '点击选择文件',
        tip: '点击选择文件'
      }],
      color: 'blue',
      headers: headers,
      callback: function (data) {
        var obj = {};
        var arr = [];
        data.forEach(function (item) {
          if (!obj[item['门店编码']]) {
            obj[item['门店编码']] = {};
            $scope.headers.forEach(function (header) {
              obj[item['门店编码']][header] = item[header];
            });
          }
        });

        var result = [];

        for (var p in obj) {
          var item = {};
          for (var i in obj[p]) {
            switch (i) {
              case '门店编码':
                item.number = obj[p][i];
                break;
              case '门店名称':
                item.name = obj[p][i];
                break;
              case '门店等级':
                item.level = obj[p][i];
                break;
              case '所属区域':
                item.area = obj[p][i];
                break;
              case '所属城市':
                item.city = obj[p][i];
                break;
              case '地址':
                item.address = obj[p][i];
                break;
              case '渠道类型':
                item.channel_type = obj[p][i];
                break;
              case '门店类型':
                item.shop_type = obj[p][i];
                break;
              case '渠道':
                item.channel = obj[p][i];
                break;
              case '所属客户':
                item.customer = obj[p][i];
                break;
              case '业务员姓名':
                item.salesman_name = obj[p][i];
                break;
              case '业务员工号':
                item.salesman_number = obj[p][i];
                break;
              case '促销员工号':
                item.promotions_number = obj[p][i];
                break;
              case '促销员姓名':
                item.promotions_name = obj[p][i];
                break;
              case '月拜访频次':
                item.call_count = obj[p][i];
                break;
              case '门店状态':
                item.status = obj[p][i];
                break;
              case '品牌':
                item.brand = obj[p][i];
                break;
              case '经度':
                item.lng = obj[p][i];
                break;
              case '纬度':
                item.lat = obj[p][i];
                break;
            }
          }
          result.push(item);
        }
        var shops = [];
        for (var i = 0, len = result.length; i < len; i += 100) {
          shops.push(result.slice(i, i + 100));
        }

        console.log(obj);
        console.log(result);
        console.log(shops);
        $scope.uploadMultiShops(shops);
      }
    });
  });

}]);