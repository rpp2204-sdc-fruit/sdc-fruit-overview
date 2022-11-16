const { exec } = require("child_process");

const productsCSV =
  "/Users/anthony/Desktop/SDC/sdc-fruit-overview/init_data/product.csv";
const featuresCSV =
  "/Users/anthony/Desktop/SDC/sdc-fruit-overview/init_data/features.csv";
const stylesCSV =
  "/Users/anthony/Desktop/SDC/sdc-fruit-overview/init_data/styles.csv";
const skusCSV =
  "/Users/anthony/Desktop/SDC/sdc-fruit-overview/init_data/skus.csv";
const photosCSV =
  "/Users/anthony/Desktop/SDC/sdc-fruit-overview/init_data/photos.csv";

use("products");
db.dropDatabase();
console.log("Dropped Products");

const productAggregation = [
  {
    $addFields: {
      last_modified: new Date(),
    },
  },
  {
    $lookup: {
      from: "features",
      localField: "product_id",
      foreignField: "product_id",
      pipeline: [
        {
          $project: {
            _id: 0,
            product_id: 0,
            feature_id: 0,
          },
        },
      ],
      as: "features",
    },
  },
  {
    $merge: {
      into: "products",
    },
  },
];

const styleAggregation = [
  {
    $addFields: {
      last_modified: new Date(),
    },
  },
  {
    $lookup: {
      from: "photos",
      localField: "style_id",
      foreignField: "style_id",
      pipeline: [
        {
          $project: {
            _id: 0,
            style_id: 0,
            photo_id: 0,
          },
        },
      ],
      as: "photos",
    },
  },
  {
    $lookup: {
      from: "skus",
      localField: "style_id",
      foreignField: "style_id",
      pipeline: [
        {
          $project: {
            _id: 0,
            style_id: 0,
          },
        },
      ],
      as: "skus",
    },
  },
  {
    $addFields: {
      skus: {
        $arrayToObject: {
          $zip: {
            inputs: [
              {
                $map: {
                  input: {
                    $range: [
                      0,
                      {
                        $size: "$skus",
                      },
                    ],
                  },
                  in: {
                    $toString: "$$this",
                  },
                },
              },
              "$skus",
            ],
          },
        },
      },
    },
  },
  {
    $merge: {
      into: "styles",
    },
  },
];

const createDocs = (csvFilePath, collection) =>
  new Promise((resolve, reject) => {
    console.log(`Importing ${collection}`);
    exec(
      `mongoimport --uri=mongodb://localhost/products --collection=${collection} --file=${csvFilePath} --type=csv --headerline`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
        console.log(`Successfully imported ${collection}`);
        resolve(collection);
      }
    );
  });

const importData = () =>
  new Promise(async (resolve, reject) => {
    createDocs(productsCSV, "products")
      .then(() => {
        console.log("Indexing Products");
        db.products.createIndex({ product_id: 1 });
      })
      .catch((err) => console.error("Error creating products", err));

    createDocs(featuresCSV, "features")
      .then(() => {
        console.log("Indexing Features");
        db.features.createIndex({ product_id: 1 });
      })
      .catch((err) => console.log("Error creating features", err));

    createDocs(stylesCSV, "styles")
      .then(() => {
        console.log("Indexing Styles");
        db.styles.createIndex({ product_id: 1 });
      })
      .catch((err) => console.log("Error creating styles", err));

    createDocs(photosCSV, "photos")
      .then(() => {
        console.log("Indexing Photos");
        db.photos.createIndex({ style_id: 1 });
      })
      .catch((err) => console.log("Error creating photos", err));

    createDocs(skusCSV, "skus")
      .then(() => {
        console.log("Indexing Skus");
        db.skus.createIndex({ style_id: 1 });
      })
      .catch((err) => console.log("Error creating skus", err));

    resolve();
  });

importData()
  .then(() => {
    db.products.aggregate(productAggregation);
    db.styles.aggregate(styleAggregation);
  })
  .catch((err) => console.log("Error Aggregating", err));
