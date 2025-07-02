
// // // import express from 'express';
// // // import contactsRouter from './routers/contacts.js';
// // // import notFoundHandler from './middlewares/notFoundHandler.js';
// // // import errorHandler from './middlewares/errorHandler.js';

// // // const setupServer = () => {
// // //   const app = express();

// // //   app.use(express.json());
// // //   app.use(contactsRouter);

 
// // //   app.use(notFoundHandler);


// // //   app.use(errorHandler);

// // //   const PORT = isNaN(Number(process.env.PORT)) ? 3000 : Number(process.env.PORT);

// // //   app.listen(PORT, () => {
// // //     console.log(`Server is running on port ${PORT}`);
// // //   }).on('error', (err) => {
// // //     console.error(`Error starting server on port ${PORT}:`, err.message);
// // //   });

// // //   console.log('Server setup complete.');
// // // };

// // // export default setupServer;

// // // console.log('Server module loaded.');

// // import dotenv from 'dotenv';
// // dotenv.config();

// // import express from 'express';
// // import cookieParser from 'cookie-parser';

// // import initMongoConnection from './db/initMongoConnection.js';
// // import authRouter            from './routers/auth.js';
// // import contactsRouter        from './routers/contacts.js';
// // import notFoundHandler       from './middlewares/notFoundHandler.js';
// // import errorHandler          from './middlewares/errorHandler.js';

// // await initMongoConnection();

// // const setupServer = () => {
// //   const app = express();

// //   app.use(express.json());
// //   app.use(express.urlencoded({ extended: true }));
// //   app.use(cookieParser());

// //   app.use(authRouter);     // маршрути /auth
// //   app.use(contactsRouter); // маршрути /contacts

// //   app.use(notFoundHandler);
// //   app.use(errorHandler);

// //   const PORT = isNaN(Number(process.env.PORT))
// //     ? 3000
// //     : Number(process.env.PORT);

// //   app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// //   }).on('error', err => {
// //     console.error(`Error starting server on port ${PORT}:`, err.message);
// //   });

// //   console.log('Server setup complete.');
// // };

// // export default setupServer;

// import express from 'express';
// import cookieParser from 'cookie-parser';

// import authRouter     from './routers/auth.js';
// import contactsRouter from './routers/contacts.js';
// import notFoundHandler from './middlewares/notFoundHandler.js';
// import errorHandler    from './middlewares/errorHandler.js';

// export default function setupServer() {
//   const app = express();

//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   app.use(cookieParser());

//   app.use(authRouter);
//   app.use(contactsRouter);

//   app.use(notFoundHandler);
//   app.use(errorHandler);

//   const PORT = Number(process.env.PORT) || 3000;
//   app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
//   });
// }

import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter     from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler    from './middlewares/errorHandler.js';

export default function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(authRouter);
  app.use(contactsRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);
  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
