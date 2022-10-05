const express = require('express');
const router = express.Router();
const controllers = require('./utils/questionsAnswersHelper.js');

router.route('/questions/:product_id/')
  .get(controllers.getQuestions)

router.route('/answers/:question_id/:page/:count')
  .get(controllers.getAnswers)

router.route('/question')
  .get(controllers.addQuestion)

router.route('/answer/:question_id')
  .post(controllers.addAnwer)

router.route('/helpful/question/:question_id')
  .put(controllers.markQuestionAsHelpful)

router.route('/helpful/answer/:answer_id')
  .put(controllers.markAnswerAsHelpful)

router.route('/answer/:answer_id/report')
  .put(controllers.reportAnswer)

module.exports = router;
