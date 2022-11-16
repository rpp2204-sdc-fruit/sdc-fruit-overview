const express = require("express");

const router = express.Router();

const questions = require("./controllers/questions.js");
const products = require("./controllers/products.js");
const reviews = require("./controllers/reviews.js");
const global = require("./controllers/global.js");

/*
  Product Routes
*/
router.route("/products").get(products.readAllProducts);

router.route("/products/:product_id").get(products.readProduct);

router.route("/products/:product_id/styles").get(products.readStyle);

// router.route('/products/:product_id/related').get(products.readRelated);

// router.route('/cart/:sku/:qty').post(products.createCart);

/*
  Question Routes
*/
router.route("/questions/:product_id").get(questions.getQuestions);

router.route("/answers/:question_id/:page/:count").get(questions.getAnswers);

router.route("/question").get(questions.addQuestion);

router.route("/answer/:question_id").post(questions.addAnswer);

router
  .route("/helpful/question/:question_id")
  .put(questions.markQuestionAsHelpful);

router.route("/helpful/answer/:answer_id").put(questions.markAnswerAsHelpful);

router.route("/answer/:answer_id/report").put(questions.reportAnswer);

/*
  Review Routes
*/
router.route("/reviews").get(reviews.getReviews).post(reviews.postReview);

router.route("/reviews/meta").get(reviews.getMetaData);

router.route("/reviews/:review_id/helpful").put(reviews.markHelpful);

router.route("/reviews/:review_id/report").put(reviews.reportReview);

/*
  Global Routes
*/

router.route("/interactions").put(global.updateInteractions);

module.exports = router;
