const { exec } = require("child_process");

const productsCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/product.csv';
const featuresCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/features.csv';
const stylesCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/styles.csv';
const skusCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/skus.csv';
const photosCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/photos.csv';

use('products');
db.dropDatabase();

const productAggregation = [
  // { $set: { _id: '$product_id'}},
  // { $unset: 'product_id'},
  { $addFields: {
      created_at: new Date(),
      modified_at: new Date(),
  }},
  { $out: 'Products'}
];

const styleAggregation = [
  // { $set: { _id: '$style_id'}},
  // { $unset: 'style_id'},
  { $addFields: {
      created_at: new Date(),
      modified_at: new Date(),
  }},
  { $out: 'Styles'}
];

const featureAggregation = [
  // { $set: { _id: '$feature_id'}},
  // { $unset: 'feature_id'},
  { $addFields: {
      created_at: new Date(),
      modified_at: new Date(),
  }},
  { $out: 'Features'}
];

const photoAggregation = [
  // { $set: { _id: '$photo_id'}},
  // { $unset: 'photo_id'},
  { $addFields: {
      created_at: new Date(),
      modified_at: new Date(),
  }},
  { $out: 'Photos'}
];

const skuAggregation = [
  // { $set: { _id: '$sku_id'}},
  // { $unset: 'sku_id'},
  { $addFields: {
      created_at: new Date(),
      modified_at: new Date(),
  }},
  { $out: 'Skus'}
];

const createDocs = (csvFilePath, collection) => {
  return new Promise (async (resolve, reject) => {
    console.log(`Importing ${collection}`)
    await exec(`mongoimport --uri=mongodb://localhost/products --collection=${collection} --file=${csvFilePath} --type=csv --headerline`, (error, stdout, stderr) => {
      if(error) {
        console.log(`error: ${error}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
      }
      console.log(`Successfully imported ${collection}`);
      resolve(collection);
    })
  })
}

const aggregateDocs = (collection) => {
  console.log(`Aggregating ${collection}`)
  switch (collection) {
    case 'Products':
      db.Products.aggregate(productAggregation);
    case 'Styles':
      db.Styles.aggregate(styleAggregation);
      db.Styles.createIndex({ 'product_id': 1})
      db.Styles.createIndex({ 'is_default': -1})
    case 'Features':
      db.Features.aggregate(featureAggregation);
      db.Features.createIndex({ 'product_id': 1})
    case 'Photos':
      db.Photos.aggregate(photoAggregation);
      db.Photos.createIndex({ 'style_id': 1})
    case 'Skus':
      db.Skus.aggregate(skuAggregation);
      db.Skus.createIndex({ 'style_id': 1})
  }

  console.log(`Successfully aggregated ${collection}`)
}

createDocs(productsCSV, 'Products')
.then((collection) => aggregateDocs(collection));

createDocs(stylesCSV, 'Styles')
.then((collection) => aggregateDocs(collection));

createDocs(featuresCSV, 'Features')
.then((collection) => aggregateDocs(collection));

createDocs(photosCSV, 'Photos')
.then((collection) => aggregateDocs(collection));

createDocs(skusCSV, 'Skus')
.then((collection) => aggregateDocs(collection));


