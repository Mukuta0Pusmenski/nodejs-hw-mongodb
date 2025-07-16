
import express from 'express';
import cookieParser from 'cookie-parser';

import authRouter     from './routers/auth.js';
import usersRouter    from './routers/users.js';
import contactsRouter from './routers/contacts.js';
import authenticate   from './middlewares/authenticate.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler   from './middlewares/errorHandler.js';

export default function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use('/auth', authRouter);
  app.use('/users', usersRouter);
  app.use('/contacts', authenticate, contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
}
