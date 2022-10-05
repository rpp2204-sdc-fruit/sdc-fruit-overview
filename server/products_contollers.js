require('dotenv').config();
const db = require('../db_mongo/config.js');
const axios = require('axios');
const { Product, Style } = require('../db_mongo/models.js');

const { TOKEN, URL } = process.env

function readAllProducts (req, res) {
  axios
  .get(URL + req.url, {
    headers: {
      Authorization: TOKEN,
    },
  })
  .then((products) => {
    res.status(200).send(products.data);
  })
  .catch(error => console.log('Error reading all products', error));
}

function readProduct (req, res) {
  axios
  .get(URL + req.url, {
    headers: {
      Authorization: TOKEN,
    },
  })
  .then((product_info) => {
    res.status(200).send(product_info.data);
  })
  .catch(error => console.log('Error reading product:',  error));
}

function readStyle (req, res) {
  axios
    .get(URL + req.url, {
      headers: {
        Authorization: TOKEN,
      },
    })
    .then((product_styles) => {
      res.send(product_styles.data);
    })
    .catch(error => console.log('Error reading products:', error));
}

function readRelated (req, res) {
  // res.sendStatus(200)
}

function createCart (req, res) {
  // res.sendStatus(200)
}

module.exports = {
  readAllProducts,
  readProduct,
  readStyle,
  readRelated,
  createCart,
}
