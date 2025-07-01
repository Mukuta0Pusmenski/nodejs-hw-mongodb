// // import mongoose from 'mongoose';
// // import getEnvVar from '../utils/getEnvVar.js';

// // const initMongoConnection = async () => {
// //   try {
// //     await mongoose.connect(getEnvVar('MONGODB_URL'), {
// //       user: getEnvVar('MONGODB_USER'),
// //       pass: getEnvVar('MONGODB_PASSWORD'),
// //       dbName: getEnvVar('MONGODB_DB'),
// //     });
// //     console.log('Mongo connection successfully established!');
// //   } catch (error) {
// //     console.error('Error connecting to MongoDB:', error.message);
// //     process.exit(1);
// //   }
// // };

// // export default initMongoConnection;

// import mongoose from 'mongoose';
// import getEnvVar from '../utils/getEnvVar.js';

// const initMongoConnection = async () => {
//   try {
//     await mongoose.connect(getEnvVar('MONGODB_URL'), {
//       user:   getEnvVar('MONGODB_USER'),
//       pass:   getEnvVar('MONGODB_PASSWORD'),
//       dbName: getEnvVar('MONGODB_DB'),
//     });
//     console.log('Mongo connection successfully established!');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1);
//   }
// };

// export default initMongoConnection;

import mongoose from 'mongoose';
import getEnvVar from '../utils/getEnvVar.js';

const initMongoConnection = async () => {
  try {
    // Додатковий вивід для перевірки ENV-змінних
    console.log('--- Проверка ENV ---');
    console.log('MONGODB_URL=',     process.env.MONGODB_URL);
    console.log('MONGODB_USER=',    process.env.MONGODB_USER);
    console.log('MONGODB_PASSWORD=',process.env.MONGODB_PASSWORD);
    console.log('MONGODB_DB=',      process.env.MONGODB_DB);
    console.log(
      'ACCESS_SECRET=', process.env.ACCESS_SECRET
        ? process.env.ACCESS_SECRET.slice(0, 10) + '…'
        : undefined
    );
    console.log(
      'REFRESH_SECRET=', process.env.REFRESH_SECRET
        ? process.env.REFRESH_SECRET.slice(0, 10) + '…'
        : undefined
    );
    console.log('--------------------');

    // Підключення до MongoDB
    await mongoose.connect(getEnvVar('MONGODB_URL'), {
      user:   getEnvVar('MONGODB_USER'),
      pass:   getEnvVar('MONGODB_PASSWORD'),
      dbName: getEnvVar('MONGODB_DB'),
    });

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default initMongoConnection;

// ???