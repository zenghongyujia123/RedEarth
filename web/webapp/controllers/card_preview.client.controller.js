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