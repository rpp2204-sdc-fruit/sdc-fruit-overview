require('dotenv').config();
require('../db_mongo/config.js');


const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();
const cors = require('cors');
const compression = require('compression');
const history = require('connect-history-api-fallback');

app.use(cors());
app.use(history());
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.use('/', require('./routes.js'))

// //POST interactions
// app.post('/interactions', (req, res) => {
//   postInteractions(req.body, (error) => {
//     if (error) {
//       res.sendStatus(422);
//     } else {
//       res.sendStatus(201);
//     }
//   });
// });

app.use((err, req, res, next) => {
  console.error(err.stack)
  next(err)
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


