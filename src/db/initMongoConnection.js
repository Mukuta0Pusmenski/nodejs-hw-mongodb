const mongoose = require('mongoose');

const initMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWORD,
      dbName: process.env.MONGODB_DB,
    });
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Завершення процесу у разі помилки
  }
};

module.exports = initMongoConnection;

console.log('MONGODB_URL:', process.env.MONGODB_URL);
console.log('MONGODB_USER:', process.env.MONGODB_USER);
console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);
console.log('MONGODB_DB:', process.env.MONGODB_DB);
