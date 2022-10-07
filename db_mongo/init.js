const { exec } = require('child_process');

const productsCSV =
  '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/product.csv';
const featuresCSV =
  '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/features.csv';
const stylesCSV =
  '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/styles.csv';
const skusCSV =
  '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/skus.csv';
const photosCSV =
  '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/photos.csv';

use('products');
db.dropDatabase();

const productAggregation = [
  {
    $addFields: {
      last_modified: new Date(),
    },
  },
  {
    $lookup: {
      from: 'features',
      localField: 'product_id',
      foreignField: 'product_id',
      pipeline: [
        {
          $project: {
            _id: 0,
            product_id: 0,
            feature_id: 0,
          },
        },
      ],
      as: 'features',
    },
  },
  {
    $merge: {
      into: 'products',
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
      from: 'photos',
      localField: 'style_id',
      foreignField: 'style_id',
      pipeline: [
        {
          $project: {
            _id: 0,
            style_id: 0,
            photo_id: 0,
          },
        },
      ],
      as: 'photos',
    },
  },
  {
    $lookup: {
      from: 'skus',
      localField: 'style_id',
      foreignField: 'style_id',
      pipeline: [
        {
          $project: {
            _id: 0,
            style_id: 0,
            sku_id: 0,
          },
        },
      ],
      as: 'skus',
    },
  },
  // {
  //   $addFields: {
  //     skus: {
  //       $arrayToObject: {
  //         $zip: {
  //           inputs: [
  //             {
  //               $map: {
  //                 input: {
  //                   $range: [
  //                     0,
  //                     {
  //                       $size: '$skus',
  //                     },
  //                   ],
  //                 },
  //                 in: {
  //                   $toString: '$$this',
  //                 },
  //               },
  //             },
  //             '$skus',
  //           ],
  //         },
  //       },
  //     },
  //   },
  // },
  {
    $merge: {
      into: 'styles',
      // on: '$skus',
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

const aggregateDocs = (collection) => {
  console.log(`Aggregating ${collection}`);

  switch (collection) {
    case 'products':
      db.products.createIndex({ product_id: 1 });
      db.features.createIndex({ product_id: 1 });
      db.products.aggregate(productAggregation);
      db.features.drop();
      break;

    case 'styles':
      db.styles.createIndex({ style_id: 1 });
      db.styles.createIndex({ is_default: -1 });
      db.photos.createIndex({ style_id: 1 });
      db.skus.createIndex({ style_id: 1 });
      db.styles.aggregate(styleAggregation);
      break;
    default:
  }

  console.log(`Successfully aggregated ${collection}`);
};

createDocs(productsCSV, 'products');
createDocs(stylesCSV, 'styles');
createDocs(photosCSV, 'photos');

createDocs(featuresCSV, 'features').then((collection) =>
  aggregateDocs('products')
);

createDocs(skusCSV, 'skus').then((collection) => aggregateDocs('styles'));

// get default style in product
// get skus array turned to an embedded object
