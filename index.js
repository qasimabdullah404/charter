// index.js
require("dotenv").config();
const express = require('express');
const Redis = require('ioredis'); // Import ioredis
const logger = require('morgan');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (HTML, CSS)
app.use(logger('combined'))
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

// ioredis Connection
const redisClient = new Redis({
  host: redisHost,
  port: redisPort,
});

redisClient.on('error', (err) => console.log(`Redis Client Error on ${redisHost}:${redisPort}`, err));

redisClient.on('connect', () => {
    console.log(`Redis Connected. Host: ${redisHost}, Port: ${redisPort}`);
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/set', async (req, res) => {
  const { key, value } = req.body;
  try {
    await redisClient.set(key, value);
    res.send(`<p>Key "${key}" set to "${value}"</p><a href="/">Back</a>`);
  } catch (err) {
    res.send(`<p>Error setting key: ${err.message}</p><a href="/">Back</a>`);
  }
});

app.get('/get/:key', async (req, res) => {
  const key = req.params.key;
  try {
    const value = await redisClient.get(key);
    if (value) {
      res.send(`<p>Value for key "${key}": "${value}"</p><a href="/">Back</a>`);
    } else {
      res.send(`<p>Key "${key}" not found</p><a href="/">Back</a>`);
    }
  } catch (err) {
    res.send(`<p>Error getting key: ${err.message}</p><a href="/">Back</a>`);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});