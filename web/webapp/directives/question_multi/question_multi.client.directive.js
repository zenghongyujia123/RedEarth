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