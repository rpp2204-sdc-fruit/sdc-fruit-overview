require('dotenv').config();
const axios = require('axios');
const { uploadToCloudinary } = require('../utils/uploadToCloudinary.js');

const { URL, TOKEN } = process.env;

// only have to take care of one request here
// client will be in charge of sending mutiple requests

const getQuestions = (req, res) => {
  const { product_id } = req.params;
  let store = [];
  const count = 100;

  function get(page) {
    const url = `${URL}/qa/questions?product_id=${product_id}&page=${page}&count=${count}`;

    const options = {
      headers: { Authorization: TOKEN },
    };
    axios
      .get(url, options)
      .then((response) => {
        const questionList = response.data.results;

        if (questionList.length > 0) {
          store = [...store, ...questionList];
          get(page + 1);
        } else {
          res.body = store;
          res.status(200).send(res.body);
        }
      })
      .catch((err) => res.status(500).send(err));
  }

  get(1);
};

const getAnswers = (req, res) => {
  const { question_id, page, count } = req.params;

  const url = `${URL}/qa/questions/${question_id}/answers?page=${page}&count=${count}`;

  const options = {
    headers: { Authorization: TOKEN },
  };

  axios
    .get(url, options)
    .then((response) => {
      res.body = response.data;
      res.status(200).send(res.body);
    })
    .catch((err) => res.status(500).send(err));
};

const addQuestion = (req, res) => {
  const url = `${URL}/qa/questions`;

  const { body, name, email, product_id } = req.body;

  const data = JSON.stringify({
    body,
    name,
    email,
    product_id,
  });

  const options = {
    method: 'post',
    url,
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
    },
    data,
  };

  axios(options)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => res.status(500).send(err));
};

const addAnswer = async (req, res) => {
  const URLs = await uploadToCloudinary(req);

  const { question_id } = req.params;
  const { body, name, email } = req.body;

  const url = `${URL}/qa/questions/${question_id}/answers`;

  const data = JSON.stringify({
    body,
    name,
    email,
    photos: URLs || [],
  });

  const options = {
    method: 'post',
    url,
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
    },
    data,
  };

  axios(options)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => res.status(500).send(err));
};

const markQuestionAsHelpful = (req, res) => {
  const { question_id } = req.params;

  const url = `${URL}/qa/questions/${question_id}/helpful`;

  const options = {
    method: 'put',
    url,
    headers: {
      Authorization: TOKEN,
    },
  };

  axios(options)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => res.status(500).send(err));
};

const markAnswerAsHelpful = (req, res) => {
  const { answer_id } = req.params;

  const url = `${URL}/qa/answers/${answer_id}/helpful`;

  const options = {
    method: 'put',
    url,
    headers: {
      Authorization: TOKEN,
    },
  };

  axios(options)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => res.status(500).send(err));
};

const reportAnswer = (req, res) => {
  const { answer_id } = req.params;

  const url = `${URL}/qa/answers/${answer_id}/report`;

  const options = {
    method: 'put',
    url,
    headers: {
      Authorization: TOKEN,
    },
  };

  axios(options)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  markQuestionAsHelpful,
  markAnswerAsHelpful,
  reportAnswer,
};
