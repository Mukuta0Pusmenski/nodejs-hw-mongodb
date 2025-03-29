// require('dotenv').config();
require('dotenv').config();
const initMongoConnection = require('./db/initMongoConnection');
const setupServer = require('./server');

setupServer();
;

const startApp = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Error starting the app:', error.message);
  }
};

startApp();

// console.log('Checking environment variables...');
// console.log('MONGODB_URL:', process.env.MONGODB_URL);
// console.log('MONGODB_USER:', process.env.MONGODB_USER);
// console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);
// console.log('MONGODB_DB:', process.env.MONGODB_DB);
// console.log('PORT:', process.env.PORT);

// console.log('Завантаження змінних середовища...');
// console.log('process.env:', process.env);



// console.log('process.env:', process.env);
// console.log('MONGODB_URL:', process.env.MONGODB_URL);
// console.log('MONGODB_USER:', process.env.MONGODB_USER);
// console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);
// console.log('MONGODB_DB:', process.env.MONGODB_DB);
// console.log('PORT:', process.env.PORT);

