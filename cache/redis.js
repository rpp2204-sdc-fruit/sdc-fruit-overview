const Redis = require('redis');

const cache = Redis.createClient();

cache.connect();

cache.on('connect', () => console.log('Connected to Redis'));
cache.on('error', () => console.error('Error connecting to Redis'));
cache.on('end', () => console.log('Disconnected from Redis'));
cache.on('reconnecting', () => console.log('Reconnecting to Redis'));

module.exports = cache;
