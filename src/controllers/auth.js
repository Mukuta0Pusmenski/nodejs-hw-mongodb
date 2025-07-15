// // // // src/controllers/auth.js

// // // import jwt from 'jsonwebtoken';
// // // import createError from 'http-errors';
// // // import nodemailer from 'nodemailer';

// // // import User from '../models/user.js';
// // // import Session from '../models/session.js';
// // // import { createTransporter } from '../services/emailService.js';

// // // /**
// // //  * POST /auth/register
// // //  */
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

// // // /**
// // //  * POST /auth/login
// // //  */
// // // export const login = async (req, res, next) => {
// // //   try {
// // //     const { email, password } = req.body;
// // //     const user = await User.findOne({ email });
// // //     if (!user || !(await user.isValidPassword(password))) {
// // //       throw createError(401, 'Email or password is wrong');
// // //     }

// // //     const payload = { id: user._id };
// // //     const accessToken  = jwt.sign(payload, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
// // //     const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' });

// // //     await Session.create({
// // //       userId:                 user._id,
// // //       accessToken,
// // //       refreshToken,
// // //       accessTokenValidUntil:  new Date(jwt.decode(accessToken).exp * 1000),
// // //       refreshTokenValidUntil: new Date(jwt.decode(refreshToken).exp * 1000)
// // //     });

// // //     res
// // //       .cookie('refreshToken', refreshToken, {
// // //         httpOnly: true,
// // //         maxAge:   30 * 24 * 60 * 60 * 1000
// // //       })
// // //       .cookie('accessToken', accessToken, {
// // //         httpOnly: true,
// // //         maxAge:   15 * 60 * 1000
// // //       })
// // //       .status(200)
// // //       .json({
// // //         status: 200,
// // //         message: 'Successfully logged in a user!',
// // //         data: { accessToken }
// // //       });
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // };

// // // /**
// // //  * POST /auth/refresh
// // //  */
// // // export const refresh = async (req, res, next) => {
// // //   try {
// // //     const { refreshToken } = req.cookies;
// // //     if (!refreshToken) {
// // //       throw createError(401, 'Refresh token missing');
// // //     }

// // //     const { id } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
// // //     const session = await Session.findOne({ userId: id, refreshToken });
// // //     if (!session) {
// // //       throw createError(401, 'Session not found or logged out');
// // //     }

// // //     const payload = { id };
// // //     const newAccessToken  = jwt.sign(payload, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
// // //     const newRefreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' });

// // //     session.accessToken  = newAccessToken;
// // //     session.refreshToken = newRefreshToken;
// // //     session.accessTokenValidUntil  = new Date(jwt.decode(newAccessToken).exp * 1000);
// // //     session.refreshTokenValidUntil = new Date(jwt.decode(newRefreshToken).exp * 1000);
// // //     await session.save();

// // //     res
// // //       .cookie('refreshToken', newRefreshToken, {
// // //         httpOnly: true,
// // //         maxAge:   30 * 24 * 60 * 60 * 1000
// // //       })
// // //       .cookie('accessToken', newAccessToken, {
// // //         httpOnly: true,
// // //         maxAge:   15 * 60 * 1000
// // //       })
// // //       .status(200)
// // //       .json({
// // //         status: 200,
// // //         message: 'Successfully refreshed a session!',
// // //         data: { accessToken: newAccessToken }
// // //       });
// // //   } catch (err) {
// // //     if (err.name === 'TokenExpiredError') {
// // //       return next(createError(401, 'Refresh token expired'));
// // //     }
// // //     next(err);
// // //   }
// // // };

// // // /**
// // //  * POST /auth/logout
// // //  */
// // // export const logout = async (req, res, next) => {
// // //   try {
// // //     const { refreshToken } = req.cookies;
// // //     if (refreshToken) {
// // //       await Session.deleteOne({ refreshToken });
// // //     }
// // //     res
// // //       .clearCookie('refreshToken')
// // //       .clearCookie('accessToken')
// // //       .status(204)
// // //       .send();
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // };

// // // /**
// // //  * POST /auth/send-reset-email
// // //  */
// // // export const sendResetEmail = async (req, res, next) => {
// // //   try {
// // //     console.log('→ [sendResetEmail] USE_ETHEREAL:', process.env.USE_ETHEREAL);
// // //     const { email } = req.body;

// // //     // Генеруємо токен
// // //     const token = jwt.sign(
// // //       { email },
// // //       process.env.JWT_SECRET_RESET,
// // //       { expiresIn: '5m' }
// // //     );
// // //     console.log('→ [sendResetEmail] Generated JWT:', token);

// // //     // Створюємо транспортер
// // //     const transporter = await createTransporter();
// // //     console.log('→ [sendResetEmail] Transporter options:', transporter.options);

// // //     // Надсилаємо лист
// // //     const info = await transporter.sendMail({
// // //       from:    process.env.SMTP_FROM,
// // //       to:      email,
// // //       subject: 'Password reset',
// // //       html:    `<p>Click <a href="${process.env.APP_DOMAIN}/auth/reset-password/${token}">here</a> to reset your password.</p>`
// // //     });

// // //     if (process.env.USE_ETHEREAL === 'true') {
// // //       console.log('→ [sendResetEmail] Preview URL:', nodemailer.getTestMessageUrl(info));
// // //     }

// // //     res.status(200).json({ status: 200, message: 'Password reset email sent' });
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // };

// // // /**
// // //  * POST /auth/reset-password/:token
// // //  */
// // // export const resetPassword = async (req, res, next) => {
// // //   try {
// // //     const { token }    = req.params;
// // //     const { password } = req.body;

// // //     console.log('→ [resetPassword] Reset token:', token);

// // //     let payload;
// // //     try {
// // //       payload = jwt.verify(token, process.env.JWT_SECRET_RESET);
// // //       console.log('→ [resetPassword] Decoded payload:', payload);
// // //     } catch {
// // //       throw createError(401, 'Invalid or expired token');
// // //     }

// // //     const user = await User.findOne({ email: payload.email });
// // //     if (!user) throw createError(404, 'User not found');

// // //     user.password = password;
// // //     await user.save();
// // //     await Session.deleteMany({ userId: user._id });

// // //     res.status(200).json({
// // //       status: 200,
// // //       message: 'Password has been reset successfully',
// // //       data: {}
// // //     });
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // };

// // // ───────────────────────────────────────────────────────────────────
// // // src/controllers/auth.js
// // import jwt from 'jsonwebtoken';
// // import createError from 'http-errors';

// // import User from '../models/user.js';
// // import Session from '../models/session.js';
// // import { createTransporter } from '../services/emailService.js';

// // export const register = async (req, res, next) => {
// //   try {
// //     const { name, email, password } = req.body;
// //     if (await User.findOne({ email })) {
// //       throw createError(409, 'Email in use');
// //     }
// //     const user = await User.create({ name, email, password });
// //     return res.status(201).json({
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
// //     const payload      = { id: user._id };
// //     const accessToken  = jwt.sign(payload, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
// //     const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' });

// //     await Session.create({
// //       userId: user._id,
// //       accessToken,
// //       refreshToken,
// //       accessTokenValidUntil:  new Date(jwt.decode(accessToken).exp * 1000),
// //       refreshTokenValidUntil: new Date(jwt.decode(refreshToken).exp * 1000)
// //     });

// //     return res
// //       .cookie('accessToken', accessToken,   { httpOnly: true, maxAge: 15 * 60 * 1000 })
// //       .cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
// //       .status(200)
// //       .json({ status: 200, message: 'Successfully logged in a user!', data: { accessToken } });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const sendResetEmail = async (req, res, next) => {
// //   try {
// //     const { email } = req.body;
// //     const user = await User.findOne({ email });
// //     if (!user) throw createError(404, 'User not found');

// //     // генеруємо токен
// //     const token = jwt.sign({ email }, process.env.JWT_SECRET_RESET, { expiresIn: '5m' });
// //     const resetLink = `${process.env.APP_DOMAIN}/auth/reset-password/${token}`;

// //     // пробуємо відправити через SMTP
// //     try {
// //       const transporter = await createTransporter();
// //       const info = await transporter.sendMail({
// //         from:    process.env.SMTP_FROM,
// //         to:      email,
// //         subject: 'Password reset',
// //         html:    `<p>Click <a href="${resetLink}">Reset your password</a></p>`
// //       });

// //       if (process.env.USE_ETHEREAL === 'true') {
// //         console.log('→ [sendResetEmail] Preview URL:', nodemailer.getTestMessageUrl(info));
// //       }
// //     } catch (smtpErr) {
// //       // фолбек: лог і повернення посилання
// //       console.error('→ [sendResetEmail] SMTP error, fallback link:', resetLink);
// //     }

// //     return res.status(200).json({
// //       status: 200,
// //       message: 'Password reset link generated',
// //       data: { resetLink }
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const resetPassword = async (req, res, next) => {
// //   try {
// //     const { token }    = req.params;
// //     const { password } = req.body;

// //     const payload = jwt.verify(token, process.env.JWT_SECRET_RESET);
// //     const user    = await User.findOne({ email: payload.email });
// //     if (!user) throw createError(404, 'User not found');

// //     user.password = password;
// //     await user.save();
// //     await Session.deleteMany({ userId: user._id });

// //     return res.status(200).json({
// //       status: 200,
// //       message: 'Password has been reset successfully',
// //       data: {}
// //     });
// //   } catch (err) {
// //     if (err.name === 'TokenExpiredError') {
// //       return next(createError(401, 'Invalid or expired token'));
// //     }
// //     next(err);
// //   }
// // };

// import jwt from 'jsonwebtoken';
// import createError from 'http-errors';
// import User from '../models/user.js';
// import Session from '../models/session.js';
// import { createTransporter } from '../services/emailService.js';

// export const register = async (req, res, next) => { /* … */ };
// export const login    = async (req, res, next) => { /* … */ };

// export const sendResetEmail = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) throw createError(404, 'User not found');

//     const token = jwt.sign({ email }, process.env.JWT_SECRET_RESET, { expiresIn: '5m' });
//     const resetLink = `${process.env.APP_DOMAIN}/auth/reset-password/${token}`;
//     console.log('→ [sendResetEmail] Reset link:', resetLink);

//     // Спроба відправити лист, якщо НЕ виходить — фолбек
//     try {
//       const transporter = await createTransporter();
//       await transporter.sendMail({
//         from: process.env.SMTP_FROM,
//         to: email,
//         subject: 'Password reset',
//         html: `<p><a href="${resetLink}">Reset password</a></p>`
//       });
//     } catch {
//       console.warn('→ [sendResetEmail] SMTP failed, using console link');
//     }

//     return res.status(200).json({
//       status: 200,
//       message: 'Password reset link generated',
//       data: { resetLink }
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const resetPassword = async (req, res, next) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     const payload = jwt.verify(token, process.env.JWT_SECRET_RESET);
//     const user = await User.findOne({ email: payload.email });
//     if (!user) throw createError(404, 'User not found');

//     user.password = password;
//     await user.save();
//     await Session.deleteMany({ userId: user._id });

//     return res.status(200).json({
//       status: 200,
//       message: 'Password has been reset successfully'
//     });
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       return next(createError(401, 'Invalid or expired token'));
//     }
//     next(err);
//   }
// };

import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import User from '../models/user.js';
import Session from '../models/session.js';
import { createTransporter } from '../services/emailService.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) {
      throw createError(409, 'Email in use');
    }
    const user = await User.create({ name, email, password });
    return res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
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

    const payload       = { id: user._id };
    const accessToken   = jwt.sign(payload, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
    const refreshToken  = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' });

    await Session.create({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil:  new Date(jwt.decode(accessToken).exp * 1000),
      refreshTokenValidUntil: new Date(jwt.decode(refreshToken).exp * 1000)
    });

    return res
      .cookie('accessToken',  accessToken,  { httpOnly: true, maxAge: 15 * 60 * 1000 })
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
    if (!refreshToken) {
      throw createError(401, 'Refresh token missing');
    }

    const { id } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const session = await Session.findOne({ userId: id, refreshToken });
    if (!session) {
      throw createError(401, 'Session not found or logged out');
    }

    const payload       = { id };
    const newAccessToken  = jwt.sign(payload, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
    const newRefreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' });

    session.accessToken  = newAccessToken;
    session.refreshToken = newRefreshToken;
    session.accessTokenValidUntil  = new Date(jwt.decode(newAccessToken).exp * 1000);
    session.refreshTokenValidUntil = new Date(jwt.decode(newRefreshToken).exp * 1000);
    await session.save();

    return res
      .cookie('accessToken',  newAccessToken,  { httpOnly: true, maxAge: 15 * 60 * 1000 })
      .cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
      .status(200)
      .json({ status: 200, message: 'Successfully refreshed a session!', data: { accessToken: newAccessToken } });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(createError(401, 'Refresh token expired'));
    }
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      await Session.deleteOne({ refreshToken });
    }
    return res
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .status(204)
      .send();
  } catch (err) {
    next(err);
  }
};

export const sendResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw createError(404, 'User not found');

    const token     = jwt.sign({ email }, process.env.JWT_SECRET_RESET, { expiresIn: '5m' });
    const resetLink = `${process.env.APP_DOMAIN}/auth/reset-password/${token}`;
    console.log('→ [sendResetEmail] Reset link:', resetLink);

    try {
      const transporter = await createTransporter();
      await transporter.sendMail({
        from:    process.env.SMTP_FROM,
        to:      email,
        subject: 'Password reset',
        html:    `<p><a href="${resetLink}">Reset your password</a></p>`
      });
      if (process.env.USE_ETHEREAL === 'true') {
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      }
    } catch {
      console.warn('→ [sendResetEmail] SMTP failed, fallback link in console');
    }

    return res.status(200).json({
      status: 200,
      message: 'Password reset link generated',
      data: { resetLink }
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token }    = req.params;
    const { password } = req.body;

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
    await Session.deleteMany({ userId: user._id });

    return res.status(200).json({
      status: 200,
      message: 'Password has been reset successfully'
    });
  } catch (err) {
    next(err);
  }
};
