require("dotenv").config();
const Redis = require("redis");

const { REDIS_HOST, REDIS_PORT } = process.env;
const cache = Redis.createClient({
  socket: {
    host: `${REDIS_HOST}`,
    port: `${REDIS_PORT}`,
  },
});

cache.connect();

cache.on("connect", () => console.log("Connected to Redis"));
cache.on("error", () => console.error("Error connecting to Redis"));
cache.on("end", () => console.log("Disconnected from Redis"));
cache.on("reconnecting", () => console.log("Reconnecting to Redis"));

module.exports = cache;
