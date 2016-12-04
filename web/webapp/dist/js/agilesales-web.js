/**
 * Created by zenghong on 16/1/15.
 */
'use strict';

var agilesales = angular.module('agilesales-web', [
  'ui.router',
  'LocalStorageModule'
]);

angular.module('agilesales-web').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.client.view.html',
        controller: "HomeCtrl"
      })
      .state('order_query', {
        url: '/order_query',
        templateUrl: 'templates/order_query.client.view.html',
        controller: "OrderQueryCtrl"
      })
      .state('order_detail', {
        url: '/order_detail/:order_number',
        templateUrl: 'templates/order_detail.client.view.html',
        controller: "OrderDetailCtrl"
      })
      .state('order_history', {
        url: '/order_history',
        templateUrl: 'templates/order_history.client.view.html',
        controller: "OrderHistoryCtrl"
      })
      .state('order_history.history_backup', {
        url: '/history_backup',
        templateUrl: 'templates/backup.client.view.html',
        controller: "HistoryBackupCtrl"
      })
      .state('order_history.history_home', {
        url: '/history_home',
        templateUrl: 'templates/history_home.client.view.html',
        controller: "HistoryHomeCtrl"
      })
      .state('order_history.history_product', {
        url: '/history_product',
        templateUrl: 'templates/history_product.client.view.html',
        controller: "HistoryProductCtrl"
      })
      .state('order_history.history_sales', {
        url: '/history_sales',
        templateUrl: 'templates/history_sales.client.view.html',
        controller: "HistorySalesCtrl"
      })
      .state('order_history.history_desk', {
        url: '/history_desk',
        templateUrl: 'templates/history_desk.client.view.html',
        controller: "HistoryDeskCtrl"
      })
      .state('order_history.history_stock', {
        url: '/history_stock',
        templateUrl: 'templates/history_stock.client.view.html',
        controller: "HistoryStockCtrl"
      })
      .state('system_setting', {
        url: '/system_setting',
        templateUrl: 'templates/system_setting.client.view.html',
        controller: "SystemSettingCtrl"
      })
      .state('system_setting.setting_home', {
        url: '/setting_home',
        templateUrl: 'templates/setting_home.client.view.html',
        controller: "SettingHomeCtrl"
      })
      .state('system_setting.setting_password', {
        url: '/setting_password',
        templateUrl: 'templates/setting_password.client.view.html',
        controller: "SettingPasswordCtrl"
      })
      .state('system_setting.setting_history', {
        url: '/setting_history',
        templateUrl: 'templates/setting_history.client.view.html',
        controller: "SettingHistoryCtrl"
      })
      .state('dashboard_query', {
        url: '/dashboard_query',
        templateUrl: 'templates/dashboard_query.client.view.html',
        controller: "DashboardQueryCtrl"
      })
      .state('order_suggest', {
        url: '/order_suggest',
        templateUrl: 'templates/order_suggest.client.view.html',
        controller: "OrderSuggestCtrl"
      })
      .state('order_suggest.suggest_area_last_month', {
        url: '/suggest_area_last_month',
        templateUrl: 'templates/suggest_area_last_month.client.view.html',
        controller: "SuggestAreaLastMonthCtrl"
      })
      .state('order_suggest.suggest_area_other_order', {
        url: '/suggest_area_other_order',
        templateUrl: 'templates/suggest_area_other_order.client.view.html',
        controller: "SuggestAreaOtherOrderCtrl"
      })
      .state('order_suggest.suggest_area_other_D02', {
        url: '/suggest_area_other_D02',
        templateUrl: 'templates/suggest_area_other_D02.client.view.html',
        controller: "SuggestAreaOtherD02Ctrl"
      })
      .state('order_suggest.suggest_area_other_D03', {
        url: '/suggest_area_other_D03',
        templateUrl: 'templates/suggest_area_other_D03.client.view.html',
        controller: "SuggestAreaOtherD03Ctrl"
      })
      .state('order_suggest.suggest_area_other_D04', {
        url: '/suggest_area_other_D04',
        templateUrl: 'templates/suggest_area_other_D04.client.view.html',
        controller: "SuggestAreaOtherD04Ctrl"
      })
      .state('order_suggest.suggest_area_suggest_result', {
        url: '/suggest_area_suggest_result',
        templateUrl: 'templates/suggest_area_suggest_result.client.view.html',
        controller: "SuggestAreaSuggestResultCtrl"
      })
      .state('order_suggest.suggest_home', {
        url: '/suggest_home',
        templateUrl: 'templates/suggest_home.client.view.html',
        controller: "SuggestHomeCtrl"
      })
      .state('order_suggest.suggest_hq_agency', {
        url: '/suggest_hq_agency',
        templateUrl: 'templates/suggest_hq_agency.client.view.html',
        controller: "SuggestHqAgencyCtrl"
      })
      .state('order_suggest.suggest_hq_current', {
        url: '/suggest_hq_current',
        templateUrl: 'templates/suggest_hq_current.client.view.html',
        controller: "SuggestHqCurrentCtrl"
      })
      .state('order_suggest.suggest_hq_e_commerce', {
        url: '/suggest_hq_e_commerce',
        templateUrl: 'templates/suggest_hq_e_commerce.client.view.html',
        controller: "SuggestHqEcommerceCtrl"
      })
      .state('order_suggest.suggest_hq_maozi', {
        url: '/suggest_hq_maozi',
        templateUrl: 'templates/suggest_hq_maozi.client.view.html',
        controller: "SuggestHqMaoziCtrl"
      })
      .state('order_suggest.suggest_hq_suggest_result', {
        url: '/suggest_hq_suggest_result',
        templateUrl: 'templates/suggest_hq_suggest_result.client.view.html',
        controller: "SuggestHqSuggestResultCtrl"
      })
      .state('order_suggest.suggest_hq_other_order', {
        url: '/suggest_hq_other_order',
        templateUrl: 'templates/suggest_hq_other_order.client.view.html',
        controller: "SuggestHqOtherOrderCtrl"
      })
      .state('order_suggest.suggest_hq_other_Y02', {
        url: '/suggest_hq_other_Y02',
        templateUrl: 'templates/suggest_hq_other_Y02.client.view.html',
        controller: "SuggestHqOtherY02Ctrl"
      })
      .state('order_suggest.suggest_hq_other_Y03', {
        url: '/suggest_hq_other_Y03',
        templateUrl: 'templates/suggest_hq_other_Y03.client.view.html',
        controller: "SuggestHqOtherY03Ctrl"
      })
      .state('order_suggest.suggest_hq_other_Y04', {
        url: '/suggest_hq_other_Y04',
        templateUrl: 'templates/suggest_hq_other_Y04.client.view.html',
        controller: "SuggestHqOtherY04Ctrl"
      })
      .state('order_hq_detail', {
        url: '/order_hq_detail/:order_number',
        templateUrl: 'templates/order_hq_detail.client.view.html',
        controller: "OrderHqDetailCtrl"
      })
      .state('order_hq_approve_area', {
        url: '/order_hq_approve_area/:order_number',
        templateUrl: 'templates/order_hq_approve_area.client.view.html',
        controller: "OrderHqApproveAreaCtrl"
      })
      .state('order_re_approve_hq', {
        url: '/order_re_approve_hq/:order_number',
        templateUrl: 'templates/order_re_approve_hq.client.view.html',
        controller: "OrderReApproveHqCtrl"
      });

    $urlRouterProvider.otherwise('/');
  }])
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('re');
  }])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('PublicInterceptor');
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function (obj) {
      var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if (value !== undefined && value !== null)
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
      return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
  }])

  .run(['$rootScope', '$state', '$window', 'AuthService', 'UserService',
    function ($rootScope, $state, $window, AuthService, UserService) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        var to = document.getElementById('error3').getAttribute('data-value');
        if (to !== "") {
          AuthService.setToken(to);
        }
        else {
          if (AuthService.getToken() == "") {
            event.preventDefault();
            window.location = '/';
          }
        }
        //判断用户数据是否存在
        if (!AuthService.isLoggedIn()) {
          event.preventDefault();
          //没有用户数据，需要重新获取用户，页面可能需要被重定向
          UserService.getMe()
            .then(function (data) {
                if (data.err) {
                  return window.location = '/';
                }
                AuthService.setUser(data);
                var obj = AuthService.getLatestUrl();
                var state = 'home';
                var params = '';
                if (obj && obj != '^' && obj.state) {
                  state = obj.state;
                  params = obj.params;
                }
                return $state.go(state, params);
              },
              function (err) {
                alert('系统错误' + JSON.stringify(err));
              });
        }
      });

      var windowElement = angular.element($window);
      windowElement.on('beforeunload', function (event) {
        AuthService.setLatestUrl($state.current.name, $state.params);
      });

    }]);
angular.module('agilesales-web').directive('zzFloatLeft', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',
    replace: false,
    controller: function ($scope, $element) {
      var parent = $element.parents('.re-table');
      parent.scroll(function () {
        $element.css({left: parent.scrollLeft() + 'px'});
      });
    }
  }
}]);
/**
 * Created by zenghong on 16/1/19.
 */
angular.module('agilesales-web').directive('agGlobalEvent', ['$window', function ($window) {
  return {
    restrict: 'AE',
    link: function ($scope, $element, $attrs) {
      $(window).resize(function () {
        $element.height($(this).height()-60);
      }).resize();
    }
  }
}]);
/**
 * Created by zenghong on 16/1/19.
 */
angular.module('agilesales-web').directive('agHoverShake', [function () {
  return {
    restrict: 'AE',
    link: function ($scope, $element, $attrs) {
      $element.mouseover(function () {
        $element.find('.icon').addClass('animated ' + $attrs.agHoverShake + '');
      });
      $element.mouseleave(function () {
        $element.find('.icon').removeClass('animated ' + $attrs.agHoverShake + '');
      });
    }
  }
}]);
angular.module('agilesales-web').directive('zzLoading', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',

    template: '<div class="zz-loading-layer">' +
    '<div class="zz-loading-info"> ' +
    '<img ng-src="images/load.gif"/>' +
    ' </div> </div>',
    replace: true,
    controller: function ($scope, $element) {
      $rootScope.$on('loading.hide',function(){
        $element.hide();
      });
      $rootScope.$on('loading.show',function(){
        $element.show();
      });
    }
  }
}]);
/**
 * Created by zenghong on 16/1/19.
 */

/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agDialogConfirm', ['$rootScope',function ($rootScope) {
  return {
    restrict: 'AE',
    templateUrl: 'directives/dialog_confirm/dialog_confirm.client.view.html',
    replace: true,
    scope: {},
    link: function ($scope, $element, $attrs) {
      $scope.info = {
        title: '',
        content:'',
        color: 'blue'
      };

      $scope.show = function () {
        $element.addClass('show');
      };
      $scope.hide = function () {
        $element.removeClass('show');
      };
      $scope.submit = function () {
        $element.removeClass('show');
        if ($scope.info.callback) {
          $scope.info.callback($scope.info);
        }
      };
      $rootScope.$on('show.dialogConfirm', function (event, data) {
        setTheme(data);
        $scope.show();
      });

      function setTheme(info) {
        $element.find('.ag-dialog-panel').removeClass($scope.info.color).addClass(info.color);
        $scope.info = info;
      }
    }
  }
}]);
/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agDialogInput', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'AE',
    templateUrl: 'directives/dialog_input/dialog_input.client.view.html',
    replace: true,
    scope: {},
    link: function ($scope, $element, $attrs) {
      $scope.info = {
        title: '',
        contents: [{
          key: '请输入拜访卡名称',
          tip: '点击输入名称',
          value: ''
        }],
        color: 'blue'
      };

      $scope.show = function () {
        $element.addClass('show');
      };
      $scope.hide = function () {
        $element.removeClass('show');
      };
      $scope.submit = function () {
        $element.removeClass('show');
        if ($scope.info.callback) {
          $scope.info.callback($scope.info);
        }
      };
      $rootScope.$on('show.dialogInput', function (event, data) {
        setTheme(data);
        $scope.show();
      });

      function setTheme(info) {
        $element.find('.ag-dialog-panel').removeClass($scope.info.color).addClass(info.color);
        $scope.info = info;
      }
    }
  }
}]);
/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agDialogSelect', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'AE',
    templateUrl: 'directives/dialog_select/dialog_select.client.view.html',
    replace: true,
    scope: {},
    link: function ($scope, $element, $attrs) {
      $scope.options = [];
      $scope.info = {
        title: '',
        contents: [{
          key: '请输入拜访卡名称',
          value: '点击输入名称'
        }],
        color: 'blue'
      };

      $scope.show = function () {
        $element.addClass('show');
      };
      $scope.hide = function () {
        $element.removeClass('show');
      };
      $scope.submit = function () {
        $element.removeClass('show');
        $scope.info.callback($scope.info);
      };
      $scope.toggleOptions = function (index) {
        if ($element.find('.ag-row-option-container').eq(index).hasClass('show')) {
          $scope.hideOptions(index);
        }
        else {
          $scope.showOptions(index);
        }
      };

      $scope.selectOption = function (content, option) {
        content.value = option;
      };

      $rootScope.$on('show.dialogSelect', function (event, data) {
        setTheme(data);
        $scope.show();
      });
      function setTheme(info) {
        $element.find('.ag-dialog-panel').removeClass($scope.info.color).addClass(info.color);
        $scope.info = info;
      }

      $scope.showOptions = function (index) {
        $element.find('.ag-row-option-container').eq(index).addClass('show');
      };
      $scope.hideOptions = function (index) {
        $element.find('.ag-row-option-container').eq(index).removeClass('show');
      }
    }
  }
}]);
/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agDialogUpload', ['$rootScope', 'ExcelReaderService', function ($rootScope, ExcelReaderService) {
  return {
    restrict: 'AE',
    templateUrl: 'directives/dialog_upload/dialog_upload.client.view.html',
    replace: true,
    scope: {},
    link: function ($scope, $element, $attrs) {
      $scope.info = {
        title: '',
        contents: [{
          key: '请输入拜访卡名称',
          value: '点击输入名称'
        }],
        color: 'blue',
        type: 'execel',
        headers: [
          {key: 'A1', value: '大区'},
          {key: 'B1', value: '省区'},
          {key: 'C1', value: '办事处'}
        ]
      };

      $scope.show = function () {
        $element.addClass('show');
      };
      $scope.hide = function () {
        $element.removeClass('show');
      };
      $scope.submit = function () {
        $element.removeClass('show');
      };
      $rootScope.$on('show.dialogUpload', function (event, data) {
        setTheme(data);
        $scope.show();
      });

      $scope.handleFile = function (ele) {
        var excelReader = ExcelReaderService.getReader();

        excelReader.getWorkSheet(ele,$scope.info.contents[0].sheetName, function (err, excelSheet) {
          excelReader.checkHeader(excelSheet, $scope.info.headers, $scope.info.contents[0].sheetName,function (isOurTemplate) {
            if (!isOurTemplate) {
              var a = isOurTemplate;
            }
            excelReader.getSheetData(excelSheet, $scope.info.headers,$scope.info.contents[0].sheetName ,function (err, sheetData) {
              if ($scope.info.callback) {
                $scope.info.callback(sheetData);
              }
              $scope.hide();
            });
          });
        });
      };

      function setTheme(info) {
        $element.find('.ag-dialog-panel').removeClass($scope.info.color).addClass(info.color);
        $scope.info = info;
      }
    }
  }
}]);
angular.module('agilesales-web').factory('PublicInterceptor', ['AuthService', function (AuthService) {
  return {
    'request': function (req) {
      req.data = req.data ? req.data : {};
      req.data.access_token = AuthService.getToken();
      req.params = req.params ? req.params : {};
      req.params.access_token = AuthService.getToken();
      req.params.no_cache =new Date().getTime();
      return req;
    },
    'response': function (resp) {
      return resp;
    },
    'requestError': function (rejection) {
      return rejection;
    },
    'responseError': function (rejection) {
      return rejection;
    }
  }
}]);


/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('AreaOrderService', ['HttpService', function (HttpService) {
    return {
        otherOrderImport: function (orders) {
            return HttpService.post('/webapp/area/order/import', {orders: orders});
        },
        areaSalesStockOnwayImport: function (sales) {
            return HttpService.post('/webapp/area/sales/import', {sales: sales});
        },
        getOrdersByArea: function (order_type) {
            return HttpService.get('/webapp/area/order', {order_type: order_type});
        },
        getSalesByArea: function () {
            return HttpService.get('/webapp/area/sales', {});
        },
        getHistorySales: function () {
            return HttpService.get('/webapp/area/sales/history', {});
        },
        importsHistorySales: function (sales) {
            return HttpService.post('/webapp/area/sales/history_import', {sales: sales});
        },
        getAreaSuggestOrder: function () {
            return HttpService.get('/webapp/area/order/suggest', {});
        },
        suggestOrderSubmit: function (sales) {
            return HttpService.post('/webapp/area/sales/submit', {sales: sales});
        },
        getAreaOrderList: function () {
            return HttpService.get('/webapp/area/query', {});
        },
        getAreaOrderDetail: function (order_number) {
            return HttpService.get('/webapp/area/order/detail', {order_number: order_number});
        },
        approveAreaOrder: function (order) {
            return HttpService.post('/webapp/area/sales/approve', {order: order});
        },
        approveAreaOrders: function (orders) {
            return HttpService.post('/webapp/area/sales/approve/multi', {orders: orders});
        },
        updateSubmitOhterOrderStatus: function (submit_order) {
            return HttpService.post('/webapp/area/sales/submit_order/update', {submit_order: submit_order});
        },
        getCurrentAreaSubmitOrder: function () {
            return HttpService.get('/webapp/area/sales/submit', {});
        },
        sureOrder: function (order) {
            return HttpService.post('/webapp/area/order/sure', {order: order});
        },
        getAreaReports: function (month,nextMonth, name) {
            return HttpService.get('/webapp/area/reports', {name: name,next_month:nextMonth, month: month});
        }
    };
}]);
/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('AuthService', ['localStorageService', '$rootScope', function (localStorageService, $rootScope) {
  var access_token = '';
  var user = null;
  var userUpdateHandles = [];
  return {
    setToken: function (t) {
      access_token = t;
      localStorageService.set('access_token', t);
    },
    getToken: function () {
      if (access_token == "") {
        var local = localStorageService.get('access_token');
        if (!local || local == "" || local == "<%=  test %>") {
          localStorageService.set('token', "");
          access_token = "";
        }
        else {
          access_token = local;
        }
      }
      return access_token;
    },
    getUser: function () {
      return user;
    },
    setUser: function (u) {
      user = u;
      console.log(u);
      this.userUpdated();
      $rootScope.$broadcast('onUserReset');
    },
    isLoggedIn: function () {
      return user ? true : false;
    },
    userUpdated: function () {
      userUpdateHandles.forEach(function (handler) {
        handler.handle(user);
      });
    },
    onUserUpdated: function (name, callback) {
      var result = false;
      for (var i = 0; i < userUpdateHandles.length; i++) {
        if (userUpdateHandles[i].name) {
          result = true;
          break;
        }
      }
      if (!result) {
        userUpdateHandles.push({
          name: name,
          handle: callback
        });
      }
    },
    getLatestUrl: function () {
      return localStorageService.get(user.username + 'state') || '';
    },
    setLatestUrl: function (state, params) {
      if (user) {
        localStorageService.set(user.username + 'state', {'state': state, 'params': params});
      }
    },
    signOut: function () {
      user = null;
      access_token = '';
      this.setToken('');
      window.location = '/';
    }
  };
}]);
/**
 * Created by zenghong on 16/1/20.
 */
/**
 * Created by Wayne on 15/12/7.
 */

'use strict';
angular.module('agilesales-web').factory('ExcelReaderService', function () {
  function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  }

  var activeXReader = {
    getWorkSheet: function (element, sheetName, callback) {
      var fileObject = document.getElementById('filename');
      fileObject.select();
      fileObject.blur();

      var filePath = document.selection.createRange().text;
      var suffix = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();

      if (suffix !== 'xls' && suffix != 'xlsx') {
        return callback({type: 'file_type_error', message: '选择的文件不是Excel文件'});
      }

      var excel = new ActiveXObject('Excel.Application');
      var excel_file = excel.Workbooks.open(filePath);
      var excelSheet = excel.Worksheets(sheetName);

      console.log(excelSheet.UsedRange.Rows.Count);
      console.log(excelSheet.UsedRange.Columns.Count);

      return callback(null, excelSheet);
    },
    checkHeader: function (excelSheet, headers, callback) {
      if (!excelSheet) {
        return callback(false);
      }

      for (var column = 0; column < headers.length; column++) {
        if (excelSheet.Cells(1, column + 1).Value !== headers[column].value) {
          return callback(false);
        }
      }
      return callback(true);
    },
    isHeaderNameExist: function (excelSheet, headerColumn) {
      if (!excelSheet) {
        return false;
      }
      if (excelSheet.Cells(1, headerColumn.index + 1).Value !== headerColumn.value) {
        return false;
      }
      return true;
    },
    exportExcel: function (rows) {
      var workSheetName = "Sheet1";
      console.log('data:');
      var data = rows;
      console.log(data);
      if (isIE()) {
        var excel = new ActiveXObject('Excel.Application');
        var excel_book = excel.Workbooks.Add;
        var excel_sheet = excel_book.Worksheets(1);
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].length; j++) {
            excel_sheet.Cells(i + 1, j + 1).Value = data[i][j];
          }
        }
        excel.Visible = true;
        excel.UserControl = true;
      }
      else {
        var wookBook = new Workbook();
        var wookSheet = sheet_from_array_of_arrays(data);

        /* add worksheet to workbook */
        wookBook.SheetNames.push(workSheetName);
        wookBook.Sheets[workSheetName] = wookSheet;

        var wbout = XLSX.write(wookBook, {bookType: 'xlsx', bookSST: false, type: 'binary'});
        saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), "Sheet1.xlsx");
      }
    },
    getSheetData: function (excelSheet, headers, callback) {
      var dataArray = [];
      var columnCount = excelSheet.UsedRange.Columns.Count;
      var data, hasValue;
      for (var row = 2; row < columnCount; row++) {
        data = {};
        hasValue = false;
        for (var column = 0; column < headers.length; column++) {
          if (excelSheet.Cells(row, column + 1).Value != undefined) {
            data[headers[column]] = excelSheet.Cells(row, column + 1).Value;
            hasValue = true;
          }
        }
        if (hasValue) {
          dataArray.push(data);
        }
      }
      //var jsonResultString = JSON.stringify(dataArray);

      if (dataArray.length === 0) {
        return callback({type: 'file_content_empty', message: '表格中没有数据'});
      }
      return callback(null, dataArray);
    }
  };

  var otherReader = {
    getWorkSheet: function (element, sheetName, callback) {
      var file = element.files[0];
      var suffix = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
      if (suffix !== 'xls' && suffix !== 'xlsx') {
        return callback({type: 'file_type_error', message: '选择的文件不是Excel文件'});
      }

      var reader = new FileReader();
      reader.onload = function (e) {
        var workbook;
        var isError = false;
        try {
          var binary = '';

          if (reader.readAsBinaryString) {
            binary = e.target.result;
          }
          else {
            var bytes = new Uint8Array(e.target.result);
            var length = bytes.byteLength;

            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
          }

          workbook = XLSX.read(binary, {type: 'binary'});
          if (workbook.SheetNames.length <= 0) {
            return callback({type: 'file_content_empty', message: '表格中没有数据'});
          }
        }
        catch (ex) {
          isError = true;
        }
        if (isError) {
          return callback({type: 'file_parse_error', message: 'Excel文件解析失败'});
        }
        return callback(null, workbook);
      };

      if (reader.readAsBinaryString) {
        reader.readAsBinaryString(file);
      }
      else {
        reader.readAsArrayBuffer(file);
      }
    },
    checkHeader: function (workbook, headers, sheetName, callback) {
      var excelSheet = workbook.Sheets[sheetName];
      if (!excelSheet) {
        return callback(false);
      }
      for (var index = 0; index < headers.length; index++) {
        var column = 'excelSheet.' + headers[index].key;

        if (eval(column)) {
          var columnName = column + '.v';
          if (eval(columnName) !== headers[index].value) {
            return callback(false);
          }
        }
        else {
          return callback(false);
        }
      }
      return callback(true);
    },
    isHeaderNameExist: function (workbook, headerColumn, sheetName) {
      var excelSheet = workbook.Sheets[0];
      if (!excelSheet) {
        return false;
      }
      var column = 'excelSheet.' + headerColumn.key;
      if (eval(column)) {
        var columnName = column + '.v';
        if (eval(columnName) === headerColumn.value) {
          return true;
        }
      }
      return false;
    },
    getSheetData: function (workbook, headers, sheetName, callback) {
      //目前只取第一个sheet的内容
      var xlsSheetArray = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      //var jsonResultString = JSON.stringify(xlsSheetArray);

      if (!xlsSheetArray || xlsSheetArray.length <= 0) {
        return callback({type: 'file_content_empty', message: '表格中没有数据'});
      }
      return callback(null, xlsSheetArray);
    },
    exportExcel: function (rows) {
      var workSheetName = "Sheet1";
      console.log('data:');
      var data = rows;
      console.log(data);
      if (isIE()) {
        var excel = new ActiveXObject('Excel.Application');
        var excel_book = excel.Workbooks.Add;
        var excel_sheet = excel_book.Worksheets(1);
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].length; j++) {
            excel_sheet.Cells(i + 1, j + 1).Value = data[i][j];
          }
        }
        excel.Visible = true;
        excel.UserControl = true;
      }
      else {
        var wookBook = new Workbook();
        var wookSheet = sheet_from_array_of_arrays(data);

        /* add worksheet to workbook */
        wookBook.SheetNames.push(workSheetName);
        wookBook.Sheets[workSheetName] = wookSheet;

        var wbout = XLSX.write(wookBook, {bookType: 'xlsx', bookSST: false, type: 'binary'});
        saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), "Sheet1.xlsx");
      }
    }
  };

  return {
    getReader: function () {
      if (typeof FileReader == 'undefined') {
        return activeXReader;
      }
      return otherReader;
    },
    splitArray: function (dataArray, splitSize) {
      var newArray = [];
      var i = 0;
      while (i < dataArray.length) {
        var sliceArray = dataArray.slice(i, i + splitSize);
        newArray.push(sliceArray);
        i = i + splitSize;
      }

      return newArray;
    }
  };

});
/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('HistoryOrderService', ['HttpService', function (HttpService) {
    return {
        areaHistoryOrderImport: function (orders) {
            return HttpService.post('/webapp/area/order/history/import', {orders: orders});
        }
    };
}]);
/**
 * Created by zenghong on 16/2/21.
 */

angular.module('agilesales-web').factory('HqOrderService', ['HttpService', function (HttpService) {
  return {
    getHqCurrentStocks: function () {
      return HttpService.get('/webapp/hq/stocks', {});
    },
    hqStockImport: function (stocks) {
      return HttpService.post('/webapp/hq/stocks/import', {stocks: stocks});
    },
    getHqOtherOrders: function (order_type) {
      return HttpService.get('/webapp/hq/orders', {order_type: order_type || ''});
    },
    hqOtherOrderImport: function (orders) {
      return HttpService.post('/webapp/hq/orders/import', {orders: orders});
    },
    getHqSuggestOrders: function () {
      return HttpService.get('/webapp/hq/orders/suggest', {});
    },
    hqSuggestOrderSubmit: function (sales) {
      return HttpService.post('/webapp/hq/sales/submit', {sales: sales});
    },
    getHqOrderList: function () {
      return HttpService.get('/webapp/hq/sales/query', {});
    },
    approveHqOrder: function (order) {
      return HttpService.post('/webapp/hq/sales/approve', {order: order});
    },
    approveHqOrders: function (orders) {
      return HttpService.post('/webapp/hq/sales/approve/multi', {orders: orders});
    },
    getCurrentHqSubmitOrder: function (orders) {
      return HttpService.get('/webapp/hq/sales/submit', {});
    },
    getHqOrderDetail: function (order_number) {
      return HttpService.get('/webapp/hq/order/detail', {order_number: order_number});
    },
    updateSubmitOtherOrderStatus: function (submit_order) {
      return HttpService.post('/webapp/hq/sales/submit_order/update', {submit_order: submit_order});
    },
    sureOrder: function (order) {
      return HttpService.post('/webapp/hq/order/sure', {order: order});
    },
    importHqDeliveryTime: function (order_number, time_infos) {
      return HttpService.post('/webapp/hq/order/delivery_time', {time_infos: time_infos, order_number: order_number});
    },
    getHqReports: function (month, nextMonth) {
      return HttpService.get('/webapp/hq/reports', {month: month, next_month: nextMonth});
    }
  };
}]);
/**
 * Created by zenghong on 16/1/21.
 */
/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('HttpService', ['$http', '$q', function ($http, $q) {
  return {
    post: function (url, params) {
      var q = $q.defer();
      $http.post(url, params)
        .success(function (data) {
          q.resolve(data);
        })
        .error(function (data) {
          q.reject(data);
        });
      return q.promise;
    },
    get: function (url, params) {
      var q = $q.defer();
      $http.get(url, {params: params})
        .success(function (data) {
          q.resolve(data);
        })
        .error(function (data) {
          q.reject(data);
        });
      return q.promise;
    }
  };
}]);
/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('Loading', ['$rootScope', function ($rootScope) {
  return {
    show: function () {
      $rootScope.$broadcast('loading.show');
    },
    hide: function () {
      $rootScope.$broadcast('loading.hide');
    }
  };
}]);
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
    },
    getDesks: function () {
      return HttpService.get('/webapp/desk', {});
    },
    clearData: function () {
      return HttpService.post('/webapp/data/clear', {});
    }
  };
}]);
/**
 * Created by zenghong on 16/1/26.
 */
angular.module('agilesales-web').factory('UploadService', ['HttpService', function (HttpService) {
  return {
    upload: function (url, data) {
      return HttpService.post(url, data);
    }
  };
}]);
/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('UserService', ['HttpService', function (HttpService) {
  return {
    getMe: function () {
      return HttpService.get('/webapp/user/me', {});
    },
    getLog: function () {
      return HttpService.get('/webapp/user/log', {});
    },
    changePassword: function (oldP, newP) {
      return HttpService.post('/webapp/user/password', {old_p: oldP, new_p: newP});
    }
  };
}]);
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
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistoryBackupCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'AreaOrderService', 'AuthService', 'Loading', 'ExcelReaderService', 'HistoryOrderService',
  function ($scope, $rootScope, $stateParams, $state, AreaOrderService, AuthService, Loading, ExcelReaderService, HistoryOrderService) {
    $scope.$emit('suggest.import.changed', {
      title: '4-9月历史数据',
      btns: [
        {
          text: '导入4-9月历史销售,库存',
          clickCallback: importClickCallback
        },
        {
          text: '导出',
          clickCallback: exportExecl
        }
      ]
    });

    $scope.sales = [];

    $scope.getHistorySales = function () {
      Loading.show();
      AreaOrderService.getHistorySales().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.sales = data;
        }
        Loading.hide();
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    //$scope.getHistorySales();
    function importClickCallback() {
      var headers = [
        {key: 'A1', value: '城市'},
        {key: 'B1', value: '年月'},
        {key: 'C1', value: 'SKU编码'},
        {key: 'D1', value: '上月销售量'},
        {key: 'E1', value: '上月月结库存量'},
        {key: 'F1', value: '上月月结在途量'}
      ];

      function upload(sales, i) {
        console.log(i);
        HistoryOrderService.areaHistoryOrderImport(sales[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              return $state.go('order_history.history_backup', {}, {reload: true});
            }

            console.log(data);
            if (sales[i]) {
              upload(sales, i);
            }
            else {
              Loading.hide();
              $state.go('order_history.history_backup', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      $scope.areaHistoryOrderImport = function (sales) {
        var i = 0;
        Loading.show();
        upload(sales, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传3-9月历史销量库存在途量资料',
        contents: [{
          key: '请选择需要上传资料文件',
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '汇总'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            var p = {};
            p.product_number = item['SKU编码'];
            p.department = item['城市'];
            p.month = item['年月'];
            p.sale_count = parseInt(item['上月销售量']);
            p.stock_count = parseInt(item['上月月结库存量']);
            p.onway_count = parseInt(item['上月月结在途量']);
            result.push(p);
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 50) {
            orders.push(result.slice(i, i + 50));
          }
          if (orders.length > 0) {
            $scope.areaHistoryOrderImport(orders);
          }
          console.log(data);
          console.log(orders);
        }
      });
    }

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        'SKU编码',
        '产品名称',
        '月份',
        '地区',
        '销售量',
        '月结库存',
        '月结在途'
      ]];

      $scope.sales.forEach(function (s) {
        rows.push([
          s.product_number,
          s.product.product_name,
          s.month,
          s.department,
          s.last_month_sales_count,
          s.last_month_stock_count,
          s.last_month_onway_count
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }


  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistoryDeskCtrl', ['$scope', 'ProductService', 'Loading','ExcelReaderService',
  function ($scope, ProductService, Loading,ExcelReaderService) {
    $scope.$emit('suggest.import.changed', {
      title: '历史数据',
      btns: [
        {
          text: '导出',
          clickCallback: exportExecl
        }
      ]
    });

    $scope.desks = [];

    $scope.getDesk = function () {
      Loading.show();
      ProductService.getDesks().then(function (data) {
        if (data && !data.err) {
          $scope.desks = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };
    $scope.getDesk();

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '所属地区',
        '地区',
        '柜台号',
        '柜台名'
      ]];

      $scope.desks.forEach(function (d) {
        rows.push([
          d.area,
          d.child_area,
          d.desk_number,
          d.desk_name
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }

  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistoryHomeCtrl', function () {

});
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistoryProductCtrl', ['$scope', '$state', '$rootScope', 'ProductService', 'Loading', 'ExcelReaderService',
  function ($scope, $state, $rootScope, ProductService, Loading, ExcelReaderService) {
    $scope.$emit('suggest.import.changed', {
      title: '历史数据',
      btns: [
        {
          text: '导入产品资料',
          clickCallback: importClickCallback
        },
        {
          text: '导出',
          clickCallback: exportExecl
        }
      ]
    });

    function clearClickCallback() {
      ProductService.clearData().then(function (data) {
        console.log(data);
        alert('ok');
        $state.go('order_history.history_product', {}, {reload: true});
      }, function (data) {
        console.log(data);
      });
    }

    $scope.products = [];
    $scope.getProducts = function () {
      Loading.show();
      ProductService.getProducts().then(function (data) {
        if (!data.err) {
          $scope.products = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };
    $scope.getProducts();

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
            else {
              Loading.hide();
              $state.go('order_history.history_product', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      $scope.importProducts = function (products) {
        var i = 0;
        Loading.show();
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
            p.product_number = item['SKU编码'].trim();
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
            var a = /MBPB4CGB0/;
            if (a.test(p.product_number)) {
              var a = p;
            }
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

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        'SKU编码',
        '产品条码',
        'SAP CODE',
        '产品名称',
        '规格',
        '品类',
        '系列名称',
        '中分类名称',
        '小分类名称',
        '销售价格',
        '晋颖成本价',
        '开始销售日期',
        '停止销售日期',
        '保质期',
        '销售单位',
        '工厂名称',
        '工厂MOQ',
        'MOQ备注',
        '工厂交货週期',
        '是否明星产品',
        'TOP SKU排名',
        'ABC分类',
        'ABC类说明',
        'ABC类別%',
        '柜枱销售參考(月)',
        '柜枱安全库存(月)',
        '柜枱最少订量',
        '地区销售參考(月)',
        '地区安全库存(月)',
        '地区修改订单超出% (需颜色提醒)',
        '地区修改订单超出% (需备注及确认)',
        '总部销售參考(月)',
        '总部安全库存(月)',
        '审批地区修改订单超出% (需颜色提醒)',
        '审批地区修改订单超出% (需上级确认)',
        '订量达MOQ之%必采购',
        '是否有地区特性',
        '地区特性加20%',
        '是否有季節性',
        '季節性加20%',
        '柜枱促销活动月份',
        '柜枱促销活动比率',
        '计划交货数',
        '计划交期',
        '实际收货数',
        '实际交期',
        '在途数',
        '字段1',
        '字段2',
        '字段3',
        '字段4',
        '字段5'
      ]];

      $scope.products.forEach(function (p) {
        rows.push([
          p.product_number,
          p.product_barcode,
          p.sap_code,
          p.product_name,
          p.specification,
          p.category,
          p.series_name,
          p.mid_classify,
          p.small_classify,
          p.sales_price,
          p.jinyi_cost,
          p.start_sales_date,
          p.end_sales_date,
          p.expiration_date,
          p.sales_unit,
          p.factory_name,
          p.factory_moq,
          p.moq_remark,
          p.factory_delivery_cycle,
          p.is_star_product,
          p.top_sku_ranking,
          p.abc_classify,
          p.abc_classify_explain,
          p.abc_category,
          p.desk_sales_reference,
          p.desk_minimum_order_count,
          p.desk_safe_stock,
          p.area_sales_reference,
          p.area_safe_stock,
          p.area_modify_exceed,
          p.area_modify_exceed_remark,
          p.hq_sales_reference,
          p.hq_safe_stock,
          p.approval_modify_exceed,
          p.approval_modify_exceed_remark,
          p.order_count_exceed_moq,
          p.is_area_speciality,
          p.area_speciality_more,
          p.is_season_speciality,
          p.season_speciality_more,
          p.desk_promotion_month,
          p.desk_promotion_rate,
          p.plan_delivery_count,
          p.plan_delivery_date,
          p.real_delivery_count,
          p.real_delivery_date,
          p.onway_count,
          p.field_1,
          p.field_2,
          p.field_3,
          p.field_4,
          p.field_5
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }

  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistorySalesCtrl', ['$scope', '$state', '$rootScope', 'AreaOrderService', 'Loading', 'ExcelReaderService',
  function ($scope, $state, $rootScope, AreaOrderService, Loading, ExcelReaderService) {
    $scope.$emit('suggest.import.changed', {
      title: '历史数据',
      btns: [
        {
          text: '导入历史销售,库存',
          clickCallback: importClickCallback
        },
        {
          text: '导出',
          clickCallback: exportExecl
        }
      ]
    });

    $scope.sales = [];

    $scope.getHistorySales = function () {
      Loading.show();
      AreaOrderService.getHistorySales().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.sales = data;
        }
        Loading.hide();
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    $scope.getHistorySales();
    function importClickCallback() {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '地区'},
        {key: 'C1', value: '月份'},
        {key: 'D1', value: '月销售量'},
        {key: 'E1', value: '月结库存量'},
        {key: 'F1', value: '月结在途量'}
      ];

      function upload(sales, i) {
        console.log(i);
        AreaOrderService.importsHistorySales(sales[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              return $state.go('order_history.history_sales', {}, {reload: true});
            }

            console.log(data);
            if (sales[i]) {
              upload(sales, i);
            }
            else {
              Loading.hide();
              $state.go('order_history.history_sales', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      $scope.importsHistorySales = function (sales) {
        var i = 0;
        Loading.show();
        upload(sales, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传历史销量库存在途量资料',
        contents: [{
          key: '请选择需要上传资料文件',
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '历史销量库存在途量'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            var p = {};
            p.product_number = item['SKU编码'];
            p.department = item['地区'];
            p.month = item['月份'];
            p.last_month_sales_count = parseInt(item['月销售量']);
            p.last_month_stock_count = parseInt(item['月结库存量']);
            p.last_month_onway_count = parseInt(item['月结在途量']);
            result.push(p);
          });
          var sales = [];
          for (var i = 0, len = result.length; i < len; i += 50) {
            sales.push(result.slice(i, i + 50));
          }
          if (sales.length > 0) {
            $scope.importsHistorySales(sales);
          }
          console.log(data);
          console.log(sales);
        }
      });
    }

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        'SKU编码',
        '产品名称',
        '月份',
        '地区',
        '销售量',
        '月结库存',
        '月结在途'
      ]];

      $scope.sales.forEach(function (s) {
        rows.push([
          s.product_number,
          s.product.product_name,
          s.month,
          s.department,
          s.last_month_sales_count,
          s.last_month_stock_count,
          s.last_month_onway_count
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }

  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HistoryStockCtrl', ['$scope', 'AreaOrderService', 'Loading', 'ExcelReaderService',
  function ($scope, AreaOrderService, Loading, ExcelReaderService) {
    $scope.$emit('suggest.import.changed', {
      title: '历史数据',
      btns: [
        {
          text: '导入历史库存',
          clickCallback: importClickCallback
        },
        {
          text: '导出',
          clickCallback: exportExecl
        }
      ]
    });

    $scope.sales = [];

    $scope.getHistorySales = function () {
      Loading.show();
      AreaOrderService.getHistorySales().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.sales = data;
        }
        Loading.hide();
      }, function (data) {
        Loading.hide();
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
            else {
              Loading.hide();
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      $scope.importProducts = function (products) {
        var i = 0;
        Loading.show();
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

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        'SKU编码',
        '产品名称',
        '上月月结库存',
        '上月月结在途',
        '上1个月销售量',
        '上2个月销售量',
        '上3个月销售量'
      ]];

      $scope.sales.forEach(function (o) {
        rows.push([
          o.product_number,
          o.product.product_name,
          o.last_month_stock_count,
          o.last_month_onway_count,
          o.last_month_sales_count,
          o.last_month_sales_count_2 || '未知',
          o.last_month_sales_count_3 || '未知'
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }

  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HomeCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
  $scope.user = AuthService.getUser() || {};
  AuthService.onUserUpdated('AuthService', function (user) {
    $scope.user = user;
  });
}]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('IndexCtrl', ['$scope', '$rootScope', 'AuthService', function ($scope, $rootScope, AuthService) {
  $scope.location = window.location;
  $scope.user = AuthService.getUser() || {};
  $scope.signOut = function () {
    AuthService.signOut();
  };

  $rootScope.$on('header.text.change', function (event, data) {
    $scope.headers = data;
  });

  AuthService.onUserUpdated('IndexCtrl', function (user) {
    $scope.user = user;
  });

  $scope.headers = [
    {
      text: '快速开始',
      location:'#/'
    }
  ]
}]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderDetailCtrl', ['$scope', '$stateParams', '$state', 'AreaOrderService', 'AuthService', 'Loading', 'ExcelReaderService',
  function ($scope, $stateParams, $state, AreaOrderService, AuthService, Loading, ExcelReaderService) {
    $scope.order_number = $stateParams.order_number;
    $scope.orders = [];
    $scope.importBtns = [{
      text: '导出',
      clickCallback: exportExecl
    }];
    $scope.getAreaOrderDetail = function () {
      Loading.show();
      AreaOrderService.getAreaOrderDetail($scope.order_number).then(function (data) {
        if (data && !data.err) {
          $scope.orders = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    $scope.getAreaOrderDetail();

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('AuthService', function (user) {
      $scope.user = user;
    });

    $scope.approveAreaOrder = function (o) {
      if (o.status === '已审核') {
        return;
      }
      AreaOrderService.approveAreaOrder(o).then(function (data) {
        if (data && !data.err) {
          $state.go('order_detail', {}, {reload: true});
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        'SKU编码',
        '产品条码',
        '品类',
        '中分类名称',
        '销售价格',
        'ABC分类',
        'ABC类说明',
        'ABC类别%',
        '上月月结库存包括店柜库存',
        '在途已订购未交货',
        '安全库存2个月',
        '当月销售预测',
        '后1月销售预测',
        '后2月销售预测',
        '后3月销售预测',
        '后4月销售预测',
        '后5月销售预测',
        '后6月销售预测',
        '当月上传批发订单',
        '当月订单系统建议',
        '修改',
        '修改%',
        '备注',
        '确认超额订购?',
        '上传订单适用装',
        '最终审批适用装',
        '上传订单陈列',
        '最终审批陈列',
        '最终审批大货数',
        '总金额',
        '审批状态'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product.product_name,
          o.product.product_number,
          o.product.product_barcode,
          o.product.category,
          o.product.mid_classify,
          o.product.sales_price,
          o.product.abc_classify,
          o.product.abc_classify_explain,
          o.product.abc_category,
          o.last_month_stock_count,
          o.last_month_onway_count,
          o.safe_stock,
          o.next_month_sales_forecast_0,
          o.next_month_sales_forecast_1,
          o.next_month_sales_forecast_2,
          o.next_month_sales_forecast_3,
          o.next_month_sales_forecast_4,
          o.next_month_sales_forecast_5,
          o.next_month_sales_forecast_6,
          o.D02,
          o.system_suggest_count,
          o.system_suggest_count_modify,
          o.system_suggest_count_modify_percent,
          o.remark,
          '',
          o.D03,
          o.D03_approve,
          o.D04,
          o.D04_approve,
          o.D01_approve,
          '',
          o.status
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderHistoryCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
  $scope.importBtns = [];
  $scope.location = window.location;
  $scope.$on('suggest.import.changed', function (event, data) {
    $scope.importBtns = data.btns;
    $scope.title = data.title;
  });

  $scope.user = AuthService.getUser() || {};
  AuthService.onUserUpdated('AuthService', function (user) {
    $scope.user = user;
  });

}]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderHqApproveAreaCtrl', ['$scope', '$state', '$stateParams', 'AuthService', 'AreaOrderService', 'Loading','ExcelReaderService',
  function ($scope, $state, $stateParams, AuthService, AreaOrderService, Loading,ExcelReaderService) {
    $scope.importBtns = [];
    $scope.order_number = $stateParams.order_number;
    $scope.location = window.location;
    $scope.importBtns = [{
      text: '导出',
      clickCallback: exportExecl
    }];
    $scope.orders = [];
    $scope.getAreaOrderDetail = function () {
      Loading.show();
      AreaOrderService.getAreaOrderDetail($scope.order_number).then(function (data) {
        if (data && !data.err) {
          $scope.orders = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
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
      Loading.show();
      var sales = [];

      $scope.orders.forEach(function (sale) {
        sales.push({
          _id: sale._id,
          order_number: sale.order_number,
          D01_approve: sale.D01_approve,
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

    $scope.getD01Approve = function (order) {
      order.D01_approve = order.system_suggest_count_modify;
      return order.D01_approve;
    };

    $scope.updateApprove = function (order) {
      order.D01_approve = order.system_suggest_count_modify;
    };


    function upload(orders, i) {
      AreaOrderService.approveAreaOrders(orders[i++])
        .then(function (data) {
          console.log(data);
          if (orders[i]) {
            upload(orders, i);
          }
          else {
            Loading.hide();
            $state.go('order_hq_approve_area', {}, {reload: true});
          }
        }, function (err) {
          Loading.hide();
          console.log(err);
        });
    }

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        'SKU编码',
        '产品条码',
        '品类',
        '中分类名称',
        '销售价格',
        'ABC分类',
        'ABC类说明',
        'ABC类别%',
        '上月月结库存包括店柜库存',
        '在途已订购未交货',
        '安全库存2个月',
        '当月销售预测',
        '后1月销售预测',
        '后2月销售预测',
        '后3月销售预测',
        '后4月销售预测',
        '后5月销售预测',
        '后6月销售预测',
        '当月上传批发订单',
        '当月订单系统建议',
        '修改',
        '修改%',
        '备注',
        '确认超额订购?',
        '次品',
        '近效期库存',
        '上传订单试用装',
        '最终审批试用装',
        '上传订单陈列',
        '最终审批陈列',
        '最终审批订货数',
        '总金额',
        '审批状态'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product.product_name,
          o.product.product_number,
          o.product.product_barcode,
          o.product.category,
          o.product.mid_classify,
          o.product.sales_price,
          o.product.abc_classify,
          o.product.abc_classify_explain,
          o.product.abc_category,
          o.last_month_stock_count,
          o.last_month_onway_count,
          o.safe_stock,
          o.next_month_sales_forecast_0,
          o.next_month_sales_forecast_1,
          o.next_month_sales_forecast_2,
          o.next_month_sales_forecast_3,
          o.next_month_sales_forecast_4,
          o.next_month_sales_forecast_5,
          o.next_month_sales_forecast_6,
          o.D02,
          o.system_suggest_count,
          o.system_suggest_count_modify,
          o.system_suggest_count_modify_percent + '%',
          o.remark,
          o.is_sure === '是' ? '是' : '',
          o.product.jinyi_ungenuine_goods,
          o.product.jinyi_validity,
          o.D03,
          o.D03_approve,
          o.D04,
          o.D04_approve,
          $scope.getD01Approve(o),
          o.D01_approve * o.product.sales_price,
          o.status
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderHqDetailCtrl', ['$scope', '$state', '$stateParams', 'AuthService', 'AreaOrderService', 'HqOrderService', 'Loading', 'ExcelReaderService',
  function ($scope, $state, $stateParams, AuthService, AreaOrderService, HqOrderService, Loading, ExcelReaderService) {
    $scope.importBtns = [{
      text: '导出',
      clickCallback: exportExecl
    }];
    $scope.order_number = $stateParams.order_number;
    $scope.location = window.location;

    $scope.orders = [];
    $scope.getHqOrderDetail = function () {
      Loading.show();
      HqOrderService.getHqOrderDetail($scope.order_number).then(function (data) {
        if (data && !data.err) {
          $scope.orders = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('AuthService', function (user) {
      $scope.user = user;
    });
    $scope.getHqOrderDetail();

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        '产品编码',
        '产品条码',
        '品类',
        '中分类名称',
        '销售价格',
        '晋颖成本价',
        'ABC分类',
        'ABC类说明',
        'ABC类别%',
        '上月月结库存总部正品库存',
        '在途以采购地区在途',
        '地区月结库存包括店柜库存',
        '地区在途',
        '次品',
        '近效期库存',
        '月均销售前3个月平均',
        '安全库存2个月',
        '后1月销售',
        '后2月销售',
        '后3月销售',
        '后4月销售',
        '后5月销售',
        '后6月销售',
        '当月汇总地区已审批订单',
        '当月汇总地区使用装',
        '当月汇总地区陈列',
        '上传其他订单批发',
        '上传其他订单试用装',
        '上传其他订单陈列',
        '上传其他订单经销商',
        '上传其他订单电商',
        '上传其他订单茂姿',
        '当月总部订单系统建议',
        'MOQ系统建议',
        '修改',
        '修改%',
        '备注',
        '已取得上级核准',
        '工厂MOQ',
        'MOQ备注',
        '订单达MOQ%必采购',
        '澳妆最终审批采购量',
        '澳妆最终审批采购金额',
        '澳妆最终审批采购零售金额',
        '计划交货数',
        '计划交期',
        '实际收货数',
        '实际交期',
        '在途数',
        '剩余计划交期',
        '状态'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product.product_name,
          o.product_number,
          o.product.product_barcode,
          o.product.category,
          o.product.mid_classify,
          o.product.sales_price,
          o.product.jinyi_cost,
          o.product.abc_classify,
          o.product.abc_classify_explain,
          o.product.abc_category,
          o.genuine_goods,
          '',
          '',
          '',
          o.product.jinyi_ungenuine_goods,
          o.product.jinyi_validity,
          o.next_month_sales_forecast_0,
          o.safe_stock,
          o.next_month_sales_forecast_1,
          o.next_month_sales_forecast_2,
          o.next_month_sales_forecast_3,
          o.next_month_sales_forecast_4,
          o.next_month_sales_forecast_5,
          o.next_month_sales_forecast_6,
          o.D01_approve,
          o.D03,
          o.D04,
          o.Y02,
          o.Y03,
          o.Y04,
          o.Y05,
          o.Y06,
          o.Y07,
          o.system_suggest_count,
          o.final_system_suggest_count,
          o.system_suggest_count_modify,
          o.system_suggest_count_modify_percent + '%',
          o.remark,
          o.is_sure === '是' ? '是' : '',
          o.product.factory_moq,
          o.product.moq_remark,
          o.product.order_count_exceed_moq,
          o.final_purchased_count,
          o.final_purchased_count * o.product.jinyi_cost,
          o.final_purchased_count * o.product.sales_price,
          o.plan_delivery_count,
          o.plan_delivery_time,
          o.real_delivery_count,
          o.real_delivery_time,
          o.onway_count,
          o.final_plan_delivery_time,
          o.status
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }

  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderQueryCtrl', ['$scope', '$state', 'AreaOrderService', 'HqOrderService', 'AuthService', 'Loading',
  function ($scope, $state, AreaOrderService, HqOrderService, AuthService, Loading) {
    $scope.goDetail = function (o) {
      if ($scope.user.account_type === '地区总部') {
        if (o.object === 'areaSubmitOrder') {
          $state.go('order_hq_approve_area', {order_number: o.order_number});
        }
        if (o.object === 'hqSubmitOrder') {
          $state.go('order_hq_detail', {order_number: o.order_number});
        }
      }

      if ($scope.user.account_type === '地区分公司') {
        $state.go('order_detail', {order_number: o.order_number});
      }

      if ($scope.user.account_type === '澳妆供应链') {
        $state.go('order_re_approve_hq', {order_number: o.order_number});
      }


    };
    $scope.user = AuthService.getUser() || {};
    $scope.signOut = function () {
      AuthService.signOut();
    };

    $scope.orders = [];
    $scope.getAreaOrderList = function (callback) {
      Loading.show();
      AreaOrderService.getAreaOrderList().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.orders = $scope.orders.concat(data);
        }
        if (callback) {
          return callback();
        }
        Loading.hide();
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    $scope.getHqOrderList = function () {
      Loading.show();
      HqOrderService.getHqOrderList().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.orders = $scope.orders.concat(data);
        }
        Loading.hide();
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    if ($scope.user.account_type === '地区总部') {
      $scope.getAreaOrderList();
      $scope.getHqOrderList();
    }

    if ($scope.user.account_type === '地区分公司') {
      $scope.getAreaOrderList();
    }

    if ($scope.user.account_type === '澳妆供应链') {
      $scope.getHqOrderList();
    }
    moment().locale('zh-cn');
    $scope.moment = moment;
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderReApproveHqCtrl', ['$scope', '$state', '$stateParams', 'AuthService', 'AreaOrderService', 'HqOrderService', 'Loading', '$rootScope', 'ExcelReaderService',
  function ($scope, $state, $stateParams, AuthService, AreaOrderService, HqOrderService, Loading, $rootScope, ExcelReaderService) {
    $scope.importBtns = [];
    $scope.order_number = $stateParams.order_number;
    $scope.location = window.location;
    $scope.$on('suggest.import.changed', function (event, data) {
      $scope.importBtns = data.btns;
      $scope.title = data.title;
    });

    $scope.orders = [];
    $scope.getAreaOrderDetail = function () {
      Loading.show();
      AreaOrderService.getAreaOrderDetail($scope.order_number).then(function (data) {
        if (data && !data.err) {
          $scope.orders = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('AuthService', function (user) {
      $scope.user = user;
    });
    $scope.getAreaOrderDetail();

    $scope.approveHqOrders = function () {
      var sales = [];
      Loading.show();

      $scope.orders.forEach(function (sale) {
        sales.push({
          _id: sale._id,
          order_number: sale.order_number,
          final_purchased_count: sale.final_purchased_count,
          final_purchased_price: sale.final_purchased_price
        });
      });
      var final_sales = [];
      for (var i = 0, len = sales.length; i < len; i += 40) {
        final_sales.push(sales.slice(i, i + 40));
      }

      upload(final_sales, 0);
    };


    function upload(orders, i) {
      HqOrderService.approveHqOrders(orders[i++])
        .then(function (data) {
          console.log(data);
          if (orders[i]) {
            upload(orders, i);
          }
          else {
            Loading.hide();
            $state.go('order_re_approve_hq', {}, {reload: true});
          }
        }, function (err) {
          console.log(err);
          Loading.hide();
        });
    }

    $scope.approveHqOrder = function (o) {
      HqOrderService.approveHqOrder(o).then(function (data) {
        console.log(data);
        if (data && !data.err) {
          o.status = data.status;
          alert('ok');
        }
      }, function (data) {
        console.log(data);
      });
    };

    $scope.inputPurchaseCount = function (order) {
      order.final_purchased_price = order.final_purchased_count * order.product.sales_price;
    };

    $scope.importHqDeliveryTime = function () {
      importHqDeliveryTime()
    };

    function importHqDeliveryTime() {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '实际收货数'},
        {key: 'D1', value: '实际交期'},
        {key: 'E1', value: '剩余计划交期'}
      ];

      function upload(timeInfos, i) {
        HqOrderService.importHqDeliveryTime($scope.order_number, timeInfos[i++])
          .then(function (data) {
            console.log(data);

            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              return $state.go('order_re_approve_hq', {}, {reload: true});
            }

            if (timeInfos[i]) {
              upload(timeInfos, i);
            }
            else {
              Loading.hide();
              $state.go('order_re_approve_hq', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      $scope.otherOrderImport = function (orders) {
        var i = 0;
        Loading.show();
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传交期',
        contents: [{
          key: '上传交期',
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '澳妆审批采购订单页面'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              product_name: item['产品名称'],
              real_delivery_count: item['实际收货数'],
              real_delivery_time: item['实际交期'],
              final_plan_delivery_time: item['剩余计划交期']
            });
          });
          var timeInfos = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            timeInfos.push(result.slice(i, i + 100));
          }
          if (timeInfos.length > 0) {
            upload(timeInfos, 0);
          }
          console.log(timeInfos);
        }
      });
    }

    $scope.exportSystemSuggest = function () {
      exportSystemSuggest();
    };

    function exportSystemSuggest() {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        'SKU编码',
        '产品条码',
        '品类',
        '中分类名称',
        '销售价格',
        '晋颖成本价',
        'ABC分类',
        'ABC类说明',
        'ABC类别%',
        '上月月结库存总部正品库存',
        '上月月结总部在途',
        '次品',
        '近效期库存',
        '月均销售前3个月平均',
        '安全库存2个月',
        '后1月销售',
        '后2月销售',
        '后3月销售',
        '后4月销售',
        '后5月销售',
        '后6月销售',
        '当月汇总地区已审批订单',
        '当月汇总地区使用装',
        '当月汇总地区陈列',
        '上传其他订单批发',
        '上传其他订单试用装',
        '上传其他订单陈列',
        '上传其他订单经销商',
        '上传其他订单电商',
        '上传其他订单茂姿',
        '当月总部订单系统建议',
        'MOQ系统建议',
        '修改',
        '修改%',
        '备注',
        '已取得上级核准',
        '工厂MOQ',
        'MOQ备注',
        '订单达MOQ%必采购',
        '澳妆最终审批采购量',
        '澳妆最终审批采购金额',
        '澳妆最终审批采购零售金额',
        '计划交货数',
        '计划交期',
        '实际收货数',
        '实际交期',
        '在途数',
        '剩余计划交期',
        '状态'
      ]];

      $scope.orders.forEach(function (s) {
        rows.push([
          s.product.product_name,
          s.product_number,
          s.product.product_barcode,
          s.product.category,
          s.product.mid_classify,
          s.product.sales_price,
          s.product.jinyi_cost,
          s.product.abc_classify,
          s.product.abc_classify_explain,
          s.product.abc_category,
          s.genuine_goods,
          s.onway_goods,
          s.product.jinyi_ungenuine_goods,
          s.product.jinyi_validity,
          s.next_month_sales_forecast_0,
          s.safe_stock,
          s.next_month_sales_forecast_1,
          s.next_month_sales_forecast_2,
          s.next_month_sales_forecast_3,
          s.next_month_sales_forecast_4,
          s.next_month_sales_forecast_5,
          s.next_month_sales_forecast_6,
          s.D01_approve,
          s.D03,
          s.D04,
          s.Y02,
          s.Y03,
          s.Y04,
          s.Y05,
          s.Y06,
          s.Y07,
          s.system_suggest_count,
          s.final_system_suggest_count,
          s.system_suggest_count_modify,
          s.system_suggest_count_modify_percent + '%',
          s.remark,
          s.is_sure === '是' ? '是' : '',
          s.product.factory_moq,
          s.product.moq_remark,
          s.product.order_count_exceed_moq,
          s.final_purchased_count,
          s.final_purchased_count*s.product.jinyi_cost,
          s.final_purchased_count*s.product.sales_price,
          s.plan_delivery_count,
          s.plan_delivery_time,
          s.real_delivery_count,
          s.real_delivery_time,
          s.onway_count,
          s.final_plan_delivery_time,
          s.status
        ]);
      });
      execlReader.exportExcel(rows);
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('OrderSuggestCtrl', ['$scope', '$state', '$rootScope', 'AuthService',function ($scope, $state, $rootScope,AuthService) {
  $scope.location = window.location;
  $scope.importBtns = [];
  $scope.info={
    title:''
  };
  $rootScope.$on('suggest.import.changed', function (event, data) {
    $scope.importBtns = data.btns;
    $scope.info.title = data.title;
  });
  $scope.user = AuthService.getUser() || {};
  $scope.signOut = function () {
    AuthService.signOut();
  };

}]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SettingHistoryCtrl', ['$scope', 'UserService', function ($scope, UserService) {
  $scope.logs = [];
  $scope.getLog = function () {
    UserService.getLog().then(function (data) {
      console.log(data);
      if (data && !data.err) {
        $scope.logs = data;
      }
    }, function (data) {
      console.log(data);
    });
  };
  $scope.getLog();
}]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SettingHomeCtrl', function () {

});
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SettingPasswordCtrl', ['$scope', 'UserService','Loading', function ($scope, UserService,Loading) {
  $scope.info = {
    old_password: '',
    new_password: '',
    re_password: ''
  };


  $scope.changePassword = function () {
    if (!$scope.info.old_password) {
     return alert('请输入原始密码');
    }
    if (!$scope.info.new_password) {
      return alert('请输入新密码');
    }
    if (!$scope.info.re_password) {
      return alert('请确认密码');
    }

    if ($scope.info.re_password !== $scope.info.new_password) {
      return alert('确认密码不一致');
    }

    UserService.changePassword($scope.info.old_password, $scope.info.new_password).then(function (data) {
      Loading.show();
      console.log(data);
      if (data && !data.err) {
        alert('修改成功');
        $scope.info = {
          old_password: '',
          new_password: '',
          re_password: ''
        };
      }
      Loading.hide();
    }, function (data) {
      Loading.hide();
      console.log(data);
    });
  }
}]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaLastMonthCtrl', ['$scope', '$rootScope', '$state', 'AreaOrderService', 'Loading', 'ExcelReaderService',
    function ($scope, $rootScope, $state, AreaOrderService, Loading, ExcelReaderService) {
        $scope.$emit('suggest.import.changed', {
            title: '建议订单',
            btns: [
                {
                    text: '导入上月销售,库存,在途',
                    clickCallback: salesClickCallback
                },
                {
                    text: '导出',
                    clickCallback: exportExecl
                }
            ]
        });

        $scope.sales = [];
        $scope.getSalesByArea = function () {
            Loading.show();
            AreaOrderService.getSalesByArea().then(function (data) {
                if (!data.err) {
                    $scope.sales = data;
                }
                Loading.hide();
                console.log(data);
            }, function (data) {
                Loading.hide();
                console.log(data);
            });
        };
        $scope.getSalesByArea();

        function salesClickCallback() {
            var headers = [
                {key: 'A1', value: 'SKU编码'},
                {key: 'B1', value: '上月销售量'},
                {key: 'C1', value: '上月月结库存量'},
                {key: 'D1', value: '上月月结在途量'}
            ];

            function upload(saleses, i) {
                AreaOrderService.areaSalesStockOnwayImport(saleses[i++])
                    .then(function (data) {
                        if (data && data.err && data.err.type === 'product_not_exist') {
                            alert(data.err.message);
                            return $state.go('order_suggest.suggest_area_last_month', {}, {reload: true});
                        }

                        console.log(data);
                        if (saleses[i]) {
                            upload(saleses, i);
                        }
                        else {
                            Loading.hide();
                            $state.go('order_suggest.suggest_area_last_month', {}, {reload: true});
                        }
                    }, function (err) {
                        Loading.hide();
                        console.log(err);
                    });
            }

            $scope.areaSalesStockOnwayImport = function (saleses) {
                Loading.show();
                var i = 0;
                upload(saleses, i);
            };

            $rootScope.$broadcast('show.dialogUpload', {
                title: '上传销量库存在途量',
                contents: [{
                    key: '请选择需要上传的销量库存在途量文件',
                    value: '点击选择文件',
                    tip: '点击选择文件',
                    sheetName: '分区'
                }],
                color: 'blue',
                headers: headers,
                callback: function (data) {
                    var result = [];
                    data.forEach(function (item) {
                        result.push({
                            product_number: item['SKU编码'],
                            last_month_sales_count: item['上月销售量'],
                            last_month_stock_count: item['上月月结库存量'],
                            last_month_onway_count: item['上月月结在途量'],
                        });
                    });
                    var sales = [];
                    for (var i = 0, len = result.length; i < len; i += 100) {
                        sales.push(result.slice(i, i + 100));
                    }
                    if (sales.length > 0) {
                        $scope.areaSalesStockOnwayImport(sales);
                    }
                    console.log(sales);
                }
            });
        }

        $scope.exportExcel = function () {
            var execlReader = ExcelReaderService.getReader();
            var rows = [[
                'SKU编码',
                '产品名称',
                '上月月结库存',
                '上月月结在途',
                '上1个月销售量',
                '上2个月销售量',
                '上3个月销售量'
            ]];

            $scope.sales.forEach(function (o) {
                rows.push([
                    o.product_number,
                    o.product.product_name,
                    o.last_month_stock_count,
                    o.last_month_onway_count,
                    o.last_month_sales_count,
                    o.last_month_sales_count_2 || '未知',
                    o.last_month_sales_count_3 || '未知'
                ]);
            });

            execlReader.exportExcel(rows);
        };

        function exportExecl() {
            $scope.exportExcel();
        }


    }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaOtherD02Ctrl', ['$scope', '$rootScope', '$state', 'AreaOrderService', 'Loading','ExcelReaderService',
  function ($scope, $rootScope, $state, AreaOrderService, Loading,ExcelReaderService) {
    $scope.curSubmitOrder = {};
    $scope.getCurrentAreaSubmitOrder = function () {
      AreaOrderService.getCurrentAreaSubmitOrder().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_D02);
        }
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getCurrentAreaSubmitOrder();
    $scope.changeImportBtn = function (text) {
      if (text === '有') {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: [
            {
              text: '上传批发订单',
              clickCallback: function () {
                orderClickCallback('D02');
              }
            },
            {
              text: '导出',
              clickCallback: exportExecl
            }
          ]
        });
      }
      else {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: []
        });
      }
    };

    $scope.clickOrderStatus = function (status) {
      $scope.curSubmitOrder.has_D02 = status;
      $scope.updateSubmitOrderStatus();
    };

    $scope.updateSubmitOrderStatus = function () {
      AreaOrderService.updateSubmitOhterOrderStatus({
        _id: $scope.curSubmitOrder._id,
        has_D02: $scope.curSubmitOrder.has_D02,
        has_D03: $scope.curSubmitOrder.has_D03,
        has_D04: $scope.curSubmitOrder.has_D04
      }).then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_D02);
        }
      }, function (data) {
        console.log(data);
      });
    };

    $scope.orders = [];
    $scope.getOrdersByArea = function () {
      Loading.show();
      AreaOrderService.getOrdersByArea('D02').then(function (data) {
        if (!data.err) {
          $scope.orders = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };
    $scope.getOrdersByArea();

    function orderClickCallback(orderType) {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '产品条码'},
        {key: 'D1', value: '品类'},
        {key: 'E1', value: '中分类名称'},
        {key: 'F1', value: '销售价格'},
        {key: 'G1', value: '订单数量'},
        {key: 'H1', value: '总销售价格'}
      ];

      function upload(orders, i) {
        AreaOrderService.otherOrderImport(orders[i++])
          .then(function (data) {
            console.log(data);

            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              return $state.go('order_suggest.suggest_area_other_D02', {}, {reload: true});
            }

            if (orders[i]) {
              upload(orders, i);
            }
            else {
              Loading.hide();
              $state.go('order_suggest.suggest_area_other_D02', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      function getContentKey(type) {
        switch (type) {
          case  'D02':
            return '批发订单';
          case  'D03':
            return '试用订单';
          case  'D04':
            return '陈列订单';
        }
        return '';
      }

      $scope.otherOrderImport = function (orders) {
        var i = 0;
        Loading.show();
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传' + getContentKey(orderType),
        contents: [{
          key: getContentKey(orderType),
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '地区上传其他订单页面格式'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              product_name: item['产品名称'],
              product_barcode: item['产品条码'],
              category: item['品类'],
              mid_classify: item['中分类名称'],
              sales_price: item['销售价格'],
              order_count: item['订单数量'],
              order_type: orderType,
              total_price: item['总销售价格']
            });
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            orders.push(result.slice(i, i + 100));
          }
          if (orders.length > 0) {
            $scope.otherOrderImport(orders);
          }
          console.log(orders);
        }
      });
    }

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
       '产品名称',
       'SKU编码',
       '产品条码',
       '订单编码',
       '品类',
       '中分类名称',
       '销售价格',
       '订单数量',
       '总销售价格'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product_name,
          o.product_number,
          o.product_barcode,
          o.order_number,
          o.category,
          o.mid_classify,
          o.sales_price,
          o.order_count,
          o.sales_price*o.order_count
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaOtherD03Ctrl', ['$scope', '$rootScope', '$state', 'AreaOrderService', 'Loading','ExcelReaderService',
  function ($scope, $rootScope, $state, AreaOrderService, Loading,ExcelReaderService) {
    $scope.curSubmitOrder = {};
    $scope.getCurrentAreaSubmitOrder = function () {
      AreaOrderService.getCurrentAreaSubmitOrder().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_D03);
        }
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getCurrentAreaSubmitOrder();
    $scope.clickOrderStatus = function (status) {
      $scope.curSubmitOrder.has_D03 = status;
      $scope.updateSubmitOrderStatus();
    };

    $scope.changeImportBtn = function (text) {
      if (text === '有') {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: [
            {
              text: '上传试用订单',
              clickCallback: function () {
                orderClickCallback('D03');
              }
            },
            {
              text: '导出',
              clickCallback: exportExecl
            }
          ]
        });
      }
      else {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: []
        });
      }
    };


    $scope.updateSubmitOrderStatus = function () {
      AreaOrderService.updateSubmitOhterOrderStatus({
        _id: $scope.curSubmitOrder._id,
        has_D02: $scope.curSubmitOrder.has_D02,
        has_D03: $scope.curSubmitOrder.has_D03,
        has_D04: $scope.curSubmitOrder.has_D04
      }).then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_D03);
        }
      }, function (data) {
        console.log(data);
      });
    };
    $scope.orders = [];
    $scope.getOrdersByArea = function () {
      Loading.show();
      AreaOrderService.getOrdersByArea('D03').then(function (data) {
        if (!data.err) {
          $scope.orders = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };
    $scope.getOrdersByArea();

    function orderClickCallback(orderType) {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '产品条码'},
        {key: 'D1', value: '品类'},
        {key: 'E1', value: '中分类名称'},
        {key: 'F1', value: '销售价格'},
        {key: 'G1', value: '订单数量'},
        {key: 'H1', value: '总销售价格'}
      ];

      function upload(orders, i) {
        AreaOrderService.otherOrderImport(orders[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              return $state.go('order_suggest.suggest_area_other_D03', {}, {reload: true});
            }

            console.log(data);
            if (orders[i]) {
              upload(orders, i);
            }
            else {
              Loading.hide();
              $state.go('order_suggest.suggest_area_other_D03', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      function getContentKey(type) {
        switch (type) {
          case  'D02':
            return '批发订单';
          case  'D03':
            return '试用订单';
          case  'D04':
            return '陈列订单';
        }
        return '';
      }

      $scope.otherOrderImport = function (orders) {
        var i = 0;
        Loading.show();
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传' + getContentKey(orderType),
        contents: [{
          key: getContentKey(orderType),
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '地区上传其他订单页面格式'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              product_name: item['产品名称'],
              product_barcode: item['产品条码'],
              category: item['品类'],
              mid_classify: item['中分类名称'],
              sales_price: item['销售价格'],
              order_count: item['订单数量'],
              order_type: orderType,
              total_price: item['总销售价格']
            });
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            orders.push(result.slice(i, i + 100));
          }
          if (orders.length > 0) {
            $scope.otherOrderImport(orders);
          }
          console.log(orders);
        }
      });
    }
    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        'SKU编码',
        '产品条码',
        '订单编码',
        '品类',
        '中分类名称',
        '销售价格',
        '订单数量',
        '总销售价格'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product_name,
          o.product_number,
          o.product_barcode,
          o.order_number,
          o.category,
          o.mid_classify,
          o.sales_price,
          o.order_count,
          o.sales_price*o.order_count
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaOtherD04Ctrl', ['$scope', '$rootScope', '$state', 'AreaOrderService', 'Loading', 'ExcelReaderService',
    function ($scope, $rootScope, $state, AreaOrderService, Loading, ExcelReaderService) {
        $scope.curSubmitOrder = {};
        $scope.getCurrentAreaSubmitOrder = function () {
            AreaOrderService.getCurrentAreaSubmitOrder().then(function (data) {
                console.log(data);
                if (data && !data.err) {
                    $scope.curSubmitOrder = data;
                    $scope.changeImportBtn(data.has_D04);
                }
            }, function (data) {
                console.log(data);
            });
        };
        $scope.getCurrentAreaSubmitOrder();
        $scope.changeImportBtn = function (text) {
            if (text === '有') {
                $scope.$emit('suggest.import.changed', {
                    title: '建议订单',
                    btns: [
                        {
                            text: '上传陈列订单',
                            clickCallback: function () {
                                orderClickCallback('D04');
                            }
                        },
                        {
                            text: '导出',
                            clickCallback: exportExecl
                        }
                    ]
                });
            }
            else {
                $scope.$emit('suggest.import.changed', {
                    title: '建议订单',
                    btns: []
                });
            }
        };


        $scope.clickOrderStatus = function (status) {
            $scope.curSubmitOrder.has_D04 = status;
            $scope.updateSubmitOrderStatus();
        };

        $scope.updateSubmitOrderStatus = function () {
            AreaOrderService.updateSubmitOhterOrderStatus({
                _id: $scope.curSubmitOrder._id,
                has_D02: $scope.curSubmitOrder.has_D02,
                has_D03: $scope.curSubmitOrder.has_D03,
                has_D04: $scope.curSubmitOrder.has_D04
            }).then(function (data) {
                console.log(data);
                if (data && !data.err) {
                    $scope.curSubmitOrder = data;
                    $scope.changeImportBtn(data.has_D04);
                }
            }, function (data) {
                console.log(data);
            });
        };

        $scope.orders = [];
        $scope.getOrdersByArea = function () {
            Loading.show();
            AreaOrderService.getOrdersByArea('D04').then(function (data) {
                if (!data.err) {
                    $scope.orders = data;
                }
                Loading.hide();
                console.log(data);
            }, function (data) {
                Loading.hide();
                console.log(data);
            });
        };
        $scope.getOrdersByArea();

        function orderClickCallback(orderType) {
            var headers = [
                {key: 'A1', value: 'SKU编码'},
                {key: 'B1', value: '产品名称'},
                {key: 'C1', value: '产品条码'},
                {key: 'D1', value: '品类'},
                {key: 'E1', value: '中分类名称'},
                {key: 'F1', value: '销售价格'},
                {key: 'G1', value: '订单数量'},
                {key: 'H1', value: '总销售价格'}
            ];

            function upload(orders, i) {
                AreaOrderService.otherOrderImport(orders[i++])
                    .then(function (data) {
                        if (data && data.err && data.err.type === 'product_not_exist') {
                            alert(data.err.message);
                            return $state.go('order_suggest.suggest_area_other_D04', {}, {reload: true});
                        }

                        console.log(data);
                        if (orders[i]) {
                            upload(orders, i);
                        }
                        else {
                            Loading.hide();
                            $state.go('order_suggest.suggest_area_other_D04', {}, {reload: true});
                        }
                    }, function (err) {
                        Loading.hide();
                        console.log(err);
                    });
            }

            function getContentKey(type) {
                switch (type) {
                    case  'D02':
                        return '批发订单';
                    case  'D03':
                        return '试用订单';
                    case  'D04':
                        return '陈列订单';
                }
                return '';
            }

            $scope.otherOrderImport = function (orders) {
                var i = 0;
                Loading.show();
                upload(orders, i);
            };

            $rootScope.$broadcast('show.dialogUpload', {
                title: '上传' + getContentKey(orderType),
                contents: [{
                    key: getContentKey(orderType),
                    value: '点击选择文件',
                    tip: '点击选择文件',
                    sheetName: '地区上传其他订单页面格式'
                }],
                color: 'blue',
                headers: headers,
                callback: function (data) {
                    var result = [];
                    data.forEach(function (item) {
                        result.push({
                            product_number: item['SKU编码'],
                            product_name: item['产品名称'],
                            product_barcode: item['产品条码'],
                            category: item['品类'],
                            mid_classify: item['中分类名称'],
                            sales_price: item['销售价格'],
                            order_count: item['订单数量'],
                            order_type: orderType,
                            total_price: item['总销售价格']
                        });
                    });
                    var orders = [];
                    for (var i = 0, len = result.length; i < len; i += 100) {
                        orders.push(result.slice(i, i + 100));
                    }
                    if (orders.length > 0) {
                        $scope.otherOrderImport(orders);
                    }
                    console.log(orders);
                }
            });
        }

        $scope.exportExcel = function () {
            var execlReader = ExcelReaderService.getReader();
            var rows = [[
                '产品名称',
                'SKU编码',
                '产品条码',
                '订单编码',
                '品类',
                '中分类名称',
                '销售价格',
                '订单数量',
                '总销售价格'
            ]];

            $scope.orders.forEach(function (o) {
                rows.push([
                    o.product_name,
                    o.product_number,
                    o.product_barcode,
                    o.order_number,
                    o.category,
                    o.mid_classify,
                    o.sales_price,
                    o.order_count,
                    o.sales_price * o.order_count
                ]);
            });

            execlReader.exportExcel(rows);
        };

        function exportExecl() {
            $scope.exportExcel();
        }
    }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaOtherOrderCtrl', ['$scope', '$rootScope', '$state', 'AreaOrderService','Loading',
  function ($scope, $rootScope, $state, AreaOrderService,Loading) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单',
      btns: [
        {
          text: '上传批发订单',
          clickCallback: function () {
            orderClickCallback('D02');
          }
        },
        {
          text: '上传试用订单',
          clickCallback: function () {
            orderClickCallback('D03');
          }
        },
        {
          text: '上传陈列订单',
          clickCallback: function () {
            orderClickCallback('D04');
          }
        }
      ]
    });
    $scope.orders = [];
    $scope.getOrdersByArea = function () {
      Loading.show();
      AreaOrderService.getOrdersByArea().then(function (data) {
        if (!data.err) {
          $scope.orders = data;
        }
        Loading.hide();
        console.log(data);
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };
    $scope.getOrdersByArea();

    function orderClickCallback(orderType) {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '产品条码'},
        {key: 'D1', value: '品类'},
        {key: 'E1', value: '中分类名称'},
        {key: 'F1', value: '销售价格'},
        {key: 'G1', value: '订单数量'},
        {key: 'H1', value: '总销售价格'}
      ];

      function upload(orders, i) {
        AreaOrderService.otherOrderImport(orders[i++])
          .then(function (data) {
            console.log(data);
            if (orders[i]) {
              upload(orders, i);
            }
            else {
              Loading.hide();
              $state.go('order_suggest.suggest_area_other_order', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      function getContentKey(type) {
        switch (type) {
          case  'D02':
            return '批发订单';
          case  'D03':
            return '试用订单';
          case  'D04':
            return '陈列订单';
        }
        return '';
      }

      $scope.otherOrderImport = function (orders) {
        var i = 0;
        Loading.show();
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传' + getContentKey(orderType),
        contents: [{
          key: getContentKey(orderType),
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '地区上传其他订单页面格式'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              product_name: item['产品名称'],
              product_barcode: item['产品条码'],
              category: item['品类'],
              mid_classify: item['中分类名称'],
              sales_price: item['销售价格'],
              order_count: item['订单数量'],
              order_type: orderType,
              total_price: item['总销售价格']
            });
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            orders.push(result.slice(i, i + 100));
          }
          if (orders.length > 0) {
            $scope.otherOrderImport(orders);
          }
          console.log(orders);
        }
      });
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaSuggestResultCtrl', ['$scope', '$rootScope', '$state', 'AreaOrderService', 'Loading', 'ExcelReaderService',
  function ($scope, $rootScope, $state, AreaOrderService, Loading, ExcelReaderService) {
    $scope.curSubmitOrder = {};
    $scope.getCurrentAreaSubmitOrder = function () {
      AreaOrderService.getCurrentAreaSubmitOrder().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          if ($scope.curSubmitOrder.has_D02 === '未选择') {
            return alert('请选择是否上传批发订单');
          }
          if ($scope.curSubmitOrder.has_D03 === '未选择') {
            return alert('请选择是否上传试用装订单');
          }
          if ($scope.curSubmitOrder.has_D04 === '未选择') {
            return alert('请选择是否上传陈列订单');
          }

          if (data.status !== '已审核') {
            $scope.$emit('suggest.import.changed', {
              title: '建议订单 地区建议订单（SKU）=当月预测-[地区库存(包括店柜库存) +在途-未来6月销售预测-其他订单(批发)-安全库存）]',
              btns: [
                {
                  text: '提交',
                  clickCallback: suggestOrderSubmit
                },
                {
                  text: '导出',
                  clickCallback: exportExecl
                }
              ]
            });
          }
          else {
            $scope.$emit('suggest.import.changed', {
              title: '建议订单 地区建议订单（SKU）=当月预测-[地区库存(包括店柜库存) +在途-未来6月销售预测-其他订单(批发)-安全库存）]',
              btns: [
                {
                  text: '导出',
                  clickCallback: exportExecl
                }
              ]
            });
          }

          $scope.getAreaSuggestOrder();
        }
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getCurrentAreaSubmitOrder();

    $scope.orders = [];
    $scope.getAreaSuggestOrder = function () {
      Loading.show();
      AreaOrderService.getAreaSuggestOrder().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.orders = data;
        }
        Loading.hide();
      }, function (data) {
        Loading.hide();
        console.log(data);
      });
    };

    $scope.getSystemAreaSuggest = function (sale) {
      var next_6_month_forecast =
        sale.next_month_sales_forecast_1 +
        sale.next_month_sales_forecast_2 +
        sale.next_month_sales_forecast_3 +
        sale.next_month_sales_forecast_4 +
        sale.next_month_sales_forecast_5 +
        sale.next_month_sales_forecast_6;
      var other_order_count = parseInt(sale.D02);
      sale.system_suggest_count = parseInt(sale.next_month_sales_forecast_0 - (sale.last_month_stock_count + sale.last_month_onway_count - next_6_month_forecast - other_order_count - sale.safe_stock));

      if (sale.system_suggest_count_modify === 0) {
        sale.system_suggest_count_modify = sale.system_suggest_count;
      }
      if (sale.D02_approve === 0) {
        sale.D02_approve = sale.D02;
      }

      if (sale.D03_approve === 0) {
        sale.D03_approve = sale.D03;
      }

      if (sale.D04_approve === 0) {
        sale.D04_approve = sale.D04;
      }

      if (sale.D01_approve === 0) {
        sale.D01_approve = sale.system_suggest_count_modify;
      }

      return sale.system_suggest_count;
    };

    $scope.modifySystemAreaSuggestPercent = function (sale) {
      sale.system_suggest_count_modify_percent = parseInt((sale.system_suggest_count_modify - sale.system_suggest_count) * 100 / ((sale.system_suggest_count > 0) ? sale.system_suggest_count : (-sale.system_suggest_count)));
      sale.D01_approve = sale.system_suggest_count_modify;
    };

    function suggestOrderSubmit() {
      var sales = [];

      for (var i = 0; i < $scope.orders.length; i++) {
        var sale = $scope.orders[i];
        if (sale.system_suggest_count_modify_percent >= 50 || sale.system_suggest_count_modify_percent < -50 || isNaN(sale.system_suggest_count_modify_percent)) {
          if (!sale.remark) {
            return alert('产品编码:' + sale.product.product_number + '超额订购需填写备注');
          }
          if (sale.is_sure !== '是') {
            return alert('产品编码:' + sale.product.product_number + '超额订购需上级确认');
          }
        }

        sales.push({
          _id: sale._id,
          system_suggest_count: sale.system_suggest_count,
          system_suggest_count_modify: sale.system_suggest_count_modify,
          system_suggest_count_modify_percent: sale.system_suggest_count_modify_percent,
          D01: sale.D01,
          remark: sale.remark,
          D02: sale.D02,
          D03: sale.D03,
          D04: sale.D04,
          D01_approve: sale.D01_approve,
          D02_approve: sale.D02_approve,
          D03_approve: sale.D03_approve,
          D04_approve: sale.D04_approve
        });
      }
      var final_sales = [];
      for (var i = 0, len = sales.length; i < len; i += 40) {
        final_sales.push(sales.slice(i, i + 40));
      }
      Loading.show();
      upload(final_sales, 0);
    };

    function upload(sales, i) {
      AreaOrderService.suggestOrderSubmit(sales[i++])
        .then(function (data) {
          console.log(data);
          if (sales[i]) {
            upload(sales, i);
          }
          else {
            alert('ok');
            Loading.hide();
            $state.go('order_suggest.suggest_area_suggest_result', {}, {reload: true});
          }
        }, function (err) {
          Loading.hide();
          console.log(err);
        });
    }

    $scope.sureOrder = function (order) {
      AreaOrderService.sureOrder(order).then(function (data) {
        if (data && !data.err) {
          order.is_sure = data.is_sure;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [['SKU编码',
        '产品名称',
        '产品条码',
        '品类',
        '中分类名称',
        '系列名称',
        '销售价格',
        'ABC分类',
        'ABC类说明',
        'ABC类别%',
        '上月月结库存包括店柜库存',
        '在途已订购未交货',
        '安全库存2个月',
        '当月销售预测',
        '后1月销售预测',
        '后2月销售预测',
        '后3月销售预测',
        '后4月销售预测',
        '后5月销售预测',
        '后6月销售预测',
        '当月上传批发订单',
        '当月订单系统建议',
        '修改',
        '修改%',
        '备注',
        '确认超额订购',
        '上传订单试用装',
        '上传订单陈列',
        '最终审批试用装',
        '最终审批陈列',
        '最终审批订货数',
        '总金额',
        '审批状态'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product.product_number,
          o.product.product_name,
          o.product.product_barcode,
          o.product.category,
          o.product.mid_classify,
          o.product.series_name,
          o.product.sales_price,
          o.product.abc_classify,
          o.product.abc_classify_explain,
          o.product.abc_category,
          o.last_month_stock_count,
          o.last_month_onway_count,
          o.safe_stock,
          o.next_month_sales_forecast_0,
          o.next_month_sales_forecast_1,
          o.next_month_sales_forecast_2,
          o.next_month_sales_forecast_3,
          o.next_month_sales_forecast_4,
          o.next_month_sales_forecast_5,
          o.next_month_sales_forecast_6,
          o.D02,
          o.system_suggest_count,
          o.system_suggest_count_modify,
          o.system_suggest_count_modify_percent + '%',
          o.remark,
          o.is_sure === '是' ? '已确认' : '',
          o.D03,
          o.D04,
          o.D03_approve,
          o.D04_approve,
          o.D01_approve,
          (o.D01_approve + o.D02_approve + o.D03_approve) * o.product.sales_price,
          o.status
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHomeCtrl', ['$scope', 'AuthService',function ($scope,AuthService) {
  $scope.$emit('suggest.import.changed', {
    title: '建议订单',
    btns: []
  });
  $scope.user = AuthService.getUser() || {};
  $scope.signOut = function () {
    AuthService.signOut();
  };

}]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqAgencyCtrl', ['$scope', '$state', '$rootScope', 'AuthService', 'HqOrderService','ExcelReaderService',
  function ($scope, $state, $rootScope, AuthService, HqOrderService,ExcelReaderService) {
    $scope.curSubmitOrder = {};
    $scope.getCurrentHqSubmitOrder = function () {
      HqOrderService.getCurrentHqSubmitOrder().then(function (data) {
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y05);
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getCurrentHqSubmitOrder();

    $scope.changeImportBtn = function (text) {
      if (text === '有') {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: [
            {
              text: '上传经销商订单',
              clickCallback: function () {
                orderClickCallback('Y05');
              }
            },
            {
              text: '导出',
              clickCallback: exportExecl
            }
          ]
        });
      }
      else {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: []
        });
      }
    };

    $scope.clickOrderStatus = function (status) {
      $scope.curSubmitOrder.has_Y05 = status;
      $scope.updateSubmitOrderStatus();
    };

    $scope.updateSubmitOrderStatus = function () {
      HqOrderService.updateSubmitOtherOrderStatus({
        _id: $scope.curSubmitOrder._id,
        has_Y02: $scope.curSubmitOrder.has_Y02,
        has_Y03: $scope.curSubmitOrder.has_Y03,
        has_Y04: $scope.curSubmitOrder.has_Y04,
        has_Y05: $scope.curSubmitOrder.has_Y05,
        has_Y06: $scope.curSubmitOrder.has_Y06,
        has_Y07: $scope.curSubmitOrder.has_Y07
      }).then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y05);
        }
      }, function (data) {
        console.log(data);
      });
    };

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('SuggestHqAgencyCtrl', function (user) {
      $scope.user = user;
    });

    $scope.orders = [];
    $scope.getHqOtherOrders = function () {
      HqOrderService.getHqOtherOrders('Y05').then(function (data) {
        if (!data.err) {
          $scope.orders = data;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHqOtherOrders();

    function orderClickCallback(orderType) {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '产品条码'},
        {key: 'D1', value: '品类'},
        {key: 'E1', value: '中分类名称'},
        {key: 'F1', value: '销售价格'},
        {key: 'G1', value: '晋颖成本价'},
        {key: 'H1', value: '订单数量'},
        {key: 'I1', value: '晋颖总价格'}
      ];

      function upload(orders, i) {
        HqOrderService.hqOtherOrderImport(orders[i++])
          .then(function (data) {
            console.log(data);
            if (orders[i]) {
              upload(orders, i);
            }
            else {
              $state.go('order_suggest.suggest_hq_agency', {}, {reload: true});
            }
          }, function (err) {
            console.log(err);
          });
      }

      function getContentKey(type) {
        switch (type) {
          case  'Y05':
            return '批发订单';
        }
        return '';
      }

      $scope.hqOtherOrderImport = function (orders) {
        var i = 0;
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传' + getContentKey(orderType),
        contents: [{
          key: getContentKey(orderType),
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '总部上传其他订单页面格式'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              product_name: item['产品名称'],
              product_barcode: item['产品条码'],
              category: item['品类'],
              mid_classify: item['中分类名称'],
              sales_price: item['销售价格'],
              order_count: item['订单数量'],
              order_type: orderType,
              total_price: item['总销售价格'],
              jinyi_cost: item['晋颖成本价'],
              jinyi_total_price: item['晋颖总价格']
            });
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            orders.push(result.slice(i, i + 100));
          }
          if (orders.length > 0) {
            $scope.hqOtherOrderImport(orders);
          }
          console.log(orders);
        }
      });
    }


    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        'SKU编码',
        '产品条码',
        '品类',
        '中分类名称',
        '销售价格',
        '晋颖成本价',
        '订单号码',
        '订单数量',
        '晋颖总价格'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product_name,
          o.product_number,
          o.product_barcode,
          o.category,
          o.mid_classify,
          o.sales_price,
          o.jinyi_cost,
          o.order_number,
          o.order_count,
          o.jinyi_cost*o.order_count
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqCurrentCtrl', ['$scope','$state', '$rootScope', 'HqOrderService','Loading','ExcelReaderService',
  function ($scope,$state, $rootScope, HqOrderService,Loading,ExcelReaderService) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单',
      btns: [{
        text: '导入当前库存',
        clickCallback: ClickCallback
      },
        {
          text: '导出',
          clickCallback: exportExecl
        }]
    });


    $scope.stocks = [];
    $scope.getHqCurrentStocks = function () {
      HqOrderService.getHqCurrentStocks().then(function (data) {
        if (!data.err) {
          $scope.stocks = data;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHqCurrentStocks();

    function ClickCallback() {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '正品'},
        {key: 'C1', value: '在途'},
        {key: 'D1', value: '近效期'},
        {key: 'E1', value: '次品'}
      ];

      function upload(stocks, i) {
        HqOrderService.hqStockImport(stocks[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              Loading.hide();
              return $state.go('order_suggest.suggest_hq_current', {}, {reload: true});
            }

            console.log(data);
            if (stocks[i]) {
              upload(stocks, i);
            }
            else {
              Loading.hide();
              $state.go('order_suggest.suggest_hq_current', {}, {reload: true});
            }
          }, function (err) {
            Loading.hide();
            console.log(err);
          });
      }

      $scope.hqStockImport = function (stocks) {
        Loading.show();
        var i = 0;
        upload(stocks, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传当前湖村',
        contents: [{
          key: '请选择需要上传的库存文件',
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '总部库存'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              genuine_goods: item['正品'],
              validity: item['近效期'],
              onway_goods: item['在途'],
              ungenuine_goods: item['次品']
            });
          });
          var stocks = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            stocks.push(result.slice(i, i + 100));
          }
          if (stocks.length > 0) {
            $scope.hqStockImport(stocks);
          }
          console.log(stocks);
        }
      });
    }

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        'SKU编码',
        '正品',
        '在途',
        '近效期',
        '次品'
      ]];

      $scope.stocks.forEach(function (s) {
        rows.push([
          s.product_number,
          s.genuine_goods,
          s.onway_goods,
          s.validity,
          s.ungenuine_goods
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqEcommerceCtrl', ['$scope', '$state','$rootScope', 'AuthService','HqOrderService','Loading','ExcelReaderService',
  function ($scope, $state,$rootScope, AuthService,HqOrderService,Loading,ExcelReaderService) {
    $scope.curSubmitOrder = {};
    $scope.getCurrentHqSubmitOrder = function () {
      HqOrderService.getCurrentHqSubmitOrder().then(function (data) {
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y06);
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getCurrentHqSubmitOrder();
    $scope.changeImportBtn = function (text) {
      if (text === '有') {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: [
            {
              text: '导入电商订单',
              clickCallback: function () {
                orderClickCallback('Y06');
              }
            },
            {
              text: '导出',
              clickCallback: exportExecl
            }
          ]
        });
      }
      else {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: []
        });
      }
    };

    $scope.clickOrderStatus = function (status) {
      $scope.curSubmitOrder.has_Y06 = status;
      $scope.updateSubmitOrderStatus();
    };
    $scope.updateSubmitOrderStatus = function () {
      HqOrderService.updateSubmitOtherOrderStatus({
        _id: $scope.curSubmitOrder._id,
        has_Y02: $scope.curSubmitOrder.has_Y02,
        has_Y03: $scope.curSubmitOrder.has_Y03,
        has_Y04: $scope.curSubmitOrder.has_Y04,
        has_Y05: $scope.curSubmitOrder.has_Y05,
        has_Y06: $scope.curSubmitOrder.has_Y06,
        has_Y07: $scope.curSubmitOrder.has_Y07
      }).then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y06);
        }
      }, function (data) {
        console.log(data);
      });
    };


    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('SuggestHqAgencyCtrl', function (user) {
      $scope.user = user;
    });

    $scope.orders = [];
    $scope.getHqOtherOrders = function () {
      HqOrderService.getHqOtherOrders('Y06').then(function (data) {
        if (!data.err) {
          $scope.orders = data;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHqOtherOrders();

    function orderClickCallback(orderType) {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '产品条码'},
        {key: 'D1', value: '品类'},
        {key: 'E1', value: '中分类名称'},
        {key: 'F1', value: '销售价格'},
        {key: 'G1', value: '晋颖成本价'},
        {key: 'H1', value: '订单数量'},
        {key: 'I1', value: '晋颖总价格'}
      ];

      function upload(orders, i) {
        HqOrderService.hqOtherOrderImport(orders[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              Loading.hide();
              return $state.go('order_suggest.suggest_hq_e_commerce', {}, {reload: true});
            }

            console.log(data);
            if (orders[i]) {
              upload(orders, i);
            }
            else {
              $state.go('order_suggest.suggest_hq_e_commerce', {}, {reload: true});
            }
          }, function (err) {
            console.log(err);
          });
      }

      function getContentKey(type) {
        switch (type) {
          case  'Y06':
            return '电商订单';
        }
        return '';
      }

      $scope.hqOtherOrderImport = function (orders) {
        var i = 0;
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传' + getContentKey(orderType),
        contents: [{
          key: getContentKey(orderType),
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '总部上传其他订单页面格式'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              product_name: item['产品名称'],
              product_barcode: item['产品条码'],
              category: item['品类'],
              mid_classify: item['中分类名称'],
              sales_price: item['销售价格'],
              order_count: item['订单数量'],
              order_type: orderType,
              total_price: item['总销售价格'],
              jinyi_cost: item['晋颖成本价'],
              jinyi_total_price: item['晋颖总价格']
            });
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            orders.push(result.slice(i, i + 100));
          }
          if (orders.length > 0) {
            $scope.hqOtherOrderImport(orders);
          }
          console.log(orders);
        }
      });
    }
    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        'SKU编码',
        '产品条码',
        '品类',
        '中分类名称',
        '销售价格',
        '晋颖成本价',
        '订单号码',
        '订单数量',
        '晋颖总价格'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product_name,
          o.product_number,
          o.product_barcode,
          o.category,
          o.mid_classify,
          o.sales_price,
          o.jinyi_cost,
          o.order_number,
          o.order_count,
          o.jinyi_cost*o.order_count
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }

  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqMaoziCtrl', ['$scope','$state', '$rootScope', 'AuthService', 'HqOrderService','Loading','ExcelReaderService',
  function ($scope, $state,$rootScope, AuthService, HqOrderService,Loading,ExcelReaderService) {
    $scope.curSubmitOrder = {};
    $scope.getCurrentHqSubmitOrder = function () {
      HqOrderService.getCurrentHqSubmitOrder().then(function (data) {
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y07);
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getCurrentHqSubmitOrder();
    $scope.changeImportBtn = function (text) {
      if (text === '有') {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: [
            {
              text: '导入茂姿订单',
              clickCallback: function () {
                orderClickCallback('Y07');
              }
            },
            {
              text: '导出',
              clickCallback: exportExecl
            }
          ]
        });
      }
      else {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: []
        });
      }
    };

    $scope.clickOrderStatus = function (status) {
      $scope.curSubmitOrder.has_Y07 = status;
      $scope.updateSubmitOrderStatus();
    };
    $scope.updateSubmitOrderStatus = function () {
      HqOrderService.updateSubmitOtherOrderStatus({
        _id: $scope.curSubmitOrder._id,
        has_Y02: $scope.curSubmitOrder.has_Y02,
        has_Y03: $scope.curSubmitOrder.has_Y03,
        has_Y04: $scope.curSubmitOrder.has_Y04,
        has_Y05: $scope.curSubmitOrder.has_Y05,
        has_Y06: $scope.curSubmitOrder.has_Y06,
        has_Y07: $scope.curSubmitOrder.has_Y07
      }).then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y07);
        }
      }, function (data) {
        console.log(data);
      });
    };

    $scope.user = AuthService.getUser() || {};
    AuthService.onUserUpdated('SuggestHqMaoziCtrl', function (user) {
      $scope.user = user;
    });

    $scope.orders = [];
    $scope.getHqOtherOrders = function () {
      HqOrderService.getHqOtherOrders('Y07').then(function (data) {
        if (!data.err) {
          $scope.orders = data;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHqOtherOrders();

    function orderClickCallback(orderType) {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '产品条码'},
        {key: 'D1', value: '品类'},
        {key: 'E1', value: '中分类名称'},
        {key: 'F1', value: '销售价格'},
        {key: 'G1', value: '晋颖成本价'},
        {key: 'H1', value: '订单数量'},
        {key: 'I1', value: '晋颖总价格'}
      ];

      function upload(orders, i) {
        HqOrderService.hqOtherOrderImport(orders[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              Loading.hide();
              return $state.go('order_suggest.suggest_hq_maozi', {}, {reload: true});
            }

            console.log(data);
            if (orders[i]) {
              upload(orders, i);
            }
            else {
              $state.go('order_suggest.suggest_hq_maozi', {}, {reload: true});
            }
          }, function (err) {
            console.log(err);
          });
      }

      function getContentKey(type) {
        switch (type) {
          case  'Y07':
            return '茂姿订单';
        }
        return '';
      }

      $scope.hqOtherOrderImport = function (orders) {
        var i = 0;
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传' + getContentKey(orderType),
        contents: [{
          key: getContentKey(orderType),
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '总部上传其他订单页面格式'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              product_name: item['产品名称'],
              product_barcode: item['产品条码'],
              category: item['品类'],
              mid_classify: item['中分类名称'],
              sales_price: item['销售价格'],
              order_count: item['订单数量'],
              order_type: orderType,
              total_price: item['总销售价格'],
              jinyi_cost: item['晋颖成本价'],
              jinyi_total_price: item['晋颖总价格']
            });
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            orders.push(result.slice(i, i + 100));
          }
          if (orders.length > 0) {
            $scope.hqOtherOrderImport(orders);
          }
          console.log(orders);
        }
      });
    }
    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        'SKU编码',
        '产品条码',
        '品类',
        '中分类名称',
        '销售价格',
        '晋颖成本价',
        '订单号码',
        '订单数量',
        '晋颖总价格'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product_name,
          o.product_number,
          o.product_barcode,
          o.category,
          o.mid_classify,
          o.sales_price,
          o.jinyi_cost,
          o.order_number,
          o.order_count,
          o.jinyi_cost*o.order_count
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqOtherY02Ctrl', ['$scope', '$state', '$rootScope', 'HqOrderService','Loading','ExcelReaderService',
  function ($scope, $state, $rootScope, HqOrderService,Loading,ExcelReaderService) {
    $scope.curSubmitOrder = {};
    $scope.getCurrentHqSubmitOrder = function () {
      HqOrderService.getCurrentHqSubmitOrder().then(function (data) {
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y02);
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getCurrentHqSubmitOrder();
    $scope.changeImportBtn = function (text) {
      if (text === '有') {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: [
            {
              text: '上传批发订单',
              clickCallback: function () {
                orderClickCallback('Y02');
              }
            },
            {
              text: '导出',
              clickCallback: exportExecl
            }
          ]
        });
      }
      else {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: []
        });
      }
    };

    $scope.clickOrderStatus = function (status) {
      $scope.curSubmitOrder.has_Y02 = status;
      $scope.updateSubmitOrderStatus();
    };
    $scope.updateSubmitOrderStatus = function () {
      HqOrderService.updateSubmitOtherOrderStatus({
        _id: $scope.curSubmitOrder._id,
        has_Y02: $scope.curSubmitOrder.has_Y02,
        has_Y03: $scope.curSubmitOrder.has_Y03,
        has_Y04: $scope.curSubmitOrder.has_Y04,
        has_Y05: $scope.curSubmitOrder.has_Y05,
        has_Y06: $scope.curSubmitOrder.has_Y06,
        has_Y07: $scope.curSubmitOrder.has_Y07
      }).then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y02);
        }
      }, function (data) {
        console.log(data);
      });
    };


    $scope.orders = [];
    $scope.getHqOtherOrders = function () {
      HqOrderService.getHqOtherOrders('Y02').then(function (data) {
        if (!data.err) {
          $scope.orders = data;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHqOtherOrders();

    function orderClickCallback(orderType) {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '产品条码'},
        {key: 'D1', value: '品类'},
        {key: 'E1', value: '中分类名称'},
        {key: 'F1', value: '销售价格'},
        {key: 'G1', value: '晋颖成本价'},
        {key: 'H1', value: '订单数量'},
        {key: 'I1', value: '晋颖总价格'}
      ];

      function upload(orders, i) {
        HqOrderService.hqOtherOrderImport(orders[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              Loading.hide();
              return $state.go('order_suggest.suggest_hq_other_Y02', {}, {reload: true});
            }
            console.log(data);
            if (orders[i]) {
              upload(orders, i);
            }
            else {
              $state.go('order_suggest.suggest_hq_other_Y02', {}, {reload: true});
            }
          }, function (err) {
            console.log(err);
          });
      }

      function getContentKey(type) {
        switch (type) {
          case  'Y02':
            return '批发订单';
          case  'Y03':
            return '试用订单';
          case  'Y04':
            return '陈列订单';
        }
        return '';
      }

      $scope.hqOtherOrderImport = function (orders) {
        var i = 0;
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传' + getContentKey(orderType),
        contents: [{
          key: getContentKey(orderType),
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '总部上传其他订单页面格式'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              product_name: item['产品名称'],
              product_barcode: item['产品条码'],
              category: item['品类'],
              mid_classify: item['中分类名称'],
              sales_price: item['销售价格'],
              order_count: item['订单数量'],
              order_type: orderType,
              total_price: item['总销售价格'],
              jinyi_cost: item['晋颖成本价'],
              jinyi_total_price: item['晋颖总价格']
            });
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            orders.push(result.slice(i, i + 100));
          }
          if (orders.length > 0) {
            $scope.hqOtherOrderImport(orders);
          }
          console.log(orders);
        }
      });
    }
    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        'SKU编码',
        '产品条码',
        '品类',
        '中分类名称',
        '销售价格',
        '晋颖成本价',
        '订单号码',
        '订单数量',
        '晋颖总价格'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product_name,
          o.product_number,
          o.product_barcode,
          o.category,
          o.mid_classify,
          o.sales_price,
          o.jinyi_cost,
          o.order_number,
          o.order_count,
          o.jinyi_cost*o.order_count
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqOtherY03Ctrl', ['$scope','$state', '$rootScope', 'HqOrderService','Loading','ExcelReaderService',
  function ($scope, $state,$rootScope, HqOrderService,Loading,ExcelReaderService) {
    $scope.curSubmitOrder = {};
    $scope.getCurrentHqSubmitOrder = function () {
      HqOrderService.getCurrentHqSubmitOrder().then(function (data) {
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y03);
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getCurrentHqSubmitOrder();
    $scope.changeImportBtn = function (text) {
      if (text === '有') {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: [
            {
              text: '上传试用订单',
              clickCallback: function () {
                orderClickCallback('Y03');
              }
            },
            {
              text: '导出',
              clickCallback: exportExecl
            }
          ]
        });
      }
      else {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: []
        });
      }
    };

    $scope.clickOrderStatus = function (status) {
      $scope.curSubmitOrder.has_Y03 = status;
      $scope.updateSubmitOrderStatus();
    };

    $scope.updateSubmitOrderStatus = function () {
      HqOrderService.updateSubmitOtherOrderStatus({
        _id: $scope.curSubmitOrder._id,
        has_Y02: $scope.curSubmitOrder.has_Y02,
        has_Y03: $scope.curSubmitOrder.has_Y03,
        has_Y04: $scope.curSubmitOrder.has_Y04,
        has_Y05: $scope.curSubmitOrder.has_Y05,
        has_Y06: $scope.curSubmitOrder.has_Y06,
        has_Y07: $scope.curSubmitOrder.has_Y07
      }).then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y03);
        }
      }, function (data) {
        console.log(data);
      });
    };

    $scope.orders = [];
    $scope.getHqOtherOrders = function () {
      HqOrderService.getHqOtherOrders('Y03').then(function (data) {
        if (!data.err) {
          $scope.orders = data;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHqOtherOrders();

    function orderClickCallback(orderType) {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '产品条码'},
        {key: 'D1', value: '品类'},
        {key: 'E1', value: '中分类名称'},
        {key: 'F1', value: '销售价格'},
        {key: 'G1', value: '晋颖成本价'},
        {key: 'H1', value: '订单数量'},
        {key: 'I1', value: '晋颖总价格'}
      ];

      function upload(orders, i) {
        HqOrderService.hqOtherOrderImport(orders[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              Loading.hide();
              return $state.go('order_suggest.suggest_hq_other_Y03', {}, {reload: true});
            }
            console.log(data);
            if (orders[i]) {
              upload(orders, i);
            }
            else {
              $state.go('order_suggest.suggest_hq_other_Y03', {}, {reload: true});
            }
          }, function (err) {
            console.log(err);
          });
      }

      function getContentKey(type) {
        switch (type) {
          case  'Y02':
            return '批发订单';
          case  'Y03':
            return '试用订单';
          case  'Y04':
            return '陈列订单';
        }
        return '';
      }

      $scope.hqOtherOrderImport = function (orders) {
        var i = 0;
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传' + getContentKey(orderType),
        contents: [{
          key: getContentKey(orderType),
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '总部上传其他订单页面格式'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              product_name: item['产品名称'],
              product_barcode: item['产品条码'],
              category: item['品类'],
              mid_classify: item['中分类名称'],
              sales_price: item['销售价格'],
              order_count: item['订单数量'],
              order_type: orderType,
              total_price: item['总销售价格'],
              jinyi_cost: item['晋颖成本价'],
              jinyi_total_price: item['晋颖总价格']
            });
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            orders.push(result.slice(i, i + 100));
          }
          if (orders.length > 0) {
            $scope.hqOtherOrderImport(orders);
          }
          console.log(orders);
        }
      });
    }

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        'SKU编码',
        '产品条码',
        '品类',
        '中分类名称',
        '销售价格',
        '晋颖成本价',
        '订单号码',
        '订单数量',
        '晋颖总价格'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product_name,
          o.product_number,
          o.product_barcode,
          o.category,
          o.mid_classify,
          o.sales_price,
          o.jinyi_cost,
          o.order_number,
          o.order_count,
          o.jinyi_cost*o.order_count
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqOtherY04Ctrl', ['$scope', '$state', '$rootScope', 'HqOrderService', 'Loading','ExcelReaderService',
  function ($scope, $state, $rootScope, HqOrderService, Loading,ExcelReaderService) {
    $scope.curSubmitOrder = {};
    $scope.getCurrentHqSubmitOrder = function () {
      HqOrderService.getCurrentHqSubmitOrder().then(function (data) {
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y04);
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getCurrentHqSubmitOrder();
    $scope.changeImportBtn = function (text) {
      if (text === '有') {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: [
            {
              text: '上传陈列订单',
              clickCallback: function () {
                orderClickCallback('Y04');
              }
            },
            {
              text: '导出',
              clickCallback: exportExecl
            }
          ]
        });
      }
      else {
        $scope.$emit('suggest.import.changed', {
          title: '建议订单',
          btns: []
        });
      }
    };

    $scope.clickOrderStatus = function (status) {
      $scope.curSubmitOrder.has_Y04 = status;
      $scope.updateSubmitOrderStatus();
    };

    $scope.updateSubmitOrderStatus = function () {
      HqOrderService.updateSubmitOtherOrderStatus({
        _id: $scope.curSubmitOrder._id,
        has_Y02: $scope.curSubmitOrder.has_Y02,
        has_Y03: $scope.curSubmitOrder.has_Y03,
        has_Y04: $scope.curSubmitOrder.has_Y04,
        has_Y05: $scope.curSubmitOrder.has_Y05,
        has_Y06: $scope.curSubmitOrder.has_Y06,
        has_Y07: $scope.curSubmitOrder.has_Y07
      }).then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          $scope.changeImportBtn(data.has_Y04);
        }
      }, function (data) {
        console.log(data);
      });
    };

    $scope.orders = [];
    $scope.getHqOtherOrders = function () {
      HqOrderService.getHqOtherOrders('Y04').then(function (data) {
        if (!data.err) {
          $scope.orders = data;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHqOtherOrders();

    function orderClickCallback(orderType) {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '产品条码'},
        {key: 'D1', value: '品类'},
        {key: 'E1', value: '中分类名称'},
        {key: 'F1', value: '销售价格'},
        {key: 'G1', value: '晋颖成本价'},
        {key: 'H1', value: '订单数量'},
        {key: 'I1', value: '晋颖总价格'}
      ];

      function upload(orders, i) {
        HqOrderService.hqOtherOrderImport(orders[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              Loading.hide();
              return $state.go('order_suggest.suggest_hq_other_Y04', {}, {reload: true});
            }
            console.log(data);
            if (orders[i]) {
              upload(orders, i);
            }
            else {
              $state.go('order_suggest.suggest_hq_other_Y04', {}, {reload: true});
            }
          }, function (err) {
            console.log(err);
          });
      }

      function getContentKey(type) {
        switch (type) {
          case  'Y02':
            return '批发订单';
          case  'Y03':
            return '试用订单';
          case  'Y04':
            return '陈列订单';
        }
        return '';
      }

      $scope.hqOtherOrderImport = function (orders) {
        var i = 0;
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传' + getContentKey(orderType),
        contents: [{
          key: getContentKey(orderType),
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '总部上传其他订单页面格式'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              product_name: item['产品名称'],
              product_barcode: item['产品条码'],
              category: item['品类'],
              mid_classify: item['中分类名称'],
              sales_price: item['销售价格'],
              order_count: item['订单数量'],
              order_type: orderType,
              total_price: item['总销售价格'],
              jinyi_cost: item['晋颖成本价'],
              jinyi_total_price: item['晋颖总价格']
            });
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            orders.push(result.slice(i, i + 100));
          }
          if (orders.length > 0) {
            $scope.hqOtherOrderImport(orders);
          }
          console.log(orders);
        }
      });
    }

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        '产品名称',
        'SKU编码',
        '产品条码',
        '品类',
        '中分类名称',
        '销售价格',
        '晋颖成本价',
        '订单号码',
        '订单数量',
        '晋颖总价格'
      ]];

      $scope.orders.forEach(function (o) {
        rows.push([
          o.product_name,
          o.product_number,
          o.product_barcode,
          o.category,
          o.mid_classify,
          o.sales_price,
          o.jinyi_cost,
          o.order_number,
          o.order_count,
          o.jinyi_cost*o.order_count
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqOtherOrderCtrl', ['$scope', '$state', '$rootScope', 'HqOrderService','Loading',
  function ($scope, $state, $rootScope, HqOrderService,Loading) {
    $scope.$emit('suggest.import.changed', {
      title: '建议订单',
      btns: [
        {
          text: '上传批发订单',
          clickCallback: function () {
            orderClickCallback('Y02');
          }
        },
        {
          text: '上传试用订单',
          clickCallback: function () {
            orderClickCallback('Y03');
          }
        },
        {
          text: '上传陈列订单',
          clickCallback: function () {
            orderClickCallback('Y04');
          }
        }
      ]
    });
    $scope.orders = [];
    $scope.getHqOtherOrders = function () {
      HqOrderService.getHqOtherOrders().then(function (data) {
        if (!data.err) {
          $scope.orders = data;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getHqOtherOrders();

    function orderClickCallback(orderType) {
      var headers = [
        {key: 'A1', value: 'SKU编码'},
        {key: 'B1', value: '产品名称'},
        {key: 'C1', value: '产品条码'},
        {key: 'D1', value: '品类'},
        {key: 'E1', value: '中分类名称'},
        {key: 'F1', value: '销售价格'},
        {key: 'G1', value: '晋颖成本价'},
        {key: 'H1', value: '订单数量'},
        {key: 'I1', value: '晋颖总价格'}
      ];

      function upload(orders, i) {
        HqOrderService.hqOtherOrderImport(orders[i++])
          .then(function (data) {
            if (data && data.err && data.err.type === 'product_not_exist') {
              alert(data.err.message);
              Loading.hide();
              return $state.go('order_suggest.suggest_hq_other_order', {}, {reload: true});
            }
            console.log(data);
            if (orders[i]) {
              upload(orders, i);
            }
            else {
              $state.go('order_suggest.suggest_hq_other_order', {}, {reload: true});
            }
          }, function (err) {
            console.log(err);
          });
      }

      function getContentKey(type) {
        switch (type) {
          case  'Y02':
            return '批发订单';
          case  'Y03':
            return '试用订单';
          case  'Y04':
            return '陈列订单';
        }
        return '';
      }

      $scope.hqOtherOrderImport = function (orders) {
        var i = 0;
        upload(orders, i);
      };

      $rootScope.$broadcast('show.dialogUpload', {
        title: '上传' + getContentKey(orderType),
        contents: [{
          key: getContentKey(orderType),
          value: '点击选择文件',
          tip: '点击选择文件',
          sheetName: '总部上传其他订单页面格式'
        }],
        color: 'blue',
        headers: headers,
        callback: function (data) {
          var result = [];
          data.forEach(function (item) {
            result.push({
              product_number: item['SKU编码'],
              product_name: item['产品名称'],
              product_barcode: item['产品条码'],
              category: item['品类'],
              mid_classify: item['中分类名称'],
              sales_price: item['销售价格'],
              order_count: item['订单数量'],
              order_type: orderType,
              total_price: item['总销售价格'],
              jinyi_cost: item['晋颖成本价'],
              jinyi_total_price: item['晋颖总价格']
            });
          });
          var orders = [];
          for (var i = 0, len = result.length; i < len; i += 100) {
            orders.push(result.slice(i, i + 100));
          }
          if (orders.length > 0) {
            $scope.hqOtherOrderImport(orders);
          }
          console.log(orders);
        }
      });
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestHqSuggestResultCtrl', ['$scope', '$state', '$rootScope', 'HqOrderService','ExcelReaderService',
  function ($scope, $state, $rootScope, HqOrderService,ExcelReaderService) {
    $scope.curSubmitOrder = {};
    $scope.getCurrentHqSubmitOrder = function () {
      HqOrderService.getCurrentHqSubmitOrder().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.curSubmitOrder = data;
          if ($scope.curSubmitOrder.has_Y02 === '未选择') {
            return alert('请选择是否上传批发订单');
          }
          if ($scope.curSubmitOrder.has_Y03 === '未选择') {
            return alert('请选择是否上传试用装订单');
          }
          if ($scope.curSubmitOrder.has_Y04 === '未选择') {
            return alert('请选择是否上传陈列订单');
          }
          if ($scope.curSubmitOrder.has_Y05 === '未选择') {
            return alert('请选择是否上传经销商订单');
          }
          if ($scope.curSubmitOrder.has_Y06 === '未选择') {
            return alert('请选择是否上传电商订单');
          }
          if ($scope.curSubmitOrder.has_Y07 === '未选择') {
            return alert('请选择是否上传茂姿订单');
          }

          if (data.status !== '已审核') {
            $scope.$emit('suggest.import.changed', {
              title: '建议订单 总部建议订单（SKU）=(地区已审批订单+其他订单)-(总部库存+在途-安全库存) +判断条件（是否TOP SKU? 是否MOQ之%必采购？）',
              btns: [
                {
                  text: '提交',
                  clickCallback: suggestOrderSubmit
                },
                {
                  text: '导出',
                  clickCallback: exportExecl
                }
              ]
            });
          }

          $scope.getHqSuggestOrders();
        }
      }, function (data) {
        console.log(data);
      });
    };
    $scope.getCurrentHqSubmitOrder();


    $scope.suggests = [];
    $scope.getHqSuggestOrders = function () {
      HqOrderService.getHqSuggestOrders().then(function (data) {
        console.log(data);
        if (data && !data.err) {
          $scope.suggests = data;
        }
      }, function (data) {
        console.log(data);
      });
    };

    $scope.getSystemAreaSuggest = function (sale) {
      sale.system_suggest_count = (sale.D01_approve + sale.Y01 + sale.Y02 + sale.Y03 + sale.Y04 + sale.Y05 + sale.Y06 + sale.Y07);
      sale.system_suggest_count = sale.system_suggest_count - (sale.genuine_goods + sale.onway_goods + sale.product.onway_count - sale.safe_stock);

      if (sale.system_suggest_count_modify === 0) {
        sale.system_suggest_count_modify = sale.system_suggest_count;
      }

      var factory_moq = parseInt(sale.product.factory_moq);
      var order_count_exceed_moq = parseInt(sale.product.order_count_exceed_moq);
      var min_factory_moq = parseInt(factory_moq * order_count_exceed_moq / 100);

      sale.final_system_suggest_count = sale.system_suggest_count_modify;
      if (sale.system_suggest_count_modify < min_factory_moq) {
        sale.final_system_suggest_count = 0;
      }
      if (sale.system_suggest_count_modify >= min_factory_moq && sale.system_suggest_count_modify < factory_moq) {
        sale.final_system_suggest_count = factory_moq;
      }

      if (sale.final_purchased_count === 0) {
        sale.final_purchased_count = sale.final_system_suggest_count;
      }

      return sale.system_suggest_count;
    };

    $scope.modifySystemAreaSuggestPercent = function (sale) {
      sale.system_suggest_count_modify_percent = parseInt((sale.system_suggest_count_modify - sale.system_suggest_count) * 100 / ((sale.system_suggest_count > 0) ? sale.system_suggest_count : (-sale.system_suggest_count)));
      sale.final_purchased_count = sale.final_system_suggest_count;
    };

    function suggestOrderSubmit() {
      var sales = [];

      for (var i = 0; i < $scope.suggests.length; i++) {
        var sale = $scope.suggests[i];
        if (sale.system_suggest_count_modify_percent >= 50 || sale.system_suggest_count_modify_percent < -50 || isNaN(sale.system_suggest_count_modify_percent)) {
          if (!sale.remark) {
            return alert('产品编码:' + sale.product.product_number + '超额订购需填写备注');
          }
          if (sale.is_sure !== '是') {
            return alert('产品编码:' + sale.product.product_number + '超额订购需上级确认');
          }
        }

        if (sale.status !== '已审核') {
          sales.push({
            _id: sale._id,
            remark: sale.remark,
            final_purchased_count: sale.final_purchased_count,
            system_suggest_count: sale.system_suggest_count,
            final_system_suggest_count: sale.final_system_suggest_count,
            system_suggest_count_modify: sale.system_suggest_count_modify,
            system_suggest_count_modify_percent: sale.system_suggest_count_modify_percent,
            D01: sale.D01,
            D02: sale.D02,
            D03: sale.D03,
            D04: sale.D04,
            D01_approve: sale.D01_approve,
            D02_approve: sale.D02_approve,
            D03_approve: sale.D03_approve,
            D04_approve: sale.D04_approve
          });
        }
      }

      var final_sales = [];
      for (var i = 0, len = sales.length; i < len; i += 40) {
        final_sales.push(sales.slice(i, i + 40));
      }

      upload(final_sales, 0);
    };

    function upload(sales, i) {
      HqOrderService.hqSuggestOrderSubmit(sales[i++])
        .then(function (data) {
          console.log(data);
          if (sales[i]) {
            upload(sales, i);
          }
          else {
            alert('ok');
            $state.go('order_suggest.suggest_hq_suggest_result', {}, {reload: true});

          }
        }, function (err) {
          console.log(err);
        });
    }

    $scope.sureOrder = function (order) {
      HqOrderService.sureOrder(order).then(function (data) {
        if (data && !data.err) {
          order.is_sure = data.is_sure;
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };

    $scope.exportExcel = function () {
      var execlReader = ExcelReaderService.getReader();
      var rows = [[
        'SKU编码',
        '产品名称',
        '产品条码',
        '品类',
        '中分类名称',
        '系列名称',
        '销售价格',
        '晋颖成本价',
        'ABC分类',
        'ABC类说明',
        'ABC类别%',
        '上月月结库存总部正品库存',
        '上月月结总部在途',
        '月均销售前3个月平均',
        '安全库存2个月',
        '后1月销售预测',
        '后2月销售预测',
        '后3月销售预测',
        '后4月销售预测',
        '后5月销售预测',
        '后6月销售预测',
        '当月汇总地区已审批订单',
        '当月汇总地区已审批试用装',
        '当月汇总地区已审批陈列',
        '上传其他订单批发',
        '上传其他订单试用装',
        '上传其他订单陈列',
        '上传其他订单经销商',
        '上传其他订单电商',
        '上传其他订单茂姿',
        '当月总部订单系统建议',
        '修改',
        '修改%',
        '当月总部订单moq系统建议',
        '备注',
        '已取得上级核准',
        '澳妆最终审批采购量',
        '澳妆最终审批采购金额',
        '澳妆最终审批零售金额',
        '审核状态'
      ]];

      $scope.suggests.forEach(function (o) {
        rows.push([
          o.product.product_number,
          o.product.product_name,
          o.product.product_barcode,
          o.product.category,
          o.product.mid_classify,
          o.product.series_name,
          o.product.sales_price,
          o.product.jinyi_cost,
          o.product.abc_classify,
          o.product.abc_classify_explain,
          o.product.abc_category,
          o.genuine_goods,
          o.onway_goods,
          o.next_month_sales_forecast_0,
          o.safe_stock,
          o.next_month_sales_forecast_1,
          o.next_month_sales_forecast_2,
          o.next_month_sales_forecast_3,
          o.next_month_sales_forecast_4,
          o.next_month_sales_forecast_5,
          o.next_month_sales_forecast_6,
          o.D01_approve,
          o.D03_approve,
          o.D04_approve,
          o.Y02,
          o.Y03,
          o.Y04,
          o.Y05,
          o.Y06,
          o.Y07,
          o.system_suggest_count,
          o.system_suggest_count_modify,
          o.system_suggest_count_modify_percent+'%',
          o.final_system_suggest_count,
          o.remark,
          o.is_sure==='是'?'已确认':'',
          o.final_purchased_count,
          o.final_purchased_count*o.product.jinyi_cost,
          o.final_purchased_count*o.product.sales_price,
          o.status
        ]);
      });

      execlReader.exportExcel(rows);
    };

    function exportExecl() {
      $scope.exportExcel();
    }
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SystemSettingCtrl', function () {

});