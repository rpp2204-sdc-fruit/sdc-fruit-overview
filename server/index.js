require('dotenv').config();
require('../db_mongo/config.js');

const express = require('express');
const history = require('connect-history-api-fallback');
const compression = require('compression');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(history());
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.use('/', require('./routes.js'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  // next(err);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
