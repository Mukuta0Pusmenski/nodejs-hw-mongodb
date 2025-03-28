require('dotenv').config();
const initMongoConnection = require('./db/initMongoConnection');
const setupServer = require('./server');

const startApp = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Error starting the app:', error.message);
  }
};

startApp();

require('dotenv').config();

console.log('ENV VARIABLES LOADED:');
console.log('MONGODB_URL:', process.env.MONGODB_URL);
console.log('MONGODB_USER:', process.env.MONGODB_USER);
console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);
console.log('MONGODB_DB:', process.env.MONGODB_DB);
console.log('PORT:', process.env.PORT);

// Якщо якась змінна undefined — Render їх не передає.
