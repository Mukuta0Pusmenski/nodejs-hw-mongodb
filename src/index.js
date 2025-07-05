
import dotenv from 'dotenv';
dotenv.config();

import initMongoConnection from './db/initMongoConnection.js';
import setupServer from './server.js';

console.log('ENV CHECK ➞', {
  MONGODB_URI:    process.env.MONGODB_URI?.slice(0,30) + '…',
  ACCESS_SECRET:  process.env.ACCESS_SECRET  ? '[ok]' : undefined,
  REFRESH_SECRET: process.env.REFRESH_SECRET ? '[ok]' : undefined,
  PORT:           process.env.PORT
});

await initMongoConnection();
setupServer();

