

// import express from 'express';
// import cookieParser from 'cookie-parser';

// import authRouter      from './routers/auth.js';
// import contactsRouter  from './routers/contacts.js';
// import authenticate    from './middlewares/authenticate.js';
// import notFoundHandler from './middlewares/notFoundHandler.js';
// import errorHandler from './middlewares/errorHandler.js';
// import usersRouter     from './routers/users.js';

// export default function setupServer() {
//   const app = express();

//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   app.use(cookieParser());

//   app.use('/auth', authRouter);
//   app.use('/contacts', authenticate, contactsRouter);
//   app.use('/',         usersRouter);

//   app.use(notFoundHandler);
//   app.use(errorHandler);

//   const PORT = Number(process.env.PORT) || 3000;
//   app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
//   });
// }

// src/server.js

import express from 'express';
import cookieParser from 'cookie-parser';

import authRouter       from './routers/auth.js';
import usersRouter      from './routers/users.js';
import contactsRouter   from './routers/contacts.js';
import authenticate     from './middlewares/authenticate.js';
import notFoundHandler  from './middlewares/notFoundHandler.js';
import errorHandler     from './middlewares/errorHandler.js';

export default function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Auth: register, login, reset-password тощо
  app.use('/auth', authRouter);

  // Users: /users/current, /users/avatar
  app.use('/users', usersRouter);

  // Contacts: під захистом авторизації
  app.use('/contacts', authenticate, contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
}
