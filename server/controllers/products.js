require('dotenv').config();
const axios = require('axios');
const db = require('../../db_mongo/config.js');

const { Products, Styles } = require('../../db_mongo/models.js');

const { TOKEN, URL } = process.env;

function readAllProducts(req, res) {
  Products.aggregate([{ $sample: { size: 1 } }])
    .then((entry) => res.status(200).send(entry))
    .catch((error) => res.status(500).send(error));
}

function readProduct(req, res) {
  const product_id = req.url.split('/')[2];

  Products.find({ product_id: `${product_id}` })
    .then((product) => res.status(200).send(product))
    .catch((error) => res.status(500).send(error));
}

function readStyle(req, res) {
  const product_id = req.url.split('/')[2];

  Styles.find({ product_id })
    .then((styles) => res.status(200).send(styles))
    .catch((error) => res.status(500).send(error));
}

function readRelated(req, res) {
  // res.sendStatus(200)
}

function createCart(req, res) {
  // res.sendStatus(200)
}

module.exports = {
  readAllProducts,
  readProduct,
  readStyle,
  readRelated,
  createCart,
};
