
// // // // import jwt from 'jsonwebtoken';
// // // // import createError from 'http-errors';
// // // // import User from '../models/user.js';
// // // // import Session from '../models/session.js';
// // // // import sendMail from '../services/sendMail.js';

// // // // // export const sendResetEmail = async (req, res, next) => {
// // // // //   try {
// // // // //     const { email } = req.body;
// // // // //     const user = await User.findOne({ email });
// // // // //     if (!user) throw createError(404, 'User not found');

// // // // //     const token = jwt.sign(
// // // // //       { email },
// // // // //       process.env.JWT_SECRET_RESET,
// // // // //       { expiresIn: '5m' }
// // // // //     );
// // // // //     const resetLink = `${process.env.APP_DOMAIN}/auth/reset-password/${token}`;

// // // // //     // відправляємо лист через утиліту sendMail
// // // // //     await sendMail({
// // // // //       to: email,
// // // // //       subject: 'Password reset',
// // // // //       html: `<p><a href="${resetLink}">Reset your password</a></p>`
// // // // //     });

// // // // //     return res.status(200).json({
// // // // //       status: 200,
// // // // //       message: 'Password reset email sent'
// // // // //     });
// // // // //   } catch (err) {
// // // // //     next(err);
// // // // //   }
// // // // // };

// // // // export const register = async (req, res, next) => {
// // // //   try {
// // // //     const { name, email, password } = req.body;
// // // //     if (await User.findOne({ email })) {
// // // //       throw createError(409, 'Email in use');
// // // //     }
// // // //     const user = await User.create({ name, email, password });
// // // //     return res.status(201).json({
// // // //       status: 201,
// // // //       message: 'Successfully registered a user!',
// // // //       data: { _id: user._id, name: user.name, email: user.email }
// // // //     });
// // // //   } catch (err) {
// // // //     next(err);
// // // //   }
// // // // };

// // // // export const login = async (req, res, next) => {
// // // //   try {
// // // //     const { email, password } = req.body;
// // // //     const user = await User.findOne({ email });
// // // //     if (!user || !(await user.isValidPassword(password))) {
// // // //       throw createError(401, 'Email or password is wrong');
// // // //     }

// // // //     const payload       = { id: user._id };
// // // //     const accessToken   = jwt.sign(payload, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
// // // //     const refreshToken  = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' });

// // // //     await Session.create({
// // // //       userId: user._id,
// // // //       accessToken,
// // // //       refreshToken,
// // // //       accessTokenValidUntil:  new Date(jwt.decode(accessToken).exp * 1000),
// // // //       refreshTokenValidUntil: new Date(jwt.decode(refreshToken).exp * 1000)
// // // //     });

// // // //     return res
// // // //       .cookie('accessToken',  accessToken,  { httpOnly: true, maxAge: 15 * 60 * 1000 })
// // // //       .cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
// // // //       .status(200)
// // // //       .json({ status: 200, message: 'Successfully logged in a user!', data: { accessToken } });
// // // //   } catch (err) {
// // // //     next(err);
// // // //   }
// // // // };

// // // // export const refresh = async (req, res, next) => {
// // // //   try {
// // // //     const { refreshToken } = req.cookies;
// // // //     if (!refreshToken) {
// // // //       throw createError(401, 'Refresh token missing');
// // // //     }

// // // //     const { id } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
// // // //     const session = await Session.findOne({ userId: id, refreshToken });
// // // //     if (!session) {
// // // //       throw createError(401, 'Session not found or logged out');
// // // //     }

// // // //     const payload       = { id };
// // // //     const newAccessToken  = jwt.sign(payload, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
// // // //     const newRefreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' });

// // // //     session.accessToken  = newAccessToken;
// // // //     session.refreshToken = newRefreshToken;
// // // //     session.accessTokenValidUntil  = new Date(jwt.decode(newAccessToken).exp * 1000);
// // // //     session.refreshTokenValidUntil = new Date(jwt.decode(newRefreshToken).exp * 1000);
// // // //     await session.save();

// // // //     return res
// // // //       .cookie('accessToken',  newAccessToken,  { httpOnly: true, maxAge: 15 * 60 * 1000 })
// // // //       .cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
// // // //       .status(200)
// // // //       .json({ status: 200, message: 'Successfully refreshed a session!', data: { accessToken: newAccessToken } });
// // // //   } catch (err) {
// // // //     if (err.name === 'TokenExpiredError') {
// // // //       return next(createError(401, 'Refresh token expired'));
// // // //     }
// // // //     next(err);
// // // //   }
// // // // };

// // // // export const logout = async (req, res, next) => {
// // // //   try {
// // // //     const { refreshToken } = req.cookies;
// // // //     if (refreshToken) {
// // // //       await Session.deleteOne({ refreshToken });
// // // //     }
// // // //     return res
// // // //       .clearCookie('accessToken')
// // // //       .clearCookie('refreshToken')
// // // //       .status(204)
// // // //       .send();
// // // //   } catch (err) {
// // // //     next(err);
// // // //   }
// // // // };

// // // // import jwt from 'jsonwebtoken';
// // // // import createError from 'http-errors';
// // // // import bcrypt from 'bcrypt';

// // // // import User from '../models/user.js';
// // // // import Session from '../models/session.js';
// // // // import sendMail from '../services/sendMail.js';

// // // // export const sendResetEmail = async (req, res, next) => {
// // // //   try {
// // // //     const { email } = req.body;
// // // //     const user = await User.findOne({ email });
// // // //     if (!user) throw createError(404, 'User not found');

// // // //     const token = jwt.sign(
// // // //       { email },
// // // //       process.env.JWT_SECRET_RESET,
// // // //       { expiresIn: '5m' }
// // // //     );
// // // //     const resetLink = `${process.env.APP_DOMAIN}/auth/reset-password/${token}`;

// // // //     await sendMail({
// // // //       to:      email,
// // // //       subject: 'Password reset',
// // // //       html:    `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
// // // //     });

// // // //     res.status(200).json({
// // // //       status:  200,
// // // //       message: 'Password reset email sent'
// // // //     });
// // // //   } catch (err) {
// // // //     next(err);
// // // //   }
// // // // };

// // // // export const resetPassword = async (req, res, next) => {
// // // //   try {
// // // //     const { token, newPassword } = req.body;

// // // //     let payload;
// // // //     try {
// // // //       payload = jwt.verify(token, process.env.JWT_SECRET_RESET);
// // // //     } catch {
// // // //       throw createError(401, 'Invalid or expired token');
// // // //     }

// // // //     const user = await User.findOne({ email: payload.email });
// // // //     if (!user) throw createError(404, 'User not found');

// // // //     // Хешуємо новий пароль
// // // //     const hash = await bcrypt.hash(newPassword, 10);
// // // //     user.password = hash;
// // // //     await user.save();

// // // //     // Інвалідовуємо всі сесії користувача
// // // //     await Session.deleteMany({ userId: user._id });

// // // //     res.status(200).json({
// // // //       status:  200,
// // // //       message: 'Password has been reset successfully'
// // // //     });
// // // //   } catch (err) {
// // // //     next(err);
// // // //   }
// // // // };

// // // // // export const resetPassword = async (req, res, next) => {
// // // // //   try {
// // // // //     const { token }    = req.params;
// // // // //     const { password } = req.body;

// // // // //     let payload;
// // // // //     try {
// // // // //       payload = jwt.verify(token, process.env.JWT_SECRET_RESET);
// // // // //     } catch {
// // // // //       throw createError(401, 'Invalid or expired token');
// // // // //     }

// // // // //     const user = await User.findOne({ email: payload.email });
// // // // //     if (!user) throw createError(404, 'User not found');

// // // // //     user.password = password;
// // // // //     await user.save();
// // // // //     await Session.deleteMany({ userId: user._id });

// // // // //     return res.status(200).json({
// // // // //       status: 200,
// // // // //       message: 'Password has been reset successfully'
// // // // //     });
// // // // //   } catch (err) {
// // // // //     next(err);
// // // // //   }
// // // // // };

// // // // src/controllers/auth.js

// // // import jwt from 'jsonwebtoken';
// // // import createError from 'http-errors';
// // // import bcrypt from 'bcrypt';

// // // import User from '../models/user.js';
// // // import Session from '../models/session.js';
// // // import sendMail from '../services/sendMail.js';

// // // export const register = async (req, res, next) => {
// // //   try {
// // //     const { name, email, password } = req.body;
// // //     if (await User.findOne({ email })) {
// // //       throw createError(409, 'Email in use');
// // //     }
// // //     const user = await User.create({ name, email, password });
// // //     res.status(201).json({
// // //       status: 201,
// // //       message: 'Successfully registered a user!',
// // //       data: { _id: user._id, name: user.name, email: user.email }
// // //     });
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // };

// // // export const login = async (req, res, next) => {
// // //   try {
// // //     const { email, password } = req.body;
// // //     const user = await User.findOne({ email });
// // //     if (!user || !(await user.isValidPassword(password))) {
// // //       throw createError(401, 'Email or password is wrong');
// // //     }

// // //     const payload      = { id: user._id };
// // //     const accessToken  = jwt.sign(payload, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
// // //     const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' });

// // //     await Session.create({
// // //       userId: user._id,
// // //       accessToken,
// // //       refreshToken,
// // //       accessTokenValidUntil:  new Date(jwt.decode(accessToken).exp * 1000),
// // //       refreshTokenValidUntil: new Date(jwt.decode(refreshToken).exp * 1000)
// // //     });

// // //     res
// // //       .cookie('accessToken',  accessToken,  { httpOnly: true, maxAge: 15 * 60 * 1000 })
// // //       .cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
// // //       .status(200)
// // //       .json({ status: 200, message: 'Successfully logged in a user!', data: { accessToken } });
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // };

// // // export const refresh = async (req, res, next) => {
// // //   try {
// // //     const { refreshToken } = req.cookies;
// // //     if (!refreshToken) throw createError(401, 'Refresh token missing');

// // //     const { id } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
// // //     const session = await Session.findOne({ userId: id, refreshToken });
// // //     if (!session) throw createError(401, 'Session not found or logged out');

// // //     const payload         = { id };
// // //     const newAccessToken  = jwt.sign(payload, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
// // //     const newRefreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' });

// // //     session.accessToken  = newAccessToken;
// // //     session.refreshToken = newRefreshToken;
// // //     session.accessTokenValidUntil  = new Date(jwt.decode(newAccessToken).exp * 1000);
// // //     session.refreshTokenValidUntil = new Date(jwt.decode(newRefreshToken).exp * 1000);
// // //     await session.save();

// // //     res
// // //       .cookie('accessToken',  newAccessToken,  { httpOnly: true, maxAge: 15 * 60 * 1000 })
// // //       .cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
// // //       .status(200)
// // //       .json({ status: 200, message: 'Successfully refreshed a session!', data: { accessToken: newAccessToken } });
// // //   } catch (err) {
// // //     if (err.name === 'TokenExpiredError') {
// // //       next(createError(401, 'Refresh token expired'));
// // //     } else {
// // //       next(err);
// // //     }
// // //   }
// // // };

// // // export const logout = async (req, res, next) => {
// // //   try {
// // //     const { refreshToken } = req.cookies;
// // //     if (refreshToken) {
// // //       await Session.deleteOne({ refreshToken });
// // //     }
// // //     res.clearCookie('accessToken').clearCookie('refreshToken').status(204).send();
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // };

// // // export const sendResetEmail = async (req, res, next) => {
// // //   try {
// // //     const { email } = req.body;
// // //     const user = await User.findOne({ email });
// // //     if (!user) throw createError(404, 'User not found');

// // //     const token = jwt.sign(
// // //       { email },
// // //       process.env.JWT_SECRET_RESET,
// // //       { expiresIn: '5m' }
// // //     );
// // //     const resetLink = `${process.env.APP_DOMAIN}/auth/reset-password/${token}`;

// // //     await sendMail({
// // //       to:      email,
// // //       subject: 'Password reset',
// // //       html:    `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
// // //     });

// // //     res.status(200).json({ status: 200, message: 'Password reset email sent' });
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // };

// // // export const resetPassword = async (req, res, next) => {
// // //   try {
// // //     const { token, newPassword } = req.body;

// // //     let payload;
// // //     try {
// // //       payload = jwt.verify(token, process.env.JWT_SECRET_RESET);
// // //     } catch {
// // //       throw createError(401, 'Invalid or expired token');
// // //     }

// // //     const user = await User.findOne({ email: payload.email });
// // //     if (!user) throw createError(404, 'User not found');

// // //     // новий код — plain password, хешитиме pre('save')
// // //     user.password = newPassword;
// // //     await user.save();


// // //     // інвалідуємо всі сесії
// // //     await Session.deleteMany({ userId: user._id });

// // //     res.status(200).json({ status: 200, message: 'Password has been reset successfully' });
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // };

// // import jwt from 'jsonwebtoken';
// // import createError from 'http-errors';
// // import { User } from '../models/user.js';
// // import { Session } from '../models/session.js';
// // import sendMail from '../services/email.js';

// // export const sendResetEmail = async (req, res, next) => {
// //   try {
// //     const { email } = req.body;
// //     const user = await User.findOne({ email });
// //     if (!user) throw createError(404, 'User not found');

// //     // Створюємо JWT-токен для скидання
// //     const token = jwt.sign(
// //       { email },
// //       process.env.JWT_SECRET_RESET,
// //       { expiresIn: '5m' }
// //     );

// //     // Підтягуємо домен динамічно: спершу ENV, потім – з поточного запиту
// //     const domain = process.env.APP_DOMAIN
// //       || ${req.protocol}://${req.get('host')};

// //     const resetLink = ${domain}/auth/reset-password/${token};

// //     // Відправляємо листа через універсальну функцію
// //     await sendMail({
// //       to:      email,
// //       subject: 'Password reset',
// //       html:    <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
// //     });

// //     res.status(200).json({ status: 200, message: 'Password reset email sent' });
// //   } catch (err) {
// //     next(err);
// //   }
// // ...existing code...
// export const sendResetEmail = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) throw createError(404, 'User not found');

//     const token = jwt.sign({ email }, process.env.JWT_SECRET_RESET, { expiresIn: '5m' });

//     // Виправлений фрагмент:
//     const domain = process.env.APP_DOMAIN || `${req.protocol}://${req.get('host')}`;
//     const resetLink = `${domain}/auth/reset-password/${token}`;

//     await sendMail({
//       to:      email,
//       subject: 'Password reset',
//       html:    `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
//     });

//     res.status(200).json({ status: 200, message: 'Password reset email sent' });
//   } catch (err) {
//     next(err);
//   }
// };
// // ...existing code...// };
// import jwt from 'jsonwebtoken';
// import createError from 'http-errors';

// import User from '../models/user.js';
// import Session from '../models/session.js';
// import sendMail from '../services/email.js';

// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.isValidPassword(password))) {
//       throw createError(401, 'Email or password is wrong');
//     }

//     const accessToken  = jwt.sign({ id: user._id }, process.env.JWT_SECRET_ACCESS,  { expiresIn: '15m' });
//     const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_REFRESH, { expiresIn: '30d' });

//     const session = await Session.create({
//       userId: user._id,
//       accessToken,
//       refreshToken,
//       accessTokenValidUntil:  new Date(Date.now() + 15 * 60 * 1000),
//       refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     });

//     res
//       .cookie('accessToken',  accessToken,  { httpOnly: true, maxAge: 15 * 60 * 1000 })
//       .cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
//       .status(200)
//       .json({ status: 200, message: 'Successfully logged in a user!', data: { accessToken } });
//   } catch (err) {
//     next(err);
//   }
// };

// export const refresh = async (req, res, next) => {
//   try {
//     const { refreshToken } = req.cookies;
//     if (!refreshToken) throw createError(401, 'No refresh token');

//     const session = await Session.findOne({ refreshToken });
//     if (!session) throw createError(401, 'Invalid refresh token');

//     // генеруємо нові токени
//     const newAccessToken  = jwt.sign({ id: session.userId }, process.env.JWT_SECRET_ACCESS,  { expiresIn: '15m' });
//     const newRefreshToken = jwt.sign({ id: session.userId }, process.env.JWT_SECRET_REFRESH, { expiresIn: '30d' });

//     // оновлюємо сесію
//     session.accessToken           = newAccessToken;
//     session.refreshToken          = newRefreshToken;
//     session.accessTokenValidUntil = new Date(jwt.decode(newAccessToken).exp * 1000);
//     session.refreshTokenValidUntil= new Date(jwt.decode(newRefreshToken).exp * 1000);
//     await session.save();

//     res
//       .cookie('accessToken',  newAccessToken,  { httpOnly: true, maxAge: 15 * 60 * 1000 })
//       .cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
//       .status(200)
//       .json({ status: 200, message: 'Successfully refreshed a session!', data: { accessToken: newAccessToken } });
//   } catch (err) {
//     next(err);
//   }
// };

// export const logout = async (req, res, next) => {
//   try {
//     const { refreshToken } = req.cookies;
//     if (refreshToken) {
//       await Session.deleteOne({ refreshToken });
//     }
//     res.clearCookie('accessToken').clearCookie('refreshToken').status(204).send();
//   } catch (err) {
//     next(err);
//   }
// };

// // ...existing code...
// export const sendResetEmail = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) throw createError(404, 'User not found');

//     const token = jwt.sign({ email }, process.env.JWT_SECRET_RESET, { expiresIn: '5m' });

//     const domain = process.env.APP_DOMAIN || `${req.protocol}://${req.get('host')}`;
//     const resetLink = `${domain}/auth/reset-password/${token}`;

//     await sendMail({
//       to:      email,
//       subject: 'Password reset',
//       html:    `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
//     });

//     res.status(200).json({ status: 200, message: 'Password reset email sent' });
//   } catch (err) {
//     next(err);
//   }
// };
// // ...existing code...

// export const resetPassword = async (req, res, next) => {
//   try {
//     const { token, newPassword } = req.body;
//     let payload;
//     try {
//       payload = jwt.verify(token, process.env.JWT_SECRET_RESET);
//     } catch {
//       throw createError(401, 'Invalid or expired token');
//     }

//     const user = await User.findOne({ email: payload.email });
//     if (!user) throw createError(404, 'User not found');

//     user.password = newPassword;
//     await user.save();
    
//     // інвалідуємо всі сесії після зміни пароля
//     await Session.deleteMany({ userId: user._id });

//     res.status(200).json({ status: 200, message: 'Password has been reset successfully' });
//   } catch (err) {
//     next(err);
//   }
// };
// src/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import User from '../models/user.js';
import Session from '../models/session.js';
import sendMail from '../services/sendMail.js';  // зверни увагу на шлях

export const sendResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, 'User not found');
    }

    // генеруємо короткоживущий токен
    const token = jwt.sign({ email }, process.env.JWT_SECRET_RESET, { expiresIn: '5m' });

    const domain = process.env.APP_DOMAIN || `${req.protocol}://${req.get('host')}`;
    const resetLink = `${domain}/reset-password?token=${token}`;

    // надсилаємо листа
    await sendMail({
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch (err) {
    // якщо помилка SMTP — кинемо 500
    if (err.response && err.response.code === 'EAUTH') {
      return next(createError(500, 'Failed to send the email, please try again later.'));
    }
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.isValidPassword(password))) {
      throw createError(401, 'Email or password is wrong');
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

    const session = await Session.create({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res
      .cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 })
      .cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
      .status(200)
      .json({ status: 200, message: 'Successfully logged in a user!', data: { accessToken } });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw createError(401, 'No refresh token');

    const session = await Session.findOne({ refreshToken });
    if (!session) throw createError(401, 'Invalid refresh token');

    const newAccessToken = jwt.sign({ id: session.userId }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ id: session.userId }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

    session.accessToken = newAccessToken;
    session.refreshToken = newRefreshToken;
    session.accessTokenValidUntil = new Date(jwt.decode(newAccessToken).exp * 1000);
    session.refreshTokenValidUntil = new Date(jwt.decode(newRefreshToken).exp * 1000);
    await session.save();

    res
      .cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 })
      .cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
      .status(200)
      .json({ status: 200, message: 'Successfully refreshed a session!', data: { accessToken: newAccessToken } });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      await Session.deleteOne({ refreshToken });
    }
    res.clearCookie('accessToken').clearCookie('refreshToken').status(204).send();
  } catch (err) {
    next(err);
  }
};

// export const sendResetEmail = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) throw createError(404, 'User not found');

//     const token = jwt.sign({ email }, process.env.JWT_SECRET_RESET, { expiresIn: '5m' });

//     const domain = process.env.APP_DOMAIN || `${req.protocol}://${req.get('host')}`;
//     const resetLink = `${domain}/auth/reset-password/${token}`;

//     await sendMail({
//       to: email,
//       subject: 'Password reset',
//       html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
//     });

//     res.status(200).json({ status: 200, message: 'Password reset email sent' });
//   } catch (err) {
//     next(err);
//   }
// };

export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET_RESET);
    } catch {
      throw createError(401, 'Invalid or expired token');
    }

    const user = await User.findOne({ email: payload.email });
    if (!user) throw createError(404, 'User not found');

    user.password = newPassword;
    await user.save();

    await Session.deleteMany({ userId: user._id });

    res.status(200).json({ status: 200, message: 'Password has been reset successfully' });
  } catch (err) {
    next(err);
  }
};
