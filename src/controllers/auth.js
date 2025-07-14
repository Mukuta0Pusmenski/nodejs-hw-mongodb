

// // import jwt from 'jsonwebtoken';
// // import createError from 'http-errors';
// // import User from '../models/user.js';
// // import Session from '../models/session.js';
// // import { sendResetEmail } from '../services/emailService.js';


// // const getExpiryDate = (token) => {
// //   const { exp } = jwt.decode(token);
// //   return new Date(exp * 1000);
// // };

// // export const register = async (req, res, next) => {
// //   try {
// //     const { name, email, password } = req.body;
// //     if (await User.findOne({ email })) {
// //       throw createError(409, 'Email in use');
// //     }
// //     const user = await User.create({ name, email, password });
// //     res.status(201).json({
// //       status: 201,
// //       message: 'Successfully registered a user!',
// //       data: { _id: user._id, name: user.name, email: user.email }
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const login = async (req, res, next) => {
// //   try {
// //     const { email, password } = req.body;
// //     const user = await User.findOne({ email });
// //     if (!user || !(await user.isValidPassword(password))) {
// //       throw createError(401, 'Email or password is wrong');
// //     }

// //     const userId = user._id;
// //     const accessToken  = jwt.sign({ id: userId }, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
// //     const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

// //     await Session.create({
// //       userId,
// //       accessToken,
// //       refreshToken,
// //       accessTokenValidUntil:  getExpiryDate(accessToken),
// //       refreshTokenValidUntil: getExpiryDate(refreshToken)
// //     });

// //     res
// //       .cookie('refreshToken', refreshToken, {
// //         httpOnly: true,
// //         maxAge:   30 * 24 * 60 * 60 * 1000
// //       })
// //       .cookie('accessToken', accessToken, {
// //         httpOnly: true,
// //         maxAge:   15 * 60 * 1000
// //       })
// //       .status(200)
// //       .json({
// //         status: 200,
// //         message: 'Successfully logged in a user!',
// //         data: { accessToken }
// //       });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const refresh = async (req, res, next) => {
// //   try {
// //     const { refreshToken } = req.cookies;
// //     if (!refreshToken) {
// //       throw createError(401, 'Refresh token missing');
// //     }

// //     const { id } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
// //     const session = await Session.findOne({ userId: id, refreshToken });
// //     if (!session) {
// //       throw createError(401, 'Session not found or logged out');
// //     }

// //     const newAccessToken  = jwt.sign({ id }, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
// //     const newRefreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

// //     session.accessToken  = newAccessToken;
// //     session.refreshToken = newRefreshToken;
// //     session.accessTokenValidUntil  = getExpiryDate(newAccessToken);
// //     session.refreshTokenValidUntil = getExpiryDate(newRefreshToken);
// //     await session.save();

// //     res
// //       .cookie('refreshToken', newRefreshToken, {
// //         httpOnly: true,
// //         maxAge:   30 * 24 * 60 * 60 * 1000
// //       })
// //       .cookie('accessToken', newAccessToken, {
// //         httpOnly: true,
// //         maxAge:   15 * 60 * 1000
// //       })
// //       .status(200)
// //       .json({
// //         status: 200,
// //         message: 'Successfully refreshed a session!',
// //         data: { accessToken: newAccessToken }
// //       });
// //   } catch (err) {
// //     if (err.name === 'TokenExpiredError') {
// //       next(createError(401, 'Refresh token expired'));
// //     } else {
// //       next(err);
// //     }
// //   }
// // };

// // export const logout = async (req, res, next) => {
// //   try {
// //     const { refreshToken } = req.cookies;
// //     if (refreshToken) {
// //       await Session.deleteOne({ refreshToken });
// //     }
// //     res
// //       .clearCookie('refreshToken')
// //       .clearCookie('accessToken')
// //       .status(204)
// //       .send();
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // // src/controllers/auth.js
// // export const sendResetEmail = async (req, res, next) => {
// //   try {
// //     const { email } = req.body;
// //     const user = await User.findOne({ email });
// //     if (!user) throw createError(404, 'User not found');

// //     const token = jwt.sign(
// //       { email },
// //       process.env.ACCESS_SECRET,
// //       { expiresIn: '5m' }
// //     );


// //     await sendResetEmail(email, token);;

// //     res.status(200).json({
// //       status: 200,
// //       message: 'Reset password email has been successfully sent.',
// //       data: {}
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const resetPassword = async (req, res, next) => {
// //   try {
// //     const { token, password } = req.body;

// //     let payload;
// //     try {
// //       payload = jwt.verify(token, process.env.ACCESS_SECRET);
// //     } catch {
// //       throw createError(401, 'Invalid or expired token');
// //     }

// //     const user = await User.findOne({ email: payload.email });
// //     if (!user) throw createError(404, 'User not found');

// //     user.password = password;
// //     await user.save();

// //     await Session.deleteMany({ userId: user._id });

// //     res.status(200).json({
// //       status: 200,
// //       message: 'Password has been reset successfully',
// //       data: {}
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // src/controllers/auth.js

// // import jwt from 'jsonwebtoken';
// // import createError from 'http-errors';
// // import User from '../models/user.js';
// // import Session from '../models/session.js';
// // import { sendResetEmail as sendResetEmailService }
// //   from '../services/emailService.js';
// // // …

// // export const sendResetEmail = async (req, res, next) => {
// //   try {
// //     const { email } = req.body;
// //     const user = await User.findOne({ email });
// //     if (!user) throw createError(404, 'User not found');

// //     const token = jwt.sign(
// //       { email },
// //       process.env.ACCESS_SECRET,
// //       { expiresIn: '5m' }
// //     );

// //     await sendResetEmailService(email, token);

// //     res.status(200).json({
// //       status: 200,
// //       message: 'Reset password email has been successfully sent.',
// //       data: {}
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // src/controllers/auth.js

// import jwt from 'jsonwebtoken';
// import createError from 'http-errors';
// import User from '../models/user.js';
// import Session from '../models/session.js';
// import { sendResetEmail as sendResetEmailService } from '../services/emailService.js';

// // Інші контролери: register, login, refresh, logout, resetPassword
// // ...

// // Контролер для відправки листа
// export const sendResetEmail = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) throw createError(404, 'User not found');

//     const token = jwt.sign(
//       { email },
//       process.env.ACCESS_SECRET,
//       { expiresIn: '5m' }
//     );

//     // Викликаємо сервіс для надсилання листа
//     await sendResetEmailService(email, token);

//     res.status(200).json({
//       status: 200,
//       message: 'Reset password email has been successfully sent.',
//       data: {}
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// src/controllers/auth.js

import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import User from '../models/user.js';
import Session from '../models/session.js';
import { sendResetEmail as sendResetEmailService } from '../services/emailService.js';

/**
 * POST /auth/register
 * Реєстрація нового користувача
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      throw createError(409, 'Email in use');
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: {
        _id:   user._id,
        name:  user.name,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /auth/login
 * Авторизація — повертає accessToken, встановлює cookies
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.isValidPassword(password))) {
      throw createError(401, 'Email or password is wrong');
    }

    const payload = { id: user._id };
    const accessToken  = jwt.sign(payload, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' });

    // Створюємо/оновлюємо сесію
    await Session.create({
      userId:                  user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil:   new Date(jwt.decode(accessToken).exp * 1000),
      refreshTokenValidUntil:  new Date(jwt.decode(refreshToken).exp * 1000)
    });

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge:   30 * 24 * 60 * 60 * 1000
      })
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge:   15 * 60 * 1000
      })
      .status(200)
      .json({
        status: 200,
        message: 'Successfully logged in a user!',
        data: { accessToken }
      });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /auth/refresh
 * Освіження токенів — приймає refreshToken з cookie
 */
export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw createError(401, 'Refresh token missing');
    }

    const { id } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const session = await Session.findOne({ userId: id, refreshToken });
    if (!session) {
      throw createError(401, 'Session not found or logged out');
    }

    const payload = { id };
    const newAccessToken  = jwt.sign(payload, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
    const newRefreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' });

    session.accessToken  = newAccessToken;
    session.refreshToken = newRefreshToken;
    session.accessTokenValidUntil  = new Date(jwt.decode(newAccessToken).exp * 1000);
    session.refreshTokenValidUntil = new Date(jwt.decode(newRefreshToken).exp * 1000);
    await session.save();

    res
      .cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        maxAge:   30 * 24 * 60 * 60 * 1000
      })
      .cookie('accessToken', newAccessToken, {
        httpOnly: true,
        maxAge:   15 * 60 * 1000
      })
      .status(200)
      .json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: { accessToken: newAccessToken }
      });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(createError(401, 'Refresh token expired'));
    }
    next(err);
  }
};

/**
 * POST /auth/logout
 * Вихід — видаляє сесію та очищає cookies
 */
export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      await Session.deleteOne({ refreshToken });
    }
    res
      .clearCookie('refreshToken')
      .clearCookie('accessToken')
      .status(204)
      .send();
  } catch (err) {
    next(err);
  }
};

/**
 * POST /auth/send-reset-email
 * Відправляє лист для скидання пароля
 */
export const sendResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw createError(404, 'User not found');

    // Генеруємо токен для скидання
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET_RESET,
      { expiresIn: '5m' }
    );

    await sendResetEmailService(email, token);

    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /auth/reset-pwd
 * Скидання пароля за токеном
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    let payload;

    try {
      payload = jwt.verify(token, process.env.JWT_SECRET_RESET);
    } catch {
      throw createError(401, 'Invalid or expired token');
    }

    const user = await User.findOne({ email: payload.email });
    if (!user) throw createError(404, 'User not found');

    user.password = password;
    await user.save();

    // Видаляємо усі старі сесії
    await Session.deleteMany({ userId: user._id });

    res.status(200).json({
      status: 200,
      message: 'Password has been reset successfully',
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
