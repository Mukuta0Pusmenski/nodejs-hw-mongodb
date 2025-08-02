

// // // // import express from 'express';
// // // // import cookieParser from 'cookie-parser';

// // // // import {
// // // //   register,
// // // //   login,
// // // //   refresh,
// // // //   logout,
// // // //   sendResetEmail,
// // // //   resetPassword
// // // // } from '../controllers/auth.js';

// // // // import { validateBody } from '../middlewares/validateBody.js';
// // // // import {
// // // //   registerSchema,
// // // //   loginSchema,
// // // //   sendResetEmailSchema,
// // // //   resetPwdSchema
// // // // } from '../schemas/auth.js';

// // // // const router = express.Router();
// // // // router.use(cookieParser());

// // // // router.post('/register',          validateBody(registerSchema), register);
// // // // router.post('/login',             validateBody(loginSchema),    login);
// // // // router.post('/refresh',                                       refresh);
// // // // router.post('/logout',                                        logout);

// // // // router.post(
// // // //   '/send-reset-email',
// // // //   validateBody(sendResetEmailSchema),
// // // //   sendResetEmail
// // // // );

// // // // router.post(
// // // //   '/reset-password/:token',
// // // //   validateBody(resetPwdSchema),
// // // //   resetPassword
// // // // );

// // // // export default router;

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

// // // router.post('/register', validateBody(registerSchema), register);
// // // router.post('/login',    validateBody(loginSchema),    login);
// // // router.post('/refresh',                                      refresh);
// // // router.post('/logout',                                       logout);

// // // router.post(
// // //   '/send-reset-email',
// // //   validateBody(sendResetEmailSchema),
// // //   sendResetEmail
// // // );

// // // // Замінили роут із параметром на чистий POST /reset-password
// // // router.post(
// // //   '/reset-password',
// // //   validateBody(resetPwdSchema),
// // //   resetPassword
// // // );

// // // export default router;

// // import { Router } from 'express';
// // import {
// //   login,
// //   refresh,
// //   logout,
// //   sendResetEmail,
// //   resetPassword
// // } from '../controllers/auth.js';

// // const router = Router();

// // router.post('/login',            login);
// // router.post('/refresh',          refresh);
// // router.post('/logout',           logout);
// // router.post('/send-reset-email', sendResetEmail);
// // router.post('/reset-password',   resetPassword);

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

// // AUTH FLOW
// router.post('/login',            login);
// router.post('/refresh',          refresh);
// router.post('/logout',           logout);

// // PASSWORD RESET
// router.post('/send-reset-email', sendResetEmail);
// router.post('/reset-pwd',        resetPassword);

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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Логін користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успішний логін
 *       401:
 *         description: Невірні credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/send-reset-email:
 *   post:
 *     tags: [Auth]
 *     summary: Надіслати email для скидання пароля
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Лист надіслано
 *       404:
 *         description: Користувач не знайдений
 */
router.post('/send-reset-email', sendResetEmail);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Скинути пароль за токеном
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пароль успішно змінено
 *       401:
 *         description: Токен прострочено або недійсний
 */
router.post('/reset-password', resetPassword);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Оновити JWT токени
 *     responses:
 *       200:
 *         description: Токен оновлено
 *       401:
 *         description: Нема refreshToken
 */
router.post('/refresh', refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Вихід із системи
 *     responses:
 *       204:
 *         description: Сесія завершена
 */
router.post('/logout', logout);

export default router;
