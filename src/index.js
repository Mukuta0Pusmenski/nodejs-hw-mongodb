
// // // // // import dotenv from 'dotenv';
// // // // // dotenv.config();


// // // // // import express from 'express';
// // // // // import authRouter  from './routers/auth.js';
// // // // // import usersRouter from './routers/users.js'

// // // // // const app = express();

// // // // // import initMongoConnection from './db/initMongoConnection.js';
// // // // // import setupServer from './server.js';

// // // // // console.log('ENV CHECK ➞', {
// // // // //   MONGODB_URI:    process.env.MONGODB_URI?.slice(0,30) + '…',
// // // // //   ACCESS_SECRET:  process.env.ACCESS_SECRET  ? '[ok]' : undefined,
// // // // //   REFRESH_SECRET: process.env.REFRESH_SECRET ? '[ok]' : undefined,
// // // // //   PORT:           process.env.PORT
// // // // // });

// // // // // app.use('/auth', authRouter);
// // // // // app.use('/', usersRouter);
// // // // // await initMongoConnection();
// // // // // setupServer();

// // // // // import dotenv from 'dotenv';
// // // // // dotenv.config();


// // // // import 'dotenv/config';

// // // // import express from 'express';
// // // // import authRouter  from './routers/auth.js';
// // // // import usersRouter from './routers/users.js';

// // // // import initMongoConnection from './db/initMongoConnection.js';
// // // // import setupServer from './server.js';

// // // // import mongoose from 'mongoose';
// // // // import authRouter from './routes/auth.js';

// // // // const app = express();

// // // // app.use(express.json());
// // // // // підключаємо лише роутери, без зайвих app.use у них
// // // // app.use('/auth', authRouter);
// // // // app.use('/',   usersRouter);

// // // // console.log('ENV CHECK ➞', { /*…*/ });

// // // // await initMongoConnection();
// // // // setupServer();

// // // // src/index.js

// // // // 1. Підвантажуємо .env — робить process.env.* доступними
// // // import 'dotenv/config';



// // // // 2. Підключаємо ініціалізацію MongoDB і старт сервера
// // // import initMongoConnection from './db/initMongoConnection.js';
// // // import setupServer          from './server.js';

// // // dotenv.config({
// // //   path:     path.resolve(process.cwd(), '.env'),
// // //   override: true
// // // });;

// // // console.log('🛠 cwd =', process.cwd());
// // // console.log('🛠 files =', fs.readdirSync(process.cwd()));
// // // console.log(
// // //   '🛠 ENV files =',
// // //   fs.readdirSync(process.cwd()).filter(f => f.startsWith('.env'))
// // // );
// // // console.log('🛠 CLOUDINARY_CLOUD_NAME =', process.env.CLOUDINARY_CLOUD_NAME);

// // // // 3. (опційно) Виводимо для діагностики ключові змінні
// // // console.log('⚙️ ENV CHECK ➞', {
// // //   MONGODB_URI:    process.env.MONGODB_URI,
// // //   ACCESS_SECRET:  process.env.ACCESS_SECRET,
// // //   REFRESH_SECRET: process.env.REFRESH_SECRET,
// // //   RESET_SECRET:   process.env.JWT_SECRET_RESET,
// // //   MAILGUN_KEY:    process.env.MAILGUN_API_KEY,
// // //   CLOUD_NAME:     process.env.CLOUDINARY_CLOUD_NAME,
// // // });

// // // // 4. Стартуємо все в асинхронній функції
// // // const startApp = async () => {
// // //   try {
// // //     await initMongoConnection();
// // //     setupServer();
// // //   } catch (err) {
// // //     console.error('✖️ Failed to start app:', err);
// // //     process.exit(1);
// // //   }
// // // };

// // // startApp();

// // // 1) Явний імпорт dotenv замість 'dotenv/config'
// // import dotenv from 'dotenv';
// // import fs from 'fs';
// // import path from 'path';

// // // 2) Конфігурюємо dotenv з override
// // dotenv.config({
// //   path:     path.resolve(process.cwd(), '.env'),
// //   override: true
// // });

// // // 3) Діагностика – що у нас в поточній теці та які .env-файли
// // console.log('🛠 cwd =', process.cwd());
// // console.log('🛠 files =', fs.readdirSync(process.cwd()));
// // console.log(
// //   '🛠 ENV files =',
// //   fs.readdirSync(process.cwd()).filter(f => f.startsWith('.env'))
// // );
// // console.log('🛠 CLOUDINARY_CLOUD_NAME =', process.env.CLOUDINARY_CLOUD_NAME);

// // // 4) (опційно) Інші ключові змінні
// // console.log('⚙️ ENV CHECK ➞', {
// //   MONGODB_URI:  process.env.MONGODB_URI,
// //   CLOUD_NAME:   process.env.CLOUDINARY_CLOUD_NAME,
// //   SMTP_HOST:    process.env.SMTP_HOST
// // });

// // // 5) Далі – ваш старт додатку
// // import initMongoConnection from './db/initMongoConnection.js';
// // import setupServer          from './server.js';

// // const startApp = async () => {
// //   try {
// //     await initMongoConnection();
// //     setupServer();
// //   } catch (err) {
// //     console.error('✖️ Failed to start app:', err);
// //     process.exit(1);
// //   }
// // };

// // startApp();
// // src/index.js
// import dotenv from 'dotenv';
// import fs from 'fs';
// import path from 'path';

// // 1) Примусово завантажуємо .env і перезаписуємо змінні середовища
// dotenv.config({
//   path:     path.resolve(process.cwd(), '.env'),
//   override: true
// });

// // 2) Діагностичний вивід
// console.log('🛠 cwd =', process.cwd());
// console.log('🛠 files =', fs.readdirSync(process.cwd()));
// console.log(
//   '🛠 ENV files =',
//   fs.readdirSync(process.cwd()).filter(f => f.startsWith('.env'))
// );
// console.log('🛠 CLOUDINARY_CLOUD_NAME =', process.env.CLOUDINARY_CLOUD_NAME);

// // 3) Ініціалізація БД та запуск сервера
// import initMongoConnection from './db/initMongoConnection.js';
// import setupServer          from './server.js';

// const startApp = async () => {
//   try {
//     await initMongoConnection();
//     setupServer();
//   } catch (err) {
//     console.error('✖️ Failed to start app:', err);
//     process.exit(1);
//   }
// };

// startApp();

// src/index.js
import initMongoConnection from './db/initMongoConnection.js';
import setupServer        from './server.js';

const startApp = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (err) {
    console.error('✖️ Failed to start app:', err);
    process.exit(1);
  }
};

startApp();
