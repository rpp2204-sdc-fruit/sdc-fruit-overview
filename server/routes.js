const express = require('express');
const router = express.Router();
const products  = require('./product_contollers.js');
const questions = require('../server/utils/questionsAnswersHelper.js')


router.route('/products')
  .get(products.readAllProducts)

router.route('/products/:product_id')
  .get(products.readProduct)

router.route('/products/:product_id/styles')
  .get(products.readStyle)

router.route('/products/:product_id/related')
  .get(products.readRelated)

router.route('/cart/:sku/:qty')
  .post(products.createCart)



router.route('/questions/:product_id')
.get(questions.getQuestions)

router.route('/answers/:question_id/:page/:count')
  .get(questions.getAnswers)

router.route('/question')
  .get(questions.addQuestion)

router.route('/answer/:question_id')
  .post(questions.addAnswer)

router.route('/helpful/question/:question_id')
  .put(questions.markQuestionAsHelpful)

router.route('/helpful/answer/:answer_id')
  .put(questions.markAnswerAsHelpful)

router.route('/answer/:answer_id/report')
  .put(questions.reportAnswer)

module.exports = router;
