// // import { Router } from 'express';
// // import {
// //   registerUser,
// //   loginUser,
// //   refreshUser,
// //   logoutUser,
// // } from '../controllers/auth.js';

// // const router = Router();

// // router.post('/auth/register', registerUser);
// // router.post('/auth/login',    loginUser);
// // router.post('/auth/refresh',  refreshUser);
// // router.post('/auth/logout',   logoutUser);

// // export default router;

// // src/routers/auth.js
// import express from 'express';
// import authCtrl from '../controllers/auth.js';
// import validateBody from '../middlewares/validateBody.js';
// import { registerSchema, loginSchema } from '../schemas/auth.js';

// const router = express.Router();

// // додаємо Joi-валідацію перед викликом контролера
// router.post(
//   '/auth/register',
//   validateBody(registerSchema),
//   authCtrl.register
// );

// router.post(
//   '/auth/login',
//   validateBody(loginSchema),
//   authCtrl.login
// );

// // інші ендпоінти: refresh, logout …
// export default router;

import express from 'express';
import cookieParser from 'cookie-parser';
import {
  register,
  login,
  refresh,
  logout
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../schemas/auth.js';

const router = express.Router();

// Щоб читати кукі
router.use(cookieParser());

router.post(
  '/auth/register',
  validateBody(registerSchema),
  register
);

router.post(
  '/auth/login',
  validateBody(loginSchema),
  login
);

router.post('/auth/refresh', refresh);
router.post('/auth/logout', logout);

export default router;
