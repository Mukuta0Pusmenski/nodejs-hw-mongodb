// // // import express from 'express';
// // // import authenticate from '../middlewares/authenticate.js';
// // // import upload from '../middlewares/upload.js';
// // // import { updateAvatar } from '../controllers/users.js';

// // // const router = express.Router();

// // // // PATCH /users/avatar — оновити аватар
// // // router.patch(
// // //   '/users/avatar',
// // //   authenticate,
// // //   upload.single('avatar'),
// // //   updateAvatar
// // // );

// // // export default router;
// // import express from 'express';
// // import authenticate from '../middlewares/authenticate.js';;
// // import upload       from '../middlewares/upload.js';
// // import { updateAvatar } from '../controllers/users.js';
// // import usersRouter from './routers/users.js';

// // const router = express.Router();
// // const app = express();
// // // PATCH /users/avatar
// // router.patch(
// //   '/users/avatar',
// //   authenticate,
// //   upload.single('avatar'),
// //   updateAvatar
// // );

// // export default router;

// // app.use(express.json());
// // app.use('/auth', authRouter);
// // app.use('/',   usersRouter);
// // src/routers/users.js

// import express from 'express';
// import authenticate from '../middlewares/authenticate.js';
// import upload       from '../middlewares/upload.js';
// import { updateAvatar } from '../controllers/users.js';

// const router = express.Router();

// // PATCH /users/avatar
// router.patch(
//   '/users/avatar',
//   authenticate,
//   upload.single('avatar'),
//   updateAvatar
// );

// export default router;

// src/routers/users.js

import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';
import { getCurrent, updateAvatar } from '../controllers/users.js';

const router = express.Router();

// GET /users/current — отримати дані поточного користувача
router.get('/current', authenticate, getCurrent);

// PATCH /users/avatar — оновити аватарку
router.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  updateAvatar
);

export default router;
