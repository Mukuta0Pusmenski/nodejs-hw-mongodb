

// // // import express from 'express';
// // // import cookieParser from 'cookie-parser';

// // // import {
// // //   register,
// // //   login,
// // //   refresh,
// // //   logout,
// // //   sendResetEmail,
// // //   resetPassword
// // // } from '../controllers/auth.js';

// // // import { validateBody } from '../middlewares/validateBody.js';
// // // import {
// // //   registerSchema,
// // //   loginSchema,
// // //   sendResetEmailSchema,
// // //   resetPwdSchema
// // // } from '../schemas/auth.js';

// // // const router = express.Router();
// // // router.use(cookieParser());

// // // router.post('/register',          validateBody(registerSchema), register);
// // // router.post('/login',             validateBody(loginSchema),    login);
// // // router.post('/refresh',                                       refresh);
// // // router.post('/logout',                                        logout);

// // // router.post(
// // //   '/send-reset-email',
// // //   validateBody(sendResetEmailSchema),
// // //   sendResetEmail
// // // );

// // // router.post(
// // //   '/reset-password/:token',
// // //   validateBody(resetPwdSchema),
// // //   resetPassword
// // // );

// // // export default router;

// // import express from 'express';
// // import cookieParser from 'cookie-parser';

// // import {
// //   register,
// //   login,
// //   refresh,
// //   logout,
// //   sendResetEmail,
// //   resetPassword
// // } from '../controllers/auth.js';

// // import { validateBody } from '../middlewares/validateBody.js';
// // import {
// //   registerSchema,
// //   loginSchema,
// //   sendResetEmailSchema,
// //   resetPwdSchema
// // } from '../schemas/auth.js';

// // const router = express.Router();
// // router.use(cookieParser());

// // router.post('/register', validateBody(registerSchema), register);
// // router.post('/login',    validateBody(loginSchema),    login);
// // router.post('/refresh',                                      refresh);
// // router.post('/logout',                                       logout);

// // router.post(
// //   '/send-reset-email',
// //   validateBody(sendResetEmailSchema),
// //   sendResetEmail
// // );

// // // Замінили роут із параметром на чистий POST /reset-password
// // router.post(
// //   '/reset-password',
// //   validateBody(resetPwdSchema),
// //   resetPassword
// // );

// // export default router;

// import { Router } from 'express';
// import {
//   login,
//   refresh,
//   logout,
//   sendResetEmail,
//   resetPassword
// } from '../controllers/auth.js';

// const router = Router();

// router.post('/login',            login);
// router.post('/refresh',          refresh);
// router.post('/logout',           logout);
// router.post('/send-reset-email', sendResetEmail);
// router.post('/reset-password',   resetPassword);

// export default router;
import { Router } from 'express';
import {
  login,
  refresh,
  logout,
  sendResetEmail,
  resetPassword
} from '../controllers/auth.js';

const router = Router();

// AUTH FLOW
router.post('/login',            login);
router.post('/refresh',          refresh);
router.post('/logout',           logout);

// PASSWORD RESET
router.post('/send-reset-email', sendResetEmail);
router.post('/reset-pwd',        resetPassword);

export default router;
