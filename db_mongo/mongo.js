require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_USER, MONGO_PSWD, MONGO_URI, MONGO_PORT, MONGO_NAME } =
  process.env;

mongoose.connect(
  `mongodb://${MONGO_USER}:${MONGO_PSWD}@${MONGO_URI}:${MONGO_PORT}/${MONGO_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", (error) => console.log(error));

module.exports = db;
