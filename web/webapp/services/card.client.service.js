/**
 * Created by zenghong on 16/1/21.
 */
angular.module('agilesales-web').factory('CardService', ['HttpService', function (HttpService) {
  return {
    updateCardTemplateTitle: function (card_id, title) {
      return HttpService.post('/webapp/card_template/title/update', {title: title, card_id: card_id});
    },
    createCardTemplate: function (title, role) {
      return HttpService.post('/webapp/card_template/create', {title: title, role: role});
    },
    addPaperTemplate: function (title, card_id) {
      return HttpService.post('/webapp/card_template/paper/create', {title: title, card_id: card_id});
    },
    updateQuestion: function (question, paper_id, card_id) {
      return HttpService.post('/webapp/card_template/question/update', {
        paper_id: paper_id,
        card_id: card_id,
        question: question
      });
    }
  };
}]);