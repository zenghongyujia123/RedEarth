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