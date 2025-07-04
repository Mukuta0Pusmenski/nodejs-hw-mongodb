// // // // // import {
// // // // //     registerService,
// // // // //     loginService,
// // // // //     refreshService,
// // // // //     logoutService,
// // // // //   } from '../services/auth.js';
  
// // // // //   export async function registerUser(req, res, next) {
// // // // //     try {
// // // // //       const user = await registerService(
// // // // //         req.body.name,
// // // // //         req.body.email,
// // // // //         req.body.password
// // // // //       );
// // // // //       res.status(201).json({
// // // // //         status:  201,
// // // // //         message: 'Successfully registered a user!',
// // // // //         data: { _id: user._id, name: user.name, email: user.email },
// // // // //       });
// // // // //     } catch (err) {
// // // // //       next(err);
// // // // //     }
// // // // //   }
  
// // // // //   export async function loginUser(req, res, next) {
// // // // //     try {
// // // // //       const { accessToken, refreshToken } = await loginService(
// // // // //         req.body.email,
// // // // //         req.body.password
// // // // //       );
// // // // //       res.cookie('refreshToken', refreshToken, {
// // // // //         httpOnly: true,
// // // // //         maxAge:   30 * 24 * 60 * 60 * 1000,
// // // // //       });
// // // // //       res.json({
// // // // //         status:  200,
// // // // //         message: 'Successfully logged in a user!',
// // // // //         data: { accessToken },
// // // // //       });
// // // // //     } catch (err) {
// // // // //       next(err);
// // // // //     }
// // // // //   }
  
// // // // //   export async function refreshUser(req, res, next) {
// // // // //     try {
// // // // //       const { accessToken, refreshToken } = await refreshService(
// // // // //         req.cookies.refreshToken
// // // // //       );
// // // // //       res.cookie('refreshToken', refreshToken, {
// // // // //         httpOnly: true,
// // // // //         maxAge:   30 * 24 * 60 * 60 * 1000,
// // // // //       });
// // // // //       res.json({
// // // // //         status:  200,
// // // // //         message: 'Successfully refreshed a session!',
// // // // //         data: { accessToken },
// // // // //       });
// // // // //     } catch (err) {
// // // // //       next(err);
// // // // //     }
// // // // //   }
  
// // // // //   export async function logoutUser(req, res, next) {
// // // // //     try {
// // // // //       await logoutService(req.cookies.refreshToken);
// // // // //       res.clearCookie('refreshToken');
// // // // //       res.status(204).send();
// // // // //     } catch (err) {
// // // // //       next(err);
// // // // //     }
// // // // //   }
  
// // // // import createError from 'http-errors';
// // // // import {
// // // //   registerService,
// // // //   loginService,
// // // //   refreshService,
// // // //   logoutService
// // // // } from '../services/auth.js';

// // // // export async function register(req, res, next) {
// // // //   try {
// // // //     const user = await registerService(
// // // //       req.body.name,
// // // //       req.body.email,
// // // //       req.body.password
// // // //     );
// // // //     res.status(201).json({
// // // //       status: 201,
// // // //       message: 'Successfully registered a user!',
// // // //       data: { _id: user._id, name: user.name, email: user.email }
// // // //     });
// // // //   } catch (err) {
// // // //     next(err);
// // // //   }
// // // // }

// // // // export async function login(req, res, next) {
// // // //   try {
// // // //     const { accessToken, refreshToken } = await loginService(
// // // //       req.body.email,
// // // //       req.body.password
// // // //     );
// // // //     // Записуємо обидва токени в кукі
// // // //     res.cookie('refreshToken', refreshToken, {
// // // //       httpOnly: true,
// // // //       maxAge: 30 * 24 * 60 * 60 * 1000
// // // //     });
// // // //     res.cookie('accessToken', accessToken, {
// // // //       httpOnly: true,
// // // //       maxAge: 15 * 60 * 1000
// // // //     });
// // // //     res.status(200).json({
// // // //       status: 200,
// // // //       message: 'Successfully logged in a user!',
// // // //       data: { accessToken }
// // // //     });
// // // //   } catch (err) {
// // // //     next(err);
// // // //   }
// // // // }

// // // // export async function refresh(req, res, next) {
// // // //   try {
// // // //     const oldToken = req.cookies.refreshToken;
// // // //     if (!oldToken) throw createError(401, 'Refresh token missing');

// // // //     const { accessToken, refreshToken } = await refreshService(oldToken);
// // // //     res.cookie('refreshToken', refreshToken, {
// // // //       httpOnly: true,
// // // //       maxAge: 30 * 24 * 60 * 60 * 1000
// // // //     });
// // // //     res.status(200).json({
// // // //       status: 200,
// // // //       message: 'Successfully refreshed a session!',
// // // //       data: { accessToken }
// // // //     });
// // // //   } catch (err) {
// // // //     next(err);
// // // //   }
// // // // }

// // // // export async function logout(req, res, next) {
// // // //   try {
// // // //     const token = req.cookies.refreshToken;
// // // //     await logoutService(token);
// // // //     res.clearCookie('refreshToken');
// // // //     res.clearCookie('accessToken');
// // // //     res.status(204).send();
// // // //   } catch (err) {
// // // //     next(err);
// // // //   }
// // // // }

// // // // src/controllers/auth.js
// // // import jwt from 'jsonwebtoken';
// // // import createError from 'http-errors';
// // // import Session from '../models/session.js';
// // // import User from '../models/user.js';

// // // export const login = async (req, res, next) => {
// // //   try {
// // //     const { email, password } = req.body;
// // //     const user = await User.findOne({ email });
// // //     if (!user || !(await user.isValidPassword(password))) {
// // //       throw createError(401, 'Email or password is wrong');
// // //     }

// // //     const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, {
// // //       expiresIn: '15m'
// // //     });
// // //     const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, {
// // //       expiresIn: '30d'
// // //     });

// // //     await Session.create({ userId: user._id, accessToken, refreshToken });

// // //     res
// // //       .cookie('refreshToken', refreshToken, {
// // //         httpOnly: true,
// // //         maxAge: 30 * 24 * 60 * 60 * 1000
// // //       })
// // //       .cookie('accessToken', accessToken, {
// // //         httpOnly: true,
// // //         maxAge: 15 * 60 * 1000
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

// // // export const refresh = async (req, res, next) => {
// // //   try {
// // //     const { refreshToken } = req.cookies;
// // //     if (!refreshToken) {
// // //       throw createError(401, 'Refresh token missing');
// // //     }

// // //     const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

// // //     const session = await Session.findOne({ userId: payload.id, refreshToken });
// // //     if (!session) {
// // //       throw createError(401, 'Session not found or logged out');
// // //     }

// // //     const newAccessToken = jwt.sign({ id: payload.id }, process.env.ACCESS_SECRET, {
// // //       expiresIn: '15m'
// // //     });
// // //     const newRefreshToken = jwt.sign({ id: payload.id }, process.env.REFRESH_SECRET, {
// // //       expiresIn: '30d'
// // //     });

// // //     session.accessToken = newAccessToken;
// // //     session.refreshToken = newRefreshToken;
// // //     await session.save();

// // //     res
// // //       .cookie('refreshToken', newRefreshToken, {
// // //         httpOnly: true,
// // //         maxAge: 30 * 24 * 60 * 60 * 1000
// // //       })
// // //       .cookie('accessToken', newAccessToken, {
// // //         httpOnly: true,
// // //         maxAge: 15 * 60 * 1000
// // //       })
// // //       .status(200)
// // //       .json({
// // //         status: 200,
// // //         message: 'Successfully refreshed a session!',
// // //         data: { accessToken: newAccessToken }
// // //       });
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
// // //     res
// // //       .clearCookie('refreshToken')
// // //       .clearCookie('accessToken')
// // //       .status(204)
// // //       .send();
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // };

// // // src/controllers/auth.js
// // import jwt from 'jsonwebtoken';
// // import createError from 'http-errors';
// // import Session from '../models/session.js';
// // import User from '../models/user.js';

// // // 1) Регістрація
// // export const register = async (req, res, next) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     // перевірити, чи є такий email
// //     const exists = await User.findOne({ email });
// //     if (exists) {
// //       throw createError(409, 'Email in use');
// //     }

// //     // створити юзера
// //     const user = await User.create({ name, email, password });

// //     // повернути мінімальну інформацію
// //     res
// //       .status(201)
// //       .json({
// //         status: 201,
// //         message: 'Successfully registered a user!',
// //         data: { _id: user._id, name: user.name, email: user.email }
// //       });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // // 2) Логін
// // export const login = async (req, res, next) => { /*…*/ };

// // // 3) Оновлення сесії
// // export const refresh = async (req, res, next) => { /*…*/ };

// // // 4) Логаут
// // export const logout = async (req, res, next) => { /*…*/ };
// import jwt from 'jsonwebtoken';
// import createError from 'http-errors';
// import User from '../models/user.js';
// import Session from '../models/session.js';

// export const register = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     if (await User.findOne({ email })) {
//       throw createError(409, 'Email in use');
//     }
//     const user = await User.create({ name, email, password });
//     res.status(201).json({
//       status: 201,
//       message: 'Successfully registered a user!',
//       data: { _id: user._id, name: user.name, email: user.email }
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.isValidPassword(password))) {
//       throw createError(401, 'Email or password is wrong');
//     }
//     const accessToken  = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
//     const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

//     await Session.create({ userId: user._id, accessToken, refreshToken });

//     res
//       .cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30*24*3600*1000 })
//       .cookie('accessToken',  accessToken,  { httpOnly: true, maxAge: 15*60*1000     })
//       .status(200)
//       .json({
//         status: 200,
//         message: 'Successfully logged in a user!',
//         data: { accessToken }
//       });
//   } catch (err) {
//     next(err);
//   }
// };

// export const refresh = async (req, res, next) => {
//   try {
//     const { refreshToken } = req.cookies;
//     if (!refreshToken) throw createError(401, 'Refresh token missing');

//     const { id } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
//     const session = await Session.findOne({ userId: id, refreshToken });
//     if (!session) throw createError(401, 'Session not found or logged out');

//     const newAccessToken  = jwt.sign({ id }, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
//     const newRefreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

//     session.accessToken  = newAccessToken;
//     session.refreshToken = newRefreshToken;
//     await session.save();

//     res
//       .cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 30*24*3600*1000 })
//       .cookie('accessToken',  newAccessToken,  { httpOnly: true, maxAge: 15*60*1000     })
//       .status(200)
//       .json({
//         status: 200,
//         message: 'Successfully refreshed a session!',
//         data: { accessToken: newAccessToken }
//       });
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       next(createError(401, 'Refresh token expired'));
//     } else next(err);
//   }
// };

// export const logout = async (req, res, next) => {
//   try {
//     const { refreshToken } = req.cookies;
//     if (refreshToken) await Session.deleteOne({ refreshToken });
//     res.clearCookie('refreshToken').clearCookie('accessToken').status(204).send();
//   } catch (err) {
//     next(err);
//   }
// };
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/user.js';
import Session from '../models/session.js';

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
    const accessToken  = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

    await Session.create({ userId: user._id, accessToken, refreshToken });

    res
      .cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 3600 * 1000 })
      .cookie('accessToken',  accessToken,  { httpOnly: true, maxAge: 15 * 60 * 1000     })
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

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw createError(401, 'Refresh token missing');

    const { id } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const session = await Session.findOne({ userId: id, refreshToken });
    if (!session) throw createError(401, 'Session not found or logged out');

    const newAccessToken  = jwt.sign({ id }, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

    session.accessToken  = newAccessToken;
    session.refreshToken = newRefreshToken;
    await session.save();

    res
      .cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 30 * 24 * 3600 * 1000 })
      .cookie('accessToken',  newAccessToken,  { httpOnly: true, maxAge: 15 * 60 * 1000     })
      .status(200)
      .json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: { accessToken: newAccessToken }
      });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      next(createError(401, 'Refresh token expired'));
    } else next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) await Session.deleteOne({ refreshToken });
    res.clearCookie('refreshToken').clearCookie('accessToken');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
