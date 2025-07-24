
// // // import 'dotenv/config';
// // // import initMongoConnection from './db/initMongoConnection.js';
// // // import setupServer        from './server.js';

// // // (async () => {
// // //   try {
// // //     await initMongoConnection();
// // //     setupServer();
// // //   } catch (err) {
// // //     console.error('✖️ Failed to start app:', err);
// // //     process.exit(1);
// // //   }
// // // })();
// // import 'dotenv/config';
// // import express from 'express';
// // import mongoose from 'mongoose';
// // import cookieParser from 'cookie-parser';

// // import authRouter from './routes/auth.js';

// // const app = express();

// // app.use(express.json());
// // app.use(cookieParser());

// // app.use('/auth', authRouter);

// // // централізований хендлер помилок
// // app.use((err, req, res, next) => {
// //   const status = err.status || 500;
// //   res.status(status).json({ status, message: err.message });
// // });

// // const { PORT, MONGODB_URI } = process.env;

// // mongoose
// //   .connect(MONGODB_URI)
// //   .then(() => {
// //     console.log('MongoDB connected');
// //     app.listen(PORT, () => {
// //       console.log(Server listening on port ${PORT});
// //     });
// //   })
// //   .catch(err => {
// //     console.error('DB connection error:', err);
// //     process.exit(1);
// //   });
// import 'dotenv/config';
// import express from 'express';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';

// import authRouter from './routes/auth.js';

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// app.use('/auth', authRouter);

// // централізований хендлер помилок
// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   res.status(status).json({ status, message: err.message });
// });

// const { PORT, MONGODB_URI } = process.env;

// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(PORT, () => {
//       console.log(Server listening on port ${PORT});
//     });
//   })
//   .catch(err => {
//     console.error('DB connection error:', err);
//     process.exit(1);
//   });

import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRouter from './routers/auth.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);

// централізований хендлер помилок
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ status, message: err.message });
});

const { PORT, MONGODB_URI } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB connection error:', err);
    process.exit(1);
  });