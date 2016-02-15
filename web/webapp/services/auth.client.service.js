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