// // import dotenv from 'dotenv';
// // import initMongoConnection from './db/initMongoConnection.js';
// // import setupServer from './server.js';

// // dotenv.config();

// // await initMongoConnection();
// // setupServer();

// import dotenv from 'dotenv';
// dotenv.config();

// import initMongoConnection from './db/initMongoConnection.js';
// import setupServer         from './server.js';

// console.log('ENV CHECK ➞', {
//   MONGODB_URL:     process.env.MONGODB_URL,
//   MONGODB_USER:    process.env.MONGODB_USER,
//   MONGODB_PASSWORD:process.env.MONGODB_PASSWORD,
//   MONGODB_DB:      process.env.MONGODB_DB,
//   ACCESS_SECRET:   process.env.ACCESS_SECRET ? '[ok]' : undefined,
//   REFRESH_SECRET:  process.env.REFRESH_SECRET ? '[ok]' : undefined,
//   PORT:            process.env.PORT
// });

// await initMongoConnection();
// setupServer();

import dotenv from 'dotenv';
dotenv.config();

import initMongoConnection from './db/initMongoConnection.js';
import setupServer         from './server.js';

console.log('ENV CHECK ➞', {
  MONGODB_URI:    process.env.MONGODB_URI?.slice(0,30)+'…',
  ACCESS_SECRET:  process.env.ACCESS_SECRET ? '[ok]' : undefined,
  REFRESH_SECRET: process.env.REFRESH_SECRET ? '[ok]' : undefined,
  PORT:           process.env.PORT
});

await initMongoConnection();
setupServer();
