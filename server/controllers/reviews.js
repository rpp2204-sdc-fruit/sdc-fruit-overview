require('dotenv').config();
const axios = require('axios');
const { uploadToCloudinary } = require('../utils/uploadToCloudinary.js');

const { URL, TOKEN } = process.env;

const getReviews = (req, res) => {
  const url = `${URL}/reviews`;

  const options = {
    method: 'get',
    url,
    headers: { Authorization: TOKEN },
    params: req.query,
  };

  axios(options)
    .then((response) => res.status(200).send(response.data.results))
    .catch((error) => res.status(500).send(error));
};

const getMetaData = (req, res) => {
  const url = `${URL}/reviews/meta`;
  const options = {
    method: 'get',
    url,
    headers: { Authorization: TOKEN },
    params: req.query,
  };

  axios(options)
    .then((response) => res.status(200).send(response.data))
    .catch((error) => res.status(500).send(error));
};

const postReview = (req, res) => {
  const photoUrls = uploadToCloudinary(req);

  const {
    body,
    name,
    email,
    product_id,
    rating,
    summary,
    recommend,
    characteristics,
  } = req.body;

  const data = JSON.stringify({
    product_id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos: photoUrls,
    characteristics,
  });

  const options = {
    method: 'post',
    url: `${URL}/reviews`,
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
    },
    data,
  };

  axios(options)
    .then(() => res.sendStatus(201))
    .catch((error) => res.status(500).send(error));
};

const markHelpful = (req, res) => {
  const url = `${URL}/reviews/${req.params.review_id}/helpful`;

  const options = {
    method: 'put',
    url,
    headers: {
      Authorization: TOKEN,
    },
  };

  axios(options)
    .then(() => res.sendStatus(201))
    .catch((error) => res.status(500).send(error));
};

const reportReview = (req, res) => {
  const url = `${URL}/reviews/${req.params.review_id}/report`;

  const options = {
    method: 'put',
    url,
    headers: {
      Authorization: TOKEN,
    },
  };

  axios(options)
    .then(() => res.sendStatus(201))
    .catch((error) => res.status(500).send(error));
};

module.exports = {
  getReviews,
  getMetaData,
  postReview,
  markHelpful,
  reportReview,
};
