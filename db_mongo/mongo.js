require('dotenv').config();
const mongoose = require('mongoose');

// const { MONGO_URI, MONGO_NAME } = process.env;

// mongoose.connect('mongodb://anthony:robert99@3.208.202.247:27017/products', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect('mongodb://localhost/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => console.log('Connected to MongoDB'));
db.on('error', (error) => console.log(error));

module.exports = db;
