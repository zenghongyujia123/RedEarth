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
      .state('basedata_home', {
        url: '/basedata_home',
        templateUrl: 'templates/basedata_home.client.view.html',
        controller: "BasedataHomeCtrl"
      })
      .state('basedata_home.basedata_area', {
        url: '/basedata_area',
        templateUrl: 'templates/basedata_area.client.view.html',
        controller: "BasedataAreaCtrl"
      })
      .state('basedata_home.basedata_customer', {
        url: '/basedata_customer',
        templateUrl: 'templates/basedata_customer.client.view.html',
        controller: "BasedataCustomerCtrl"
      })
      .state('basedata_home.basedata_people', {
        url: '/basedata_people',
        templateUrl: 'templates/basedata_people.client.view.html',
        controller: "BasedataPeopleCtrl"
      })
      .state('basedata_home.basedata_shop', {
        url: '/basedata_shop',
        templateUrl: 'templates/basedata_shop.client.view.html',
        controller: "BasedataShopCtrl"
      })
      .state('basedata_home.basedata_sku', {
        url: '/basedata_sku',
        templateUrl: 'templates/basedata_sku.client.view.html',
        controller: "BasedataSkuCtrl"
      })
      .state('card_home', {
        url: '/card_home',
        templateUrl: 'templates/card_home.client.view.html',
        controller: "CardHomeCtrl"
      })
      .state('card_edit', {
        url: '/card_edit/:card_id',
        templateUrl: 'templates/card_edit.client.view.html',
        controller: "CardEditCtrl"
      })
      .state('card_edit.card_config', {
        url: '/card_config/:card_id',
        templateUrl: 'templates/card_config.client.view.html',
        controller: "CardConfigCtrl"
      })
      .state('card_edit.card_preview', {
        url: '/card_preview/:card_id/:paper_id',
        templateUrl: 'templates/card_preview.client.view.html',
        controller: "CardPreviewCtrl"
      })
    ;
    $urlRouterProvider.otherwise('/');
  }])
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ag');
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
            window.location = '/webapp/signin';
          }
        }
        //判断用户数据是否存在
        if (!AuthService.isLoggedIn()) {
          event.preventDefault();
          //没有用户数据，需要重新获取用户，页面可能需要被重定向
          UserService.getMe()
            .then(function (data) {
                if (data.err) {
                  return window.location = config.login;
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
/**
 * Created by zenghong on 16/1/19.
 */

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

        excelReader.getWorkSheet(ele, function (err, excelSheet) {
          excelReader.checkHeader(excelSheet, $scope.info.headers, function (isOurTemplate) {
            if (!isOurTemplate) {
              var a = isOurTemplate;
            }
            excelReader.getSheetData(excelSheet, $scope.info.headers, function (err, sheetData) {
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
angular.module('agilesales-web').directive('agQuestionBlank', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'AE',
    templateUrl: 'directives/question_blank/question_blank.client.view.html',
    replace: true,
    scope: {getQuestion: '&'},
    controller: function ($scope, $element, $attrs) {
      $scope.question = $scope.getQuestion();

      $scope.status = 'preview';

      if (!$scope.question.content)
        $scope.question.content = {};

      if (!$scope.question.content.type)
        $scope.question.content.type = 'blank';

      if (!$scope.question.content.title)
        $scope.question.content.title = '';

      if (!$scope.question.content.type_text)
        $scope.question.content.type_text = '填空题';

      if (!$scope.question.content.input_type)
        $scope.question.content.input_type = 'number';

      if (!$scope.question.content.input_type_text)
        $scope.question.content.input_type_text = '数字';

      if ($scope.question.content.is_need_photo !== 'true' && $scope.question.content.is_need_photo !== true) {
        $scope.question.content.is_need_photo = false;
      }
      else {
        $scope.question.content.is_need_photo = true;
      }

      if ($scope.question.content.is_need_description !== 'true' && $scope.question.content.is_need_description !== true) {
        $scope.question.content.is_need_description = false;
      }
      else {
        $scope.question.content.is_need_description = true;
      }


      $scope.showInputType = function () {
        $rootScope.$broadcast('show.dialogSelect', {
          title: '输入方式',
          contents: [{
            key: '请选择输入方式',
            value: '',
            tip: '点击输入名称',
            options: ['数字', '文本']
          }],
          color: 'blue',
          callback: function (info) {
            $scope.question.content.input_type_text = info.contents[0].value;
            $scope.question.content.input_type = $scope.getInputType($scope.question.input_type_text);
          }
        });
      };

      $scope.togglePhoto = function () {
        $scope.question.content.is_need_photo = !$scope.question.content.is_need_photo;
      };
      $scope.toggleDescription = function () {
        $scope.question.content.is_need_description = !$scope.question.content.is_need_description;
      };

      $scope.getInputType = function (type) {
        switch (type) {
          case '数字':
            return 'numbner';
          case '文本':
            return 'text';
        }
      };

      $scope.submitQuestion = function () {
        $scope.question.type = $scope.question.content.type;
        $scope.question.title = $scope.question.content.title;
        $scope.$emit('onQuestionUpdated', {question: $scope.question});
      }
    }
  }
}]);
/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agQuestionMulti', function () {
  return {
    restrict: 'AE',
    templateUrl: 'directives/question_multi/question_multi.client.view.html',
    replace: true,
    scope: {getQuestion: '&'},
    link: function ($scope, $element, $attrs) {
      $scope.status = 'preview';
      $scope.question = $scope.getQuestion();
      if (!$scope.question.content)
        $scope.question.content = {};

      if (!$scope.question.content.type)
        $scope.question.content.type = 'multi';

      if (!$scope.question.content.title)
        $scope.question.content.title = '';

      if (!$scope.question.content.type_text)
        $scope.question.content.type_text = '多选题';

      if ($scope.question.content.is_need_photo !== 'true' && $scope.question.content.is_need_photo !== true) {
        $scope.question.content.is_need_photo = false;
      }
      else {
        $scope.question.content.is_need_photo = true;
      }

      if (!$scope.question.content.options) {
        $scope.question.content.options = [{
          key: '选项',
          value: ''
        }];
      }

      if ($scope.question.content.is_need_description !== 'true' && $scope.question.content.is_need_description !== true) {
        $scope.question.content.is_need_description = false;
      }
      else {
        $scope.question.content.is_need_description = true;
      }
      $scope.togglePhoto = function () {
        $scope.question.content.is_need_photo = !$scope.question.content.is_need_photo;
      };
      $scope.toggleDescription = function () {
        $scope.question.content.is_need_description = !$scope.question.content.is_need_description;
      };
      $scope.submitQuestion = function () {
        $scope.question.type = $scope.question.content.type;
        $scope.question.title = $scope.question.content.title;
        $scope.question.content.options.forEach(function (option) {
          delete  option.$$hashKey;
        });
        if (!$scope.question.content.options[$scope.question.content.options.length - 1].value) {
          $scope.question.content.options.splice($scope.question.content.options.length - 1, 1);
        }
        $scope.$emit('onQuestionUpdated', {question: $scope.question});
      };

      $scope.pressOption = function (option, index) {
        if (option.value && isLastOption(index)) {
          pushOption();
        }

        if (!option.value && !isLastOption(index)) {
          removeOption(index);
        }
      };

      function isLastOption(index) {
        return ($scope.question.content.options.length - 1 ) === index;
      }

      function removeOption(index) {
        $scope.question.content.options.splice(index, 1);
      }

      function pushOption() {
        $scope.question.content.options.push({
          key: '',
          value: ''
        })
      }
    }
  }
});
/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agQuestionSingle', function () {
  return {
    restrict: 'AE',
    templateUrl: 'directives/question_single/question_single.client.view.html',
    replace: true,
    scope: {getQuestion: '&'},
    link: function ($scope, $element, $attrs) {
      $scope.status = 'preview';
      $scope.question = $scope.getQuestion();
      if (!$scope.question.content)
        $scope.question.content = {};

      if (!$scope.question.content.type)
        $scope.question.content.type = 'single';

      if (!$scope.question.content.title)
        $scope.question.content.title = '';

      if (!$scope.question.content.type_text)
        $scope.question.content.type_text = '选择题';

      if ($scope.question.content.is_need_photo !== 'true' && $scope.question.content.is_need_photo !== true) {
        $scope.question.content.is_need_photo = false;
      }
      else {
        $scope.question.content.is_need_photo = true;
      }

      if (!$scope.question.content.options) {
        $scope.question.content.options = [{
          key: '选项',
          value: ''
        }];
      }

      if ($scope.question.content.is_need_description !== 'true' && $scope.question.content.is_need_description !== true) {
        $scope.question.content.is_need_description = false;
      }
      else {
        $scope.question.content.is_need_description = true;
      }
      $scope.togglePhoto = function () {
        $scope.question.content.is_need_photo = !$scope.question.content.is_need_photo;
      };
      $scope.toggleDescription = function () {
        $scope.question.content.is_need_description = !$scope.question.content.is_need_description;
      };
      $scope.submitQuestion = function () {
        $scope.question.type = $scope.question.content.type;
        $scope.question.title = $scope.question.content.title;
        $scope.question.content.options.forEach(function (option) {
          delete  option.$$hashKey;
        });
        if (!$scope.question.content.options[$scope.question.content.options.length - 1].value) {
          $scope.question.content.options.splice($scope.question.content.options.length - 1, 1);
        }
        $scope.$emit('onQuestionUpdated', {question: $scope.question});
      };

      $scope.pressOption = function (option, index) {
        if (option.value && isLastOption(index)) {
          pushOption();
        }

        if (!option.value && !isLastOption(index)) {
          removeOption(index);
        }
      };

      function isLastOption(index) {
        return ($scope.question.content.options.length - 1 ) === index;
      }

      function removeOption(index) {
        $scope.question.content.options.splice(index, 1);
      }

      function pushOption() {
        $scope.question.content.options.push({
          key: '',
          value: ''
        })
      }
    }
  }
});
/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agQuestionTrueFalse', function () {
  return {
    restrict: 'AE',
    templateUrl: 'directives/question_true_false/question_true_false.client.view.html',
    replace: true,
    scope: {getQuestion: '&'},
    link: function ($scope, $element, $attrs) {
      $scope.status = 'preview';
      $scope.question = $scope.getQuestion();
      if (!$scope.question.content)
        $scope.question.content = {};

      if (!$scope.question.content.type)
        $scope.question.content.type = 'trueorfalse';

      if (!$scope.question.content.title)
        $scope.question.content.title = '';

      if (!$scope.question.content.type_text)
        $scope.question.content.type_text = '是非题';

      if ($scope.question.content.is_need_photo !== 'true' && $scope.question.content.is_need_photo !== true) {
        $scope.question.content.is_need_photo = false;
      }
      else {
        $scope.question.content.is_need_photo = true;
      }

      if ($scope.question.content.is_need_description !== 'true' && $scope.question.content.is_need_description !== true) {
        $scope.question.content.is_need_description = false;
      }
      else {
        $scope.question.content.is_need_description = true;
      }
      $scope.togglePhoto = function () {
        $scope.question.content.is_need_photo = !$scope.question.content.is_need_photo;
      };
      $scope.toggleDescription = function () {
        $scope.question.content.is_need_description = !$scope.question.content.is_need_description;
      };
      $scope.submitQuestion = function () {
        $scope.question.type = $scope.question.content.type;
        $scope.question.title = $scope.question.content.title;
        $scope.$emit('onQuestionUpdated', {question: $scope.question});
      };
    }
  }
});
/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agQuestionTable', ['$rootScope', 'AuthService', function ($rootScope, AuthService) {
  return {
    restrict: 'AE',
    templateUrl: 'directives/question_table/question_table.client.view.html',
    replace: true,
    scope: {getQuestion: '&'},
    link: function ($scope, $element, $attrs) {
      $scope.question = $scope.getQuestion();
      $scope.status = 'preview';
      $scope.showTableSelect = function () {
        var tables = AuthService.getTables();
        var options = [];
        tables.forEach(function (table) {
          options.push(table.table_name);
        });
        $rootScope.$broadcast('show.dialogSelect', {
          title: '选择表格',
          contents: [{
            key: '请选择表格',
            value: '',
            options: options
          }],
          color: 'blue',
          callback: function (info) {
            $scope.question.content.table_name = info.contents[0].value;
          }
        });
      };

      $scope.showFieldSelect = function () {
        var fields = AuthService.getFieldsByTable($scope.question.content.table_name);
        var options = [];
        fields.forEach(function (field) {
          options.push(field.name);
        });

        $rootScope.$broadcast('show.dialogSelect', {
          title: '选择显示字段',
          contents: [{
            key: '请选择显示字段',
            value: '',
            options: options
          }],
          color: 'blue',
          callback: function (info) {
            $scope.question.content.col_field_1 = info.contents[0].value;
          }
        });
      };

      $scope.showFilterFieldSelect = function (index) {
        var fields = AuthService.getFieldsByTable($scope.question.content.table_name);
        var options = [];
        fields.forEach(function (field) {
          options.push(field.name);
        });

        $rootScope.$broadcast('show.dialogSelect', {
          title: '选择筛选字段',
          contents: [{
            key: '请选择筛选字段',
            value: '',
            options: options
          }],
          color: 'blue',
          index: index,
          callback: function (info) {
            $scope.question.content.filter_fields[info.index].value = info.contents[0].value;
          }
        });
      };

      if (!$scope.question.content)
        $scope.question.content = {};

      if (!$scope.question.content.type) {
        $scope.question.content.type = 'table';
      }

      if (!$scope.question.content)
        $scope.question.content = {};
      if (!$scope.question.content.table_name)
        $scope.question.content.table_name = '';

      if (!$scope.question.content.col_field_1) {
        $scope.question.content.col_field_1 = '';
      }

      if (!$scope.question.content.title)
        $scope.question.content.title = '';

      if (!$scope.question.content.table)
        $scope.question.content.table = '';

      if (!$scope.question.content.filter_fields) {
        $scope.question.content.filter_fields = [];
        $scope.question.content.filter_fields.push({
          key: '请选择筛选字段',
          value: '',
          index: 0
        });
        $scope.question.content.filter_fields.push({
          key: '',
          value: '',
          index: 1
        });
      }

      if (!$scope.question.content.show_fields) {
        $scope.question.content.show_fields = [];

        $scope.question.content.show_fields.push({
          type: 'single'
        });
        $scope.question.content.show_fields.push({
          type: 'blank'
        });
        $scope.question.content.show_fields.push({
          type: 'trueorfalse'
        });
        $scope.question.content.show_fields.push({
          type: 'multi'
        });
      }

      $scope.submitQuestion = function () {
        $scope.question.type = $scope.question.content.type;
        $scope.question.title = $scope.question.content.title;

        delete  $scope.question.$$hashKey;
        $scope.question.content.filter_fields.forEach(function (field) {
          delete field.$$hashKey;
        });

        $scope.question.content.show_fields.forEach(function (field) {
          delete field.$$hashKey;
          if (field.content.options) {
            field.content.options.forEach(function (option) {
              delete option.$$hashKey;
            });
          }
        });

        console.log($scope.question);
        $scope.$emit('onQuestionUpdated', {question: $scope.question});
      };

      $scope.getPreviewRowWidth = function () {
        var colWidth = $element.width() / 4;
        return colWidth * ($scope.question.content.show_fields.length + 1) + 'px';
      };
      $scope.getPreviewColWidth = function () {
        var colWidth = $element.width() / 4;
        return colWidth + 'px';
      };
    }
  }
}]);
/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agQuestionCamera', function () {
  return {
    restrict: 'AE',
    templateUrl: 'directives/question_camera/camera.client.view.html',
    replace: true,
    scope: {getQuestion: '&'},
    link: function ($scope, $element, $attrs) {
      $scope.question = $scope.getQuestion();
      $scope.status = 'preview';
      if (!$scope.question.content)
        $scope.question.content = {};

      if (!$scope.question.content.type)
        $scope.question.content.type = 'camera';

      if (!$scope.question.content.title)
        $scope.question.content.title = '';

      if (!$scope.question.content.type_text)
        $scope.question.content.type_text = '拍照题';

      if ($scope.question.content.is_need_description !== 'true' && $scope.question.content.is_need_description !== true) {
        $scope.question.content.is_need_description = false;
      }
      else {
        $scope.question.content.is_need_description = true;
      }
      $scope.toggleDescription = function () {
        $scope.question.content.is_need_description = !$scope.question.content.is_need_description;
      };
      $scope.submitQuestion = function () {
        $scope.question.type = $scope.question.content.type;
        $scope.question.title = $scope.question.content.title;
        $scope.$emit('onQuestionUpdated', {question: $scope.question});
      };
    }
  }
});
/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agQuestionTableBlank', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'AE',
    templateUrl: 'directives/question_table/question_table_blank/question_blank.client.view.html',
    replace: true,
    scope: {
      getQuestion: '&',
      getIndex: '&'
    },
    controller: function ($scope, $element, $attrs) {
      $scope.question = $scope.getQuestion();
      $scope.index = $scope.getIndex();

      if (!$scope.question.content)
        $scope.question.content = {};

      if (!$scope.question.content.type)
        $scope.question.content.type = 'blank';

      if (!$scope.question.content.title)
        $scope.question.content.title = '';

      if (!$scope.question.content.type_text)
        $scope.question.content.type_text = '填空题';

      if (!$scope.question.content.input_type)
        $scope.question.content.input_type = 'number';

      if (!$scope.question.content.input_type_text)
        $scope.question.content.input_type_text = '数字';

      if ($scope.question.content.is_need_photo !== 'true' && $scope.question.content.is_need_photo !== true) {
        $scope.question.content.is_need_photo = false;
      }
      else {
        $scope.question.content.is_need_photo = true;
      }

      if ($scope.question.content.is_need_description !== 'true' && $scope.question.content.is_need_description !== true) {
        $scope.question.content.is_need_description = false;
      }
      else {
        $scope.question.content.is_need_description = true;
      }


      $scope.showInputType = function () {
        $rootScope.$broadcast('show.dialogSelect', {
          title: '输入方式',
          contents: [{
            key: '请选择输入方式',
            value: '',
            tip: '点击输入名称',
            options: ['数字', '文本']
          }],
          color: 'blue',
          callback: function (info) {
            $scope.question.content.input_type_text = info.contents[0].value;
            $scope.question.content.input_type = $scope.getInputType($scope.question.input_type_text);
          }
        });
      };

      $scope.togglePhoto = function () {
        $scope.question.content.is_need_photo = !$scope.question.content.is_need_photo;
      };
      $scope.toggleDescription = function () {
        $scope.question.content.is_need_description = !$scope.question.content.is_need_description;
      };

      $scope.getInputType = function (type) {
        switch (type) {
          case '数字':
            return 'numbner';
          case '文本':
            return 'text';
        }
      };

      $scope.submitQuestion = function () {
        $scope.question.type = $scope.question.content.type;
        $scope.question.title = $scope.question.content.title;
        $scope.$emit('onQuestionUpdated', {question: $scope.question});
      }
    }
  }
}]);
/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agQuestionTableMulti', function () {
  return {
    restrict: 'AE',
    templateUrl: 'directives/question_table/question_table_multi/question_multi.client.view.html',
    replace: true,
    scope: {
      getQuestion: '&',
      getIndex: '&'
    },
    link: function ($scope, $element, $attrs) {
      $scope.question = $scope.getQuestion();
      $scope.index = $scope.getIndex();
      if (!$scope.question.content)
        $scope.question.content = {};

      if (!$scope.question.content.type)
        $scope.question.content.type = 'multi';

      if (!$scope.question.content.title)
        $scope.question.content.title = '';

      if (!$scope.question.content.type_text)
        $scope.question.content.type_text = '多选题';

      if ($scope.question.content.is_need_photo !== 'true' && $scope.question.content.is_need_photo !== true) {
        $scope.question.content.is_need_photo = false;
      }
      else {
        $scope.question.content.is_need_photo = true;
      }

      if (!$scope.question.content.options) {
        $scope.question.content.options = [{
          key: '选项',
          value: ''
        }];
      }

      if ($scope.question.content.is_need_description !== 'true' && $scope.question.content.is_need_description !== true) {
        $scope.question.content.is_need_description = false;
      }
      else {
        $scope.question.content.is_need_description = true;
      }
      $scope.togglePhoto = function () {
        $scope.question.content.is_need_photo = !$scope.question.content.is_need_photo;
      };
      $scope.toggleDescription = function () {
        $scope.question.content.is_need_description = !$scope.question.content.is_need_description;
      };
      $scope.submitQuestion = function () {
        $scope.question.type = $scope.question.content.type;
        $scope.question.title = $scope.question.content.title;
        $scope.question.content.options.forEach(function (option) {
          delete  option.$$hashKey;
        });
        $scope.$emit('onQuestionUpdated', {question: $scope.question});
      };

      $scope.pressOption = function (option, index,$event) {
        $event.stopPropagation();
        if (option.value && isLastOption(index)) {
          pushOption();
        }

        if (!option.value && !isLastOption(index)) {
          removeOption(index);
        }
      };

      function isFirstOption(index) {
        return index === 0;
      }

      function isLastOption(index) {
        return ($scope.question.content.options.length - 1 ) === index;
      }

      function removeOption(index) {
        $scope.question.content.options.splice(index, 1);
      }

      function pushOption() {
        $scope.question.content.options.push({
          key: '',
          value: ''
        })
      }
    }
  }
});
/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agQuestionTableSingle', function () {
  return {
    restrict: 'AE',
    templateUrl: 'directives/question_table/question_table_single/question_single.client.view.html',
    replace: true,
    scope: {
      getQuestion: '&',
      getIndex: '&'
    },
    link: function ($scope, $element, $attrs) {
      $scope.question = $scope.getQuestion();
      $scope.index = $scope.getIndex();
      if (!$scope.question.content)
        $scope.question.content = {};

      if (!$scope.question.content.type)
        $scope.question.content.type = 'single';

      if (!$scope.question.content.title)
        $scope.question.content.title = '';

      if (!$scope.question.content.type_text)
        $scope.question.content.type_text = '选择题';

      if ($scope.question.content.is_need_photo !== 'true' && $scope.question.content.is_need_photo !== true) {
        $scope.question.content.is_need_photo = false;
      }
      else {
        $scope.question.content.is_need_photo = true;
      }

      if (!$scope.question.content.options) {
        $scope.question.content.options = [{
          key: '选项',
          value: ''
        }];
      }

      if ($scope.question.content.is_need_description !== 'true' && $scope.question.content.is_need_description !== true) {
        $scope.question.content.is_need_description = false;
      }
      else {
        $scope.question.content.is_need_description = true;
      }
      $scope.togglePhoto = function () {
        $scope.question.content.is_need_photo = !$scope.question.content.is_need_photo;
      };
      $scope.toggleDescription = function () {
        $scope.question.content.is_need_description = !$scope.question.content.is_need_description;
      };
      $scope.submitQuestion = function () {
        $scope.question.type = $scope.question.content.type;
        $scope.question.title = $scope.question.content.title;
        $scope.question.content.options.forEach(function (option) {
          delete  option.$$hashKey;
        });
        $scope.$emit('onQuestionUpdated', {question: $scope.question});
      };

      $scope.pressOption = function (option, index,$event) {
        $event.stopPropagation();
        if (option.value && isLastOption(index)) {
          pushOption();
        }

        if (!option.value && !isLastOption(index)) {
          removeOption(index);
        }
      };

      function isFirstOption(index) {
        return index === 0;
      }

      function isLastOption(index) {
        return ($scope.question.content.options.length - 1 ) === index;
      }

      function removeOption(index) {
        $scope.question.content.options.splice(index, 1);
      }

      function pushOption() {
        $scope.question.content.options.push({
          key: '',
          value: ''
        })
      }
    }
  }
});
/**
 * Created by zenghong on 16/1/18.
 */
angular.module('agilesales-web').directive('agQuestionTableTrueFalse', function () {
  return {
    restrict: 'AE',
    templateUrl: 'directives/question_table/question_table_true_false/question_true_false.client.view.html',
    replace: true,
    scope: {
      getQuestion: '&',
      getIndex: '&'
    },
    link: function ($scope, $element, $attrs) {
      $scope.question = $scope.getQuestion();
      $scope.index = $scope.getIndex();
      if (!$scope.question.content)
        $scope.question.content = {};

      if (!$scope.question.content.type)
        $scope.question.content.type = 'trueorfalse';

      if (!$scope.question.content.title)
        $scope.question.content.title = '';

      if (!$scope.question.content.type_text)
        $scope.question.content.type_text = '是非题';

      if ($scope.question.content.is_need_photo !== 'true' && $scope.question.content.is_need_photo !== true) {
        $scope.question.content.is_need_photo = false;
      }
      else {
        $scope.question.content.is_need_photo = true;
      }

      if ($scope.question.content.is_need_description !== 'true' && $scope.question.content.is_need_description !== true) {
        $scope.question.content.is_need_description = false;
      }
      else {
        $scope.question.content.is_need_description = true;
      }
      $scope.togglePhoto = function () {
        $scope.question.content.is_need_photo = !$scope.question.content.is_need_photo;
      };
      $scope.toggleDescription = function () {
        $scope.question.content.is_need_description = !$scope.question.content.is_need_description;
      };
      $scope.submitQuestion = function () {
        $scope.question.type = $scope.question.content.type;
        $scope.question.title = $scope.question.content.title;
        $scope.$emit('onQuestionUpdated', {question: $scope.question});
      };
    }
  }
});
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
angular.module('agilesales-web').factory('AreaService', ['HttpService', function (HttpService) {
  return {
    updateAreaTitle: function (areaTitle) {
      return HttpService.post('/webapp/area/title/update', {area_title: areaTitle});
    },
    uploadMultiAreas: function (areas) {
      return HttpService.post('/webapp/area/multi/upload', {areas: areas});
    },
    getAreas: function () {
      return HttpService.get('/webapp/area', {});
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
      $rootScope.$broadcast('onUserReset');
    },
    getCompany: function () {
      return user.company;
    },
    getCardTemplates: function () {
      return user.company.card_templates;
    },
    getCardTemplateById: function (id) {
      var result = {};
      user.company.card_templates.forEach(function (item) {
        if (item._id === id) {
          result = item;
        }
      });
      return result;
    },
    getPaperById: function (cardId, paperId) {
      var card = this.getCardTemplateById(cardId);
      var result = {};
      card.papers.forEach(function (item) {
        if (item._id === paperId) {
          result = item;
        }
      });
      return result;
    },
    getTables: function () {
      return user.company.tables;
    },
    getFieldsByTable: function (tableName) {
      var result = [];
      user.company.tables.forEach(function (table) {
        if (table.table_name === tableName) {
          result = table.fields
        }
      });
      return result;
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
    }
  };
}]);
/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('CardService', ['HttpService', function (HttpService) {
  return {
    updateCardTemplateTitle: function (card_id, title) {
      return HttpService.post('/webapp/card_template/title/update', {title: title, card_id: card_id});
    },
    createCardTemplate: function (title, role) {
      return HttpService.post('/webapp/card_template/create', {title: title, role: role});
    },
    addPaperTemplate: function (title, card_id) {
      return HttpService.post('/webapp/card_template/paper/create', {title: title, card_id: card_id});
    },
    updateQuestion: function (question, paper_id, card_id) {
      return HttpService.post('/webapp/card_template/question/update', {
        paper_id: paper_id,
        card_id: card_id,
        question: question
      });
    }
  };
}]);
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
/**
 * Created by zenghong on 16/1/20.
 */
/**
 * Created by Wayne on 15/12/7.
 */

'use strict';
angular.module('agilesales-web').factory('ExcelReaderService', function () {

  var activeXReader = {
    getWorkSheet: function (element, callback) {
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
      var excelSheet = excel.Worksheets('Sheet1');

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
    getWorkSheet: function (element, callback) {
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
    checkHeader: function (workbook, headers, callback) {
      var excelSheet = workbook.Sheets.Sheet1;
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
    isHeaderNameExist: function (workbook, headerColumn) {
      var excelSheet = workbook.Sheets.Sheet1;
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
    getSheetData: function (workbook, headers, callback) {
      //目前只取第一个sheet的内容
      var sheet1Name = workbook.SheetNames['Sheet1'];
      var xlsSheetArray = XLSX.utils.sheet_to_row_object_array(workbook.Sheets['Sheet1']);
      //var jsonResultString = JSON.stringify(xlsSheetArray);

      if (!xlsSheetArray || xlsSheetArray.length <= 0) {
        return callback({type: 'file_content_empty', message: '表格中没有数据'});
      }
      return callback(null, xlsSheetArray);
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
 * Created by zenghong on 16/1/26.
 */
angular.module('agilesales-web').factory('PeopleService', ['HttpService', function (HttpService) {
  return {
    uploadMultiPeoples: function (peoples) {
      return HttpService.post('/webapp/people/multi/upload', {peoples: peoples});
    },
    getPeoples: function () {
      return HttpService.get('/webapp/peoples', {});
    },
    updatePeoplesPaths: function () {
      return HttpService.post('/webapp/peoples/path/update', {});
    }
  };
}]);
/**
 * Created by zenghong on 16/1/26.
 */
angular.module('agilesales-web').factory('ProductService', ['HttpService', function (HttpService) {
  return {
    uploadMultiProducts: function (products) {
      return HttpService.post('/webapp/product/multi/upload', {products: products});
    },
    getProducts: function () {
      return HttpService.get('/webapp/products', {});
    }
  };
}]);
/**
 * Created by zenghong on 16/1/26.
 */
angular.module('agilesales-web').factory('ShopService', ['HttpService', function (HttpService) {
  return {
    uploadMultiShops: function (shops) {
      return HttpService.post('/webapp/shop/multi/upload', {shops: shops});
    },
    getShops: function () {
      return HttpService.get('/webapp/shops', {});
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
angular.module('agilesales-web').factory('UserService', [ 'HttpService', function (HttpService) {
  return {
    getMe: function () {
      return HttpService.get('/webapp/user/me', {});
    }
  };
}]);
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
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('BasedataCustomerCtrl', ['$scope', 'CustomerService', '$rootScope', 'UploadService', function ($scope, CustomerService, $rootScope, UploadService) {
  $scope.headers = [
    '客户编码', '客户等级', '客户名称',
    '客户简称', '客户类型', '渠道类型',
    '大区', '省区', '办事处',
    '客户地址', '客户送货地址', '客户联系人电话',
    '客户联系人姓名', '负责人编号', '负责人姓名'
  ];

  $scope.customers = [];
  $scope.getCustomers = function () {
    CustomerService.getCustomers().then(function (data) {
      console.log(data);
      if (!data.err) {
        $scope.customers = data;
      }
    }, function (err) {
      console.log(err);
    });
  };

  $scope.getCustomers();

  $rootScope.$on('show.importCustomers', function () {
    //最多10列
    var headers = [
      {key: 'A1', value: '客户编码'},
      {key: 'B1', value: '客户等级'},
      {key: 'C1', value: '客户名称'},
      {key: 'D1', value: '客户简称'},
      {key: 'E1', value: '客户类型'},
      {key: 'F1', value: '渠道类型'},
      {key: 'G1', value: '大区'},
      {key: 'H1', value: '省区'},
      {key: 'I1', value: '办事处'},
      {key: 'J1', value: '客户地址'},
      {key: 'K1', value: '客户送货地址'},
      {key: 'L1', value: '客户联系人电话'},
      {key: 'M1', value: '客户联系人姓名'},
      {key: 'N1', value: '负责人编号'},
      {key: 'O1', value: '负责人姓名'}
    ];

    function upload(customers, i) {
      CustomerService.uploadMultiCustomers(customers[i++])
        .then(function (data) {
          console.log(data);
          if (customers[i]) {
            upload(customers, i);
          }
        }, function (err) {
          console.log(err);
        });
    }

    $scope.uploadMultiCutomers = function (customers) {
      var i = 0;
      upload(customers, i);
      //AreaService.uploadMultiCutomers(customers).then(function (data) {
      //  console.log(data);
      //}, function (data) {
      //  console.log(data);
      //});
    };

    $rootScope.$broadcast('show.dialogUpload', {
      title: '上传客户',
      contents: [{
        key: '请选择需要上传的客户文件',
        value: '点击选择文件',
        tip: '点击选择文件'
      }],
      color: 'blue',
      headers: headers,
      callback: function (data) {
        var obj = {};
        var arr = [];
        data.forEach(function (item) {
          if (!obj[item['客户名称']]) {
            obj[item['客户名称']] = {};
            $scope.headers.forEach(function (header) {
              obj[item['客户名称']][header] = item[header];
            });
          }
        });

        var result = [];

        for (var p in obj) {
          var item = {};
          for (var i in obj[p]) {
            switch (i) {
              case '客户编码':
                item.number = obj[p][i];
                break;
              case '客户等级':
                item.customer_level = obj[p][i];
                break;
              case '客户名称':
                item.name = obj[p][i];
                break;
              case '客户简称':
                item.short_name = obj[p][i];
                break;
              case '客户类型':
                item.customer_type = obj[p][i];
                break;
              case '渠道类型':
                item.channel_type = obj[p][i];
                break;
              case '大区':
                item.area_level1 = obj[p][i];
                break;
              case '省区':
                item.area_level2 = obj[p][i];
                break;
              case '办事处':
                item.area_level3 = obj[p][i];
                break;
              case '客户地址':
                item.address = obj[p][i];
                break;
              case '客户送货地址':
                item.delivery_address = obj[p][i];
                break;
              case '客户联系人电话':
                item.contact_phone = obj[p][i];
                break;
              case '客户联系人姓名':
                item.contact_name = obj[p][i];
                break;
              case '负责人编号':
                item.principal_number = obj[p][i];
                break;
              case '负责人姓名':
                item.principal_name = obj[p][i];
                break;
            }

          }
          result.push(item);
        }
        var customers = [];
        for (var i = 0, len = result.length; i < len; i += 100) {
          customers.push(result.slice(i, i + 100));
        }

        console.log(obj);
        console.log(result);
        console.log(customers);
        $scope.uploadMultiCutomers(customers);
      }
    });
  });

}]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('BasedataHomeCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.showUpload = function () {
    $rootScope.$broadcast($scope.getUploadType());
  };

  $scope.getDataType = function () {
    var location = window.location.hash;
    switch (location) {
      case '#/basedata_home/basedata_customer':
        return '客户';
      case '#/basedata_home/basedata_area':
        return '地区';
      case '#/basedata_home/basedata_people':
        return '人员';
      case '#/basedata_home/basedata_sku':
        return 'SKU';
      case '#/basedata_home/basedata_shop':
        return '门店';
    }
  };

  $scope.getUploadType = function () {
    var location = window.location.hash;
    switch (location) {
      case '#/basedata_home/basedata_customer':
        return 'show.importCustomers';
      case '#/basedata_home/basedata_area':
        return 'show.importAreas';
      case '#/basedata_home/basedata_people':
        return 'show.importPeoples';
      case '#/basedata_home/basedata_sku':
        return 'show.importProducts';
      case '#/basedata_home/basedata_shop':
        return 'show.importShops';
    }
  };


  $scope.location = window.location;
  $scope.isMenuClose = false;
  $scope.toggleMenu = function () {
    $scope.isMenuClose = !$scope.isMenuClose;
  }
}]);
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
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('CardConfigCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$window', 'AuthService', 'CustomerService', 'CardService',
  function ($scope, $rootScope, $state, $stateParams, $window, AuthService, CustomerService, CardService) {
    $scope.location = window.location;
    $scope.card = {};
    if ($stateParams.card_id) {
      $scope.card = AuthService.getCardTemplateById($stateParams.card_id);
      console.log($scope.card);
    }

    $scope.headers = [
      '客户编码', '客户等级', '客户名称',
      '客户简称', '客户类型', '渠道类型',
      '大区', '省区', '办事处',
      '客户地址', '客户送货地址', '客户联系人电话',
      '客户联系人姓名', '负责人编号', '负责人姓名',
      '导购拜访卡', '业务员拜访卡'
    ];

    $scope.customers = [];
    $scope.getCustomers = function () {
      CustomerService.getCustomers().then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.customers = data;
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.getCustomers();

    $scope.showUpdateCardTitle = function () {
      $rootScope.$broadcast('show.dialogInput', {
        title: '修改拜访卡名称',
        contents: [{
          key: '修改拜访卡名称',
          value: $scope.card.title,
          tip: '请拜访卡名称',
          param: 'title'
        }],
        color: 'blue',
        callback: function (info) {
          if (info.contents[0].value) {
            $scope.updateCardTemplateTitle(info.contents[0].value);
          }
        }
      });
    };
    $scope.showUpdateCustomerCard = function (customer) {
      $rootScope.$broadcast('show.dialogConfirm', {
        title: '修改客户经销商拜访卡',
        content: '你确定要将拜访卡(' + $scope.card.title + ')设置给客户(' + customer.name + ')吗?',
        color: 'blue',
        customer: customer,
        callback: function (info) {
          $scope.updateCustomerCard(info.customer);
          console.log(info);
        }
      })
    };

    $scope.updateCardTemplateTitle = function (title) {
      CardService.updateCardTemplateTitle($scope.card._id, title).then(function (data) {
        if (!data.err) {
          $window.location.reload();
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };

    $scope.updateCustomerCard = function (customer) {
      CustomerService.updateCustomerCard(customer._id, $scope.card._id).then(function (data) {
        if (!data.err) {
          $state.go('card_edit.card_config', {}, {reload: true});
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('CardEditCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$window', 'AuthService', 'CardService',
  function ($scope, $rootScope, $state, $stateParams, $window, AuthService, CardService) {
    $scope.showAddPaper = function () {
      $rootScope.$broadcast('show.dialogInput', {
        title: '添加试卷',
        contents: [{
          key: '请输入试卷名称',
          value: '',
          tip: '点击输入名称'
        }],
        color: 'blue',
        callback: function (info) {
          $scope.addPaper(info.contents[0].value);
        }
      });
    };

    $scope.addPaper = function (title) {
      CardService.addPaperTemplate(title, $scope.card._id).then(function (data) {
        if (!data.err) {
          $window.location.reload();
        }
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };
    $scope.card = {};
    if ($stateParams.card_id) {
      $scope.card = AuthService.getCardTemplateById($stateParams.card_id);
      console.log($scope.card);
    }

    $scope.goConfig = function () {
      $state.go('card_edit.card_config', {card_id: $scope.card._id});
    };

    $scope.goPreview = function (paper) {
      $state.go('card_edit.card_preview', {card_id: $scope.card._id, paper_id: paper._id});
    };

    $scope.location = window.location;
  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('CardHomeCtrl', ['$scope', '$rootScope', '$state', 'AuthService', 'CardService', function ($scope, $rootScope, $state, AuthService, CardService) {
  $scope.cards = AuthService.getCardTemplates();
  $scope.$on('onUserReset', function () {
    $scope.cards = AuthService.getCardTemplates();
  });

  $scope.goEdit = function (card) {
    $state.go('card_edit', {card_id: card._id});
  };

  $scope.goConfig = function (card) {
    $state.go('card_edit.card_config', {card_id: card._id});
  };

  $scope.showCardAdd = function () {
    $rootScope.$broadcast('show.dialogInput', {
      title: '添加拜访卡',
      contents: [{
        key: '请输入拜访卡名称',
        value: '',
        tip: '请输入拜访卡名称',
        param: 'title'
      },
        {
          key: '请输入拜访卡使用角色',
          value: '',
          tip: '请输入拜访卡使用角色',
          param: 'role'
        }],
      color: 'blue',
      callback: function (info) {
        $scope.createCardTemplate(info);
      }
    });
  };

  $scope.createCardTemplate = function (info) {
    var title = '';
    var role = '';
    info.contents.forEach(function (item) {
      if (item.param === 'title')
        title = item.value;
      if (item.param === 'role')
        role = item.value;
    });

    CardService.createCardTemplate(title, role).then(function (data) {
      if (!data.err) {
        $state.go('card_home', {}, {reload: true});
      }
      console.log(data);
    }, function (data) {
      console.log(data);
    });
  };

  $scope.getCardTip = function (card) {
    var result = '';
    if (card.type === 'default') {
      result += '默认';
    }
    else {
      result += '自定';
    }
    if (card.role === 'salesman') {
      result += '业务员';
    }
    else {
      result += '导购员';
    }
    return result;
  }
}]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('CardPreviewCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$window', 'AuthService', 'CardService',
  function ($scope, $rootScope, $state, $stateParams, $window, AuthService, CardService) {
    $scope.location = window.location;
    $scope.card = {};
    $scope.paper = {};

    if ($stateParams.card_id) {
      $scope.card = AuthService.getCardTemplateById($stateParams.card_id);
      if ($stateParams.paper_id) {
        $scope.paper = AuthService.getPaperById($stateParams.card_id, $stateParams.paper_id);
      }
      console.log($scope.card);
    }

    $scope.showAddQuestion = function () {
      $rootScope.$broadcast('show.dialogSelect', {
        title: '添加题目',
        contents: [{
          key: '请选择题目类型',
          value: '',
          tip: '点击输入名称',
          options: ['填空题', '单选题', '多选题', '是非题', '表格题', '拍照题']
        }],
        color: 'blue',
        callback: function (info) {
          $scope.paper.questions.push({type: $scope.getQuestionType(info.contents[0].value)});
        }
      });
    };

    $scope.$on('onQuestionUpdated', function (event, data) {
      $scope.updateQuestion(data.question);
      console.log($scope.paper.questions);
      console.log(data);
    });

    $scope.updateQuestion = function (question) {
      CardService.updateQuestion(question, $scope.paper._id, $scope.card._id).then(function (data) {
        if (!data.err)
          $window.location.reload();
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    };

    $scope.getQuestionType = function (type) {
      switch (type) {
        case '单选题':
          return 'single';
        case '多选题':
          return 'multi';
        case '填空题':
          return 'blank';
        case '表格题':
          return 'table';
        case '是非题':
          return 'trueorfalse';
        case '拍照题':
          return 'camera';
      }
    }


  }]);
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('HomeCtrl', function () {

});
/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('IndexCtrl', ['$scope',function ($scope) {
  $scope.location = window.location;
}]);