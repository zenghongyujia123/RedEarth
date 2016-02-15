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