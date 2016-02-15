/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('BasedataAreaCtrl', ['$scope', '$rootScope', 'AuthService', 'AreaService', function ($scope, $rootScope, AuthService, AreaService) {
  $scope.company = AuthService.getCompany();
  $scope.areas = [];
  $scope.editColClick = function (area) {
    $rootScope.$broadcast('show.dialogInput', {
      title: '编辑列',
      contents: [{
        key: '请输入列的名称',
        tip: '取个名字',
        value: area.name
      }],
      color: 'blue',
      callback: function (info) {
        if (area.name !== info.contents[0].value) {
          area.name = info.contents[0].value;
          $scope.updateAreaTitle(area);
        }
      }
    });
  };

  $scope.updateAreaTitle = function (areaTitle) {
    AreaService.updateAreaTitle(areaTitle).then(function (data) {
      console.log(data);
    }, function (err) {
      console.log(err);
    });
  };

  $scope.getAreas = function () {
    AreaService.getAreas().then(function (data) {
      console.log(data);
      if(!data.err){
        $scope.areas = data;
      }
    }, function (err) {
      console.log(err);
    });
  };

  $scope.getAreas();

  $rootScope.$on('show.importAreas', function () {
    //最多10列
    var headersTemp = [
      {key: 'A1', value: ''},
      {key: 'B1', value: ''},
      {key: 'C1', value: ''},
      {key: 'D1', value: ''},
      {key: 'E1', value: ''},
      {key: 'F1', value: ''},
      {key: 'G1', value: ''},
      {key: 'H1', value: ''},
      {key: 'I1', value: ''},
      {key: 'J1', value: ''}
    ];

    var index = 0;
    var headers = [];
    $scope.company.areas_title.forEach(function (areaTitle) {
      if (areaTitle.name) {
        headers.push({
          key: headersTemp[index++].key,
          value: areaTitle.name
        })
      }
    });

    $scope.uploadMultiArea = function (areas) {
      AreaService.uploadMultiAreas(areas).then(function (data) {
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };

    $rootScope.$broadcast('show.dialogUpload', {
      title: '上传地区',
      contents: [{
        key: '请选择需要上传的地区文件',
        value: '点击选择文件',
        tip: '点击选择文件'
      }],
      color: 'blue',
      headers: headers,
      callback: function (data) {
        var obj = {};
        var arr = [];
        data.forEach(function (item) {
          var a = {};
          for (var p in item) {
            switch (p) {
              case headers[0].value:
                a['level1'] = item[headers[0].value] || '';
                break;
              case headers[1].value:
                a['level2'] = item[headers[1].value] || '';
                break;
              case headers[2].value:
                a['level3'] = item[headers[2].value] || '';
                break;
              case headers[3].value:
                a['level4'] = item[headers[3].value] || '';
                break;
              case headers[4].value:
                a['level5'] = item[headers[4].value] || '';
                break;
              case headers[5].value:
                a['level6'] = item[headers[5].value] || '';
                break;
              case headers[6].value:
                a['level7'] = item[headers[6].value] || '';
                break;
              case headers[7].value:
                a['level8'] = item[headers[7].value] || '';
                break;
              case headers[8].value:
                a['level9'] = item[headers[8].value] || '';
                break;
              case headers[9].value:
                a['level10'] = item[headers[9].value] || '';
                break;
            }
          }

          a['key'] = (a.level1 || '') + ( a.level2 || '') + ( a.level3 || '') + ( a.level4 || '') + ( a.level5 || '') + ( a.level6 || '') + ( a.level7 || '') + ( a.level8 || '') + ( a.level9 || '') + ( a.level10 || '');
          if (!obj[a['key']]) {
            obj[a['key']] = a;
            arr.push(a);
          }


        });
        console.log(obj);

        $scope.uploadMultiArea(arr);
      }
    });
  });
}]);