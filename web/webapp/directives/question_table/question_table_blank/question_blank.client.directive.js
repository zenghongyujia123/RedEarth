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