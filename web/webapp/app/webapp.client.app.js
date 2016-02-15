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