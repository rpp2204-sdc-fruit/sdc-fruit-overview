const cache = require("../../cache/redis.js");

const { Products, Styles } = require("../../db_mongo/models.js");

function readAllProducts(req, res) {
  cache
    .get("products")
    .then(async (reply) => {
      if (reply !== null) {
        console.log('Returned Data from Cache');
        return res.status(200).json(JSON.parse(reply));
      }

      Products.find({})
        .select("product_id name")
        .exec(async (error, products) => {
          if (error) {
            return res
              .status(500)
              .send("Error reading products from db", error);
          }
          await cache
            .set("products", JSON.stringify(products))
            .catch((err) => res.status(500).send(err));

          res.status(200).json(products);
        });
    })
    .catch((er) => res.status(500).send(er));
}

function readProduct(req, res) {
  const { product_id } = req.params;

  cache
    .get(product_id)
    .then((reply) => {
      if (reply !== null) {
        console.log('Returned Data from Cache');
        return res.status(200).json(JSON.parse(reply));
      }
      Products.findOne({ product_id }, async (error, product) => {
        if (error) {
          return res
            .status(500)
            .send(`Error reading product_id ${product_id} from db`, error);
        }
        await cache
          .set(`${product_id}`, JSON.stringify(product))
          .catch((err) => res.status(500).send(err));

        res.status(200).json(product);
      });
    })
    .catch((er) => res.status(500).send(er));
}

function readStyle(req, res) {
  const { product_id } = req.params;

  cache
    .get(`${product_id}_styles`)
    .then((reply) => {
      if (reply !== null) {
        console.log('Returned Data from Cache');
        return res.status(200).json(JSON.parse(reply));
      }

      Styles.find({ product_id }, async (error, styles) => {
        if (error) {
          return res
            .status(500)
            .send(
              `Error reading product_id ${product_id} styles from db`,
              error
            );
        }

        const { length } = styles;

        if (length === 0) {
          res.status(404).send("Product ID does not exist");
        } else {
          await cache
            .set(`${product_id}_styles`, JSON.stringify(styles))
            .catch((err) => console.error(err));

          res.status(200).json(styles);
        }
      });
    })
    .catch((err) => res.status(500).send(err));
}

function readRelated(req, res) {}

function createCart(req, res) {}

module.exports = {
  readAllProducts,
  readProduct,
  readStyle,
  readRelated,
  createCart,
};
