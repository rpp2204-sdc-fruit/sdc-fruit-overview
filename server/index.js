require('dotenv').config();
require('../db_mongo/config.js');


const path = require('path');
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const compression = require('compression');
const history = require('connect-history-api-fallback');

const { URL, PORT } = process.env;
const { uploadToCloudinary } = require('./utils/uploadToCloudinary.js');
const reviewsHelpers = require('./utils/reviewsHelpers.js')

app.use(cors());
app.use(history());
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.use('/', require('./routes.js'))

// GET reviews
app.get('/reviews', (req, res) => {
  reviewsHelpers.getReviews(req.query, (error, reviews) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(reviews);
    }
  });
});

// POST new review
app.post('/reviews', uploadToCloudinary, (req, res) => {
  reviewsHelpers.postReview(req.body, (error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.sendStatus(201);
    }
  });
});

//GET review metadata
app.get('/reviews/meta', (req, res) => {
  reviewsHelpers.getMetaData(req.query, (error, metadata) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(metadata);
    }
  });
});

//PUT mark review helpful
app.put('/reviews/:review_id/helpful', (req, res) => {
  reviewsHelpers.markHelpful(req.params, (error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.sendStatus(204);
    }
  });
});

//PUT report review
app.put('/reviews/:review_id/report', (req, res) => {
  reviewsHelpers.reportReview(req.params, (error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.sendStatus(204);
    }
  });
});

//Reviews Wild Card
app.use('/reviews/*', (req, res) => {
  res.send('404: This page does not exist');
});

//POST interactions
app.post('/interactions', (req, res) => {
  postInteractions(req.body, (error) => {
    if (error) {
      res.sendStatus(422);
    } else {
      res.sendStatus(201);
    }
  });
});

const port = PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


