// const fs = require('fs');
// const Papa = require('papaparse');

// const { Products, Features, Sytles, Skus, Photos } = require('./schema')


// // const readProducts = async (filePath) => {
//   //   const csvFile = fs.readFileSync(filePath)
//   //   const csvData csvFile.toString()
//   // }
//   const createDocuments = (data) => {
//     // console.log(Array.isArray(data))
//     // Products.insertMany(data)
//     //   .then(() => console.log('Data inserted'))
//     //   .catch(error => console.log('Error:', error))
//   }

// const productsCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/product.csv';
// const csvFile = fs.readFileSync(productsCSV);
// const csvData = csvFile.toString();

// Papa.parse(csvData, {
//   header: true,
//   skipEmptyLines: true,
//   complete: function(results) {
//     // createDocuments(results.data);
//     const jsonFile = fs.createWriteStream('/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/product.json');
//     jsonFile.write(JSON.stringify(results));
//     jsonFile.end();
//     createDocuments();
//   }
// });


const fs = require('fs');
const Papa = require('papaparse');
const { exec } = require("child_process");

const { Products, Features, Sytles, Skus, Photos } = require('./schema')

const productsCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/product.csv';
const featuresCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/features.csv';
const stylesCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/styles.csv';
const skusCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/skus.csv';
const photosCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/photos.csv';

const convertData = async (filePath, collection) => {
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();
  const jsonFilePath = `/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/${collection}.json`

  return new Promise(resolve => {
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      chunk: async function(results) {
        const jsonFile = await fs.createWriteStream(jsonFilePath);
        jsonFile.write(JSON.stringify(results.data));
        jsonFile.end();
      },
      complete: function(results, file) {
        resolve(jsonFilePath);
      }
    });

  })
}

const parseCSV = async (csv, collection) => {
  let jsonFilePath = await convertData(csv, collection);

  exec(`mongoimport --uri='mongodb://localhost/product_overview' --collection=${collection} --file=${jsonFilePath} --jsonArray`, (error, stdout, stderr) => {
    if(error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  })
}

// parseCSV(productsCSV, 'products');
// parseCSV(featuresCSV, 'features');
// parseCSV(photosCSV, 'photos');
// parseCSV(stylesCSV, 'styles');
// parseCSV(skusCSV, 'skus');





const createTempDocs = (csvFilePath, collection) => {
  exec(`mongoimport --uri=mongodb://localhost/product_overview --collection=${collection} --file=${csvFilePath} --type=csv --headerline`, (error, stdout, stderr) => {
    if(error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  })
}

createTempDocs(productsCSV, 'products');
createTempDocs(featuresCSV, 'features');
createTempDocs(photosCSV, 'photos');
createTempDocs(stylesCSV, 'styles');
createTempDocs(skusCSV, 'skus');

// // // const fs = require('fs');
// // // const Papa = require('papaparse');

// // // const { Products, Features, Sytles, Skus, Photos } = require('./schema')


// // // // const readProducts = async (filePath) => {
// // //   //   const csvFile = fs.readFileSync(filePath)
// // //   //   const csvData csvFile.toString()
// // //   // }
// // //   const createDocuments = (data) => {
// // //     // console.log(Array.isArray(data))
// // //     // Products.insertMany(data)
// // //     //   .then(() => console.log('Data inserted'))
// // //     //   .catch(error => console.log('Error:', error))
// // //   }

// // // const productsCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/product.csv';
// // // const csvFile = fs.readFileSync(productsCSV);
// // // const csvData = csvFile.toString();

// // // Papa.parse(csvData, {
// // //   header: true,
// // //   skipEmptyLines: true,
// // //   complete: function(results) {
// // //     // createDocuments(results.data);
// // //     const jsonFile = fs.createWriteStream('/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/product.json');
// // //     jsonFile.write(JSON.stringify(results));
// // //     jsonFile.end();
// // //     createDocuments();
// // //   }
// // // });


// // const fs = require('fs');
// // const Papa = require('papaparse');
// // const { exec } = require("child_process");

// // const { Products, Features, Sytles, Skus, Photos } = require('./schema')

// // const productsCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/product.csv';
// // const featuresCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/features.csv';
// // const stylesCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/styles.csv';
// // const skusCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/skus.csv';
// // const photosCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/photos.csv';

// // const convertData = async (filePath, collection) => {
// //   const csvFile = fs.readFileSync(filePath);
// //   const csvData = csvFile.toString();
// //   const jsonFilePath = `/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/${collection}.json`

// //   return new Promise(resolve => {
// //     Papa.parse(csvData, {
// //       header: true,
// //       skipEmptyLines: true,
// //       chunk: async function(results) {
// //         const jsonFile = await fs.createWriteStream(jsonFilePath);
// //         jsonFile.write(JSON.stringify(results.data));
// //         jsonFile.end();
// //       },
// //       complete: function(results, file) {
// //         resolve(jsonFilePath);
// //       }
// //     });

// //   })
// // }

// // const parseCSV = async (csv, collection) => {
// //   let jsonFilePath = await convertData(csv, collection);

// //   exec(`mongoimport --uri='mongodb://localhost/product_overview' --collection=${collection} --file=${jsonFilePath} --jsonArray`, (error, stdout, stderr) => {
// //     if(error) {
// //       console.log(`error: ${error.message}`);
// //       return;
// //     }
// //     if (stderr) {
// //       console.log(`stderr: ${stderr}`);
// //       return;
// //     }
// //     console.log(`stdout: ${stdout}`);
// //   })
// // }

// // parseCSV(productsCSV, 'products');
// // // parseCSV(featuresCSV, 'features');
// // // parseCSV(photosCSV, 'photos');
// // parseCSV(stylesCSV, 'styles');
// // // parseCSV(skusCSV, 'skus');





// // const createSubdocuments = (csvFilePath, collection) => {
// //   exec(`mongoimport --uri=mongodb://localhost/product_overview --collection=${collection} --file=${csvFilePath} --type=csv --headerline`, (error, stdout, stderr) => {
// //     if(error) {
// //       console.log(`error: ${error.message}`);
// //       return;
// //     }
// //     if (stderr) {
// //       console.log(`stderr: ${stderr}`);
// //       return;
// //     }
// //     console.log(`stdout: ${stdout}`);
// //   })
// // }

// // // createSubdocuments(featuresCSV, 'features');
// // // createSubdocuments(skusCSV, 'skus');
// // // createSubdocuments(photosCSV, 'photos');




// const fs = require('fs');
// const mongoose = require('mongoose');

// // mongoose.connect('mongodb://localhost/product_overview', { useNewUrlParser: true, useUnifiedTopology: true });

// // let db = mongoose.connection;

// // db.once('open', () => {
// //   console.log('Connected to MongoDB');
// //   insertProducts();
// // );

// // db.on('error', (error) => console.log(error) )

// const Papa = require('papaparse');
// const { Products, Features, Styles, Skus, Photos } = require('./schema')

// const productsCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/product.csv';
// const featuresCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/features.csv';
// const stylesCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/styles.csv';
// const skusCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/skus.csv';
// const photosCSV = '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/photos.csv';

// function parseInsert (csvFilePath, collection) {
//   return new Promise(resolve => {

//     const options = {
//       header: true,
//       skipEmptyLines: true,
//     //   // fastMode: true,
//       complete: function(results, parser) {

//         parser.pause();
//         console.log(results);

//         switch(collection) {
//           case 'products':
//             Products.insertMany(results)
//               .then(res => {
//                 // console.log('Succesfully inserted Products')
//                 resolve(console.log('Succesfully inserted Products'))
//               })
//               .catch(err => reject('Failed to insert Products', err.message))
//             break;
//           case 'styles':
//             Styles.insertMany(results)
//             .then(res => resolve('Succesfully inserted Styles'))
//             .catch(err => reject('Failed to insert Styles', err.message))
//             break;
//           case 'features':
//             Features.insertMany(results)
//             .then(res => resolve('Succesfully inserted Features'))
//             .catch(err => reject('Failed to insert Features', err.message))
//             break;
//           case 'skus':
//             Skus.insertMany(results)
//             .then(res => resolve('Succesfully inserted Skus'))
//             .catch(err => reject('Failed to insert Skus', err.message))
//             break;
//           case 'photos':
//             Photos.insertMany(results)
//             .then(res => resolve('Succesfully inserted Photos'))
//             .catch(err => reject('Failed to insert Photos', err.message))
//             break;
//         }
//         parser.resume();
//       }
//     }

//     const dataStream = fs.createReadStream(csvFilePath, {encoding: 'utf8'});
//     const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT, options)

//     dataStream.pipe(parseStream)

//     // let data = [];

//     // parseStream.on('data', results => {
//     //   switch(collection) {
//     //     case 'products':
//     //       Products.insertMany(results)
//     //       //   .then(res => {
//     //       //     // console.log('Succesfully inserted Products')
//     //       //     resolve(console.log('Succesfully inserted Products'))
//     //       //   })
//     //       //   .catch(err => reject('Failed to insert Products', err.message))
//     //       // break;
//     //     case 'styles':
//     //       Styles.insertMany(results)
//     //       // .then(res => resolve('Succesfully inserted Styles'))
//     //       // .catch(err => reject('Failed to insert Styles', err.message))
//     //       // break;
//     //     case 'features':
//     //       Features.insertMany(results)
//     //       // .then(res => resolve('Succesfully inserted Features'))
//     //       // .catch(err => reject('Failed to insert Features', err.message))
//     //       // break;
//     //     case 'skus':
//     //       Skus.insertMany(results)
//     //       // .then(res => resolve('Succesfully inserted Skus'))
//     //       // .catch(err => reject('Failed to insert Skus', err.message))
//     //       // break;
//     //     case 'photos':
//     //       Photos.insertMany(results)
//     //       // .then(res => resolve('Succesfully inserted Photos'))
//     //       // .catch(err => reject('Failed to insert Photos', err.message))
//     //       // break;
//     //   }
//     // })

//     // parseStream.on('finish', async () => {
//     //   // resolve(data);
//     //   dataStream.destroy();
//     // })
//   })
// }

// // const parseCSV = (csv, collection) => {

// //   return new Promise(async (resolve, reject) => {
// //     let jsonData = await getJson(csv, collection);

// //     switch(collection) {
// //       case 'products':
// //         Products.insertMany(jsonData)
// //           .then(res => {
// //             // console.log('Succesfully inserted Products')
// //             resolve(console.log('Succesfully inserted Products'))
// //           })
// //           .catch(err => reject('Failed to insert Products', err.message))
// //         break;
// //       case 'styles':
// //         Styles.insertMany(jsonData)
// //         .then(res => {
// //           resolve('Succesfully inserted Styles'))
// //         .catch(err => reject('Failed to insert Styles', err.message))
// //         break;
// //       case 'features':
// //         Features.insertMany(jsonData)
// //         .then(res => resolve('Succesfully inserted Features'))
// //         .catch(err => reject('Failed to insert Features', err.message))
// //         break;
// //       case 'skus':
// //         Skus.insertMany(jsonData)
// //         .then(res => resolve('Succesfully inserted Skus'))
// //         .catch(err => reject('Failed to insert Skus', err.message))
// //         break;
// //       case 'photos':
// //         Photos.insertMany(jsonData)
// //         .then(res => resolve('Succesfully inserted Photos'))
// //         .catch(err => reject('Failed to insert Photos', err.message))
// //         break;
// //     }
// //   })

// // }

// function insertProducts() {
//   console.log('Starting Products Insert');
//   parseInsert(productsCSV, 'products');
// }
// function insertStyles() {
//   console.log('Starting Styles Insert');
//   return parseInsert(stylesCSV, 'styles');
// }
// function insertFeatures() {
//   console.log('Starting Features Insert');
//   return parseInsert(featuresCSV, 'features');
// }
// function insertSkus() {
//   console.log('Starting Skus Insert')
//     return parseInsert(skusCSV, 'skus');
// }
// function insertPhotos() {
//   console.log('Starting Photos Insert');
//   return parseInsert(photosCSV, 'photos');
// }

// function insertData() {
//   return insertProducts().then(insertStyles).then(insertFeatures).then(insertSkus).then(insertPhotos).catch(err => console.log(err.message));
// }

// mongoose.connect('mongodb://localhost/product_overview', { useNewUrlParser: true, useUnifiedTopology: true });

// let db = mongoose.connection;

// db.once('open', () => {
//   console.log('Connected to MongoDB');
//   insertProducts();
// });

// db.on('error', (error) => console.log(error) )
// // insertData();
// // insertSkus();
// // insertProducts();




