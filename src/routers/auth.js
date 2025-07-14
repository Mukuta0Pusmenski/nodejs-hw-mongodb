
// import express from 'express';
// import cookieParser from 'cookie-parser';
// import { sendResetEmailSchema } from '../schemas/auth.js';
// import { sendResetEmail } from '../controllers/auth.js';
// import { resetPwdSchema }  from '../schemas/auth.js';
// import { resetPassword } from '../controllers/auth.js';
// import { sendResetEmail, resetPassword } from '../controllers/auth.js';
// import { sendResetEmailSchema, resetPwdSchema } from '../schemas/auth.js';


// import {
//   register,
//   login,
//   refresh,
//   logout
// } from '../controllers/auth.js';
// import { validateBody } from '../middlewares/validateBody.js';
// import { registerSchema, loginSchema } from '../schemas/auth.js';

// const router = express.Router();
// router.use(cookieParser());

// router.post('/register', validateBody(registerSchema), register);
// router.post('/login',    validateBody(loginSchema),    login);
// router.post('/refresh',  refresh);
// router.post('/logout', logout);
// router.post(
//   '/send-reset-email',
//   validateBody(sendResetEmailSchema),
//   sendResetEmail
// );

// router.post(
//   '/reset-pwd',
//   validateBody(resetPwdSchema),
//   resetPassword
// );


// export default router;


import express from 'express';
import cookieParser from 'cookie-parser';
// import { authenticate } from '../middlewares/authenticate.js';
import { updateAvatar } from '../controllers/users.js';

import {
  register,
  login,
  refresh,
  logout,
  sendResetEmail,
  resetPassword
} from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';
import {
  registerSchema,
  loginSchema,
  sendResetEmailSchema,
  resetPwdSchema
} from '../schemas/auth.js';

const router = express.Router();
router.use(cookieParser());

router.post('/register',
  validateBody(registerSchema),
  register
);

router.post('/login',
  validateBody(loginSchema),
  login
);

router.post('/refresh',
  refresh
);

router.post('/logout',
  logout
);

router.post('/send-reset-email',
  validateBody(sendResetEmailSchema),
  sendResetEmail
);

router.post('/reset-pwd',
  validateBody(resetPwdSchema),
  resetPassword
);

// router.patch(
//   '/users/avatar',
//   authenticate,
//   upload.single('avatar'),
//   updateAvatar
// );

export default router;
