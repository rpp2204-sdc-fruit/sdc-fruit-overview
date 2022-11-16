require("dotenv").config();
require("../db_mongo/mongo.js");
require("../cache/redis.js");

const express = require("express");
// const history = require('connect-history-api-fallback');
const compression = require("compression");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/../client/dist")));

app.get(`/loaderio-6bb9cb11b37d573ec15a7a348de8829f`, (req, res) => {
  res.send("loaderio-6bb9cb11b37d573ec15a7a348de8829f");
});

app.use("/", require("./routes.js"));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
