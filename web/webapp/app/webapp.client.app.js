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
        url: '/order_detail',
        templateUrl: 'templates/order_detail.client.view.html',
        controller: "OrderDetailCtrl"
      })
      .state('order_history', {
        url: '/order_history',
        templateUrl: 'templates/order_history.client.view.html',
        controller: "OrderHistoryCtrl"
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
      .state('order_suggest.suggest_hq_wholesaler', {
        url: '/suggest_hq_wholesaler',
        templateUrl: 'templates/suggest_hq_wholesaler.client.view.html',
        controller: "SuggestHqWholeSalerCtrl"
      });

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
      /* $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
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
       //return window.location = '/webapp/index';
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
       });*/

      var windowElement = angular.element($window);
      windowElement.on('beforeunload', function (event) {
        AuthService.setLatestUrl($state.current.name, $state.params);
      });

    }]);