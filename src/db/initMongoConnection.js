import mongoose from 'mongoose';
import getEnvVar from '../utils/getEnvVar.js';

const initMongoConnection = async () => {
  try {
    await mongoose.connect(getEnvVar('MONGODB_URL'), {
      user: getEnvVar('MONGODB_USER'),
      pass: getEnvVar('MONGODB_PASSWORD'),
      dbName: getEnvVar('MONGODB_DB'),
    });
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default initMongoConnection;
