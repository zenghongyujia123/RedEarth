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