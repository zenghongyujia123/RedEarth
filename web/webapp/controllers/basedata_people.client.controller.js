/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('BasedataPeopleCtrl', ['$scope', '$rootScope', 'PeopleService', function ($scope, $rootScope, PeopleService) {
  $scope.peoples = [];
  $scope.headers = [
    '人员编号', '工号', '姓名',
    '岗位', '职务', '电话号码',
    '邮箱', '性别', '上级领导工号',
    '上级领导姓名', '常驻城市', '辖区',
    '帐号开通日期', '在职状态', '人员类型'
  ];
  $scope.updatePeoplesPaths = function () {
    PeopleService.updatePeoplesPaths().then(function (data) {
      console.log(data);
    }, function (data) {
      console.log(data);
    });
  };
  //$scope.updatePeoplesPaths();

  $scope.getPeoples = function () {
    PeopleService.getPeoples().then(function (data) {
      console.log(data);
      if (data && !data.err) {
        $scope.peoples = data;
      }
    }, function (data) {
      console.log(data);
    });
  };

  $scope.getPeoples();

  $rootScope.$on('show.importPeoples', function () {
    var headers = [
      {key: 'A1', value: '人员编号'},
      {key: 'B1', value: '工号'},
      {key: 'C1', value: '姓名'},
      {key: 'D1', value: '岗位'},
      {key: 'E1', value: '职务'},
      {key: 'F1', value: '电话号码'},
      {key: 'G1', value: '邮箱'},
      {key: 'H1', value: '性别'},
      {key: 'I1', value: '上级领导编号'},
      {key: 'J1', value: '上级领导姓名'},
      {key: 'K1', value: '常驻城市'},
      {key: 'L1', value: '辖区'},
      {key: 'M1', value: '帐号开通日期'},
      {key: 'N1', value: '在职状态'},
      {key: 'O1', value: '人员类型'}
    ];

    function upload(peoples, i) {
      PeopleService.uploadMultiPeoples(peoples[i++])
        .then(function (data) {
          console.log(data);
          if (peoples[i]) {
            upload(peoples, i);
          }
        }, function (err) {
          console.log(err);
        });
    }

    $scope.uploadMultiPeoples = function (peoples) {
      var i = 0;
      upload(peoples, i);
      //AreaService.uploadMultiCutomers(customers).then(function (data) {
      //  console.log(data);
      //}, function (data) {
      //  console.log(data);
      //});
    };

    $rootScope.$broadcast('show.dialogUpload', {
      title: '上传人员',
      contents: [{
        key: '请选择需要上传的人员文件',
        value: '点击选择文件',
        tip: '点击选择文件'
      }],
      color: 'blue',
      headers: headers,
      callback: function (data) {
        var obj = {};
        var arr = [];
        data.forEach(function (item) {
          if (!obj[item['电话号码']]) {
            obj[item['电话号码']] = {};
            $scope.headers.forEach(function (header) {
              obj[item['电话号码']][header] = item[header];
            });
          }
        });

        var result = [];

        for (var p in obj) {
          var item = {};
          for (var i in obj[p]) {
            switch (i) {
              case '人员编号':
                item.number = obj[p][i];
                break;
              case '工号':
                item.job_number = obj[p][i];
                break;
              case '姓名':
                item.name = obj[p][i];
                break;
              case '岗位':
                item.job = obj[p][i];
                break;
              case '职务':
                item.duty = obj[p][i];
                break;
              case '电话号码':
                item.telephone = obj[p][i];
                break;
              case '邮箱':
                item.email = obj[p][i];
                break;
              case '性别':
                item.sex = obj[p][i];
                break;
              case '上级领导工号':
                item.parent_number = obj[p][i];
                break;
              case '上级领导姓名':
                item.parent_name = obj[p][i];
                break;
              case '常驻城市':
                item.city = obj[p][i];
                break;
              case '辖区':
                item.area = obj[p][i];
                break;
              case '帐号开通日期':
                item.create_date = obj[p][i];
                break;
              case '在职状态':
                item.job_status = obj[p][i];
                break;
              case '人员类型':
                item.role = obj[p][i];
                break;
            }

          }
          result.push(item);
        }
        var peoples = [];
        for (var i = 0, len = result.length; i < len; i += 100) {
          peoples.push(result.slice(i, i + 100));
        }

        console.log(obj);
        console.log(result);
        console.log(peoples);
        $scope.uploadMultiPeoples(peoples);
      }
    });
  });


}]);