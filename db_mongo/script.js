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

parseCSV(productsCSV, 'products');
// parseCSV(featuresCSV, 'features');
// parseCSV(photosCSV, 'photos');
parseCSV(stylesCSV, 'styles');
// parseCSV(skusCSV, 'skus');





const createSubdocuments = (csvFilePath, collection) => {
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

// createSubdocuments(featuresCSV, 'features');
// createSubdocuments(skusCSV, 'skus');
// createSubdocuments(photosCSV, 'photos');

