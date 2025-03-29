const dotenv = require('dotenv');
const mongoose = require('mongoose');
const setupServer = require('./server');
const getEnvVar = require('./utils/getEnvVar');

dotenv.config();

const MONGODB_URL = getEnvVar('MONGODB_URL');
const MONGODB_USER = getEnvVar('MONGODB_USER');
const MONGODB_PASSWORD = getEnvVar('MONGODB_PASSWORD');
const MONGODB_DB = getEnvVar('MONGODB_DB');

mongoose
  .connect(MONGODB_URL, {
    user: MONGODB_USER,
    pass: MONGODB_PASSWORD,
    dbName: MONGODB_DB,
  })
  .then(() => {
    console.log('Mongo connection successfully established!');
    setupServer();
  })
  .catch((error) => {
    console.error('Mongo connection error:', error.message);
  });
