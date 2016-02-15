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