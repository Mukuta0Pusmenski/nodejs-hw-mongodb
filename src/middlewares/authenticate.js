// // // // // import jwt from 'jsonwebtoken';
// // // // // import createError from 'http-errors';
// // // // // import User from '../models/user.js';

// // // // // export default async function authenticate(req, res, next) {
// // // // //   try {
// // // // //     const authHeader = req.get('Authorization') || '';
// // // // //     const [scheme, token] = authHeader.split(' ');
// // // // //     if (scheme !== 'Bearer' || !token) {
// // // // //       throw createError(401, 'Authorization token missing or malformed');
// // // // //     }

// // // // //     const payload = jwt.verify(token, process.env.ACCESS_SECRET);
// // // // //     const user = await User.findById(payload.id);
// // // // //     if (!user) throw createError(401, 'User not found');

// // // // //     req.user = user;
// // // // //     next();
// // // // //   } catch (err) {
// // // // //     if (err.name === 'TokenExpiredError') {
// // // // //       next(createError(401, 'Access token expired'));
// // // // //     } else {
// // // // //       next(err);
// // // // //     }
// // // // //   }
// // // // // }

// // // // import jwt from 'jsonwebtoken';
// // // // import createError from 'http-errors';
// // // // import User from '../models/user.js';

// // // // export default async function authenticate(req, res, next) {
// // // //   try {
// // // //     const authHeader = req.get('Authorization') || '';
// // // //     const [scheme, token] = authHeader.split(' ');
// // // //     if (scheme !== 'Bearer' || !token) {
// // // //       throw createError(401, 'Authorization token missing or malformed');
// // // //     }

// // // //     const payload = jwt.verify(token, process.env.ACCESS_SECRET);
// // // //     const user = await User.findById(payload.id);
// // // //     if (!user) throw createError(401, 'User not found');

// // // //     req.user = user;
// // // //     next();
// // // //   } catch (err) {
// // // //     if (err.name === 'TokenExpiredError') {
// // // //       next(createError(401, 'Access token expired'));
// // // //     } else {
// // // //       next(err);
// // // //     }
// // // //   }
// // // // }

// // // import jwt from 'jsonwebtoken';
// // // import createError from 'http-errors';
// // // import User from '../models/user.js';
// // // import Session from '../models/session.js';   // ← додаємо

// // // export default async function authenticate(req, res, next) {
// // //   try {
// // //     const authHeader = req.get('Authorization') || '';
// // //     const [scheme, token] = authHeader.split(' ');
// // //     if (scheme !== 'Bearer' || !token) {
// // //       throw createError(401, 'Authorization token missing or malformed');
// // //     }

// // //     // 1. Розшифровуємо токен
// // //     const payload = jwt.verify(token, process.env.ACCESS_SECRET);

// // //     // 2. Перевірка: токен має існувати в активних сесіях
// // //     const session = await Session.findOne({
// // //       userId: payload.id,
// // //       accessToken: token
// // //     });
// // //     if (!session) {
// // //       throw createError(401, 'Session not found or logged out');
// // //     }

// // //     // 3. Знаходимо користувача
// // //     const user = await User.findById(payload.id);
// // //     if (!user) throw createError(401, 'User not found');

// // //     req.user = user;
// // //     next();
// // //   } catch (err) {
// // //     if (err.name === 'TokenExpiredError') {
// // //       next(createError(401, 'Access token expired'));
// // //     } else {
// // //       next(err);
// // //     }
// // //   }
// // // }

// // import jwt from 'jsonwebtoken';
// // import createError from 'http-errors';
// // import User from '../models/user.js';
// // import Session from '../models/session.js';

// // export default async function authenticate(req, res, next) {
// //   try {
// //     let token;

// //     // 1) спробуємо витягнути з заголовка
// //     const authHeader = req.get('Authorization') || '';
// //     if (authHeader.startsWith('Bearer ')) {
// //       token = authHeader.split(' ')[1];
// //     }
// //     // 2) або з кукі
// //     else if (req.cookies && req.cookies.accessToken) {
// //       token = req.cookies.accessToken;
// //     }

// //     if (!token) {
// //       throw createError(401, 'Authorization token missing or malformed');
// //     }

// //     // 3) перевіряємо підпис
// //     const payload = jwt.verify(token, process.env.ACCESS_SECRET);

// //     // 4) переконуємося, що токен ще в сесії
// //     const session = await Session.findOne({
// //       userId: payload.id,
// //       accessToken: token
// //     });
// //     if (!session) {
// //       throw createError(401, 'Session not found or logged out');
// //     }

// //     // 5) дістаємо користувача
// //     const user = await User.findById(payload.id);
// //     if (!user) {
// //       throw createError(401, 'User not found');
// //     }

// //     req.user = user;
// //     next();
// //   } catch (err) {
// //     if (err.name === 'TokenExpiredError') {
// //       next(createError(401, 'Access token expired'));
// //     } else {
// //       next(err);
// //     }
// //   }
// // }

// // src/middlewares/authenticate.js
// import jwt from 'jsonwebtoken';
// import createError from 'http-errors';
// import User from '../models/user.js';
// import Session from '../models/session.js';

// export default async function authenticate(req, res, next) {
//   try {
//     let token;

//     // 1) Пробуємо витягнути з заголовка
//     const authHeader = req.get('Authorization') || '';
//     if (authHeader.startsWith('Bearer ')) {
//       token = authHeader.split(' ')[1];
//     }
//     // 2) Якщо в заголовку нічого — беремо з кукі
//     else if (req.cookies && req.cookies.accessToken) {
//       token = req.cookies.accessToken;
//     }

//     if (!token) {
//       throw createError(401, 'Authorization token missing or malformed');
//     }

//     // 3) Перевіряємо підпис та дістаємо payload
//     const payload = jwt.verify(token, process.env.ACCESS_SECRET);

//     // 4) Перевіряємо, що такий accessToken є в активних сесіях
//     const session = await Session.findOne({
//       userId: payload.id,
//       accessToken: token
//     });
//     if (!session) {
//       throw createError(401, 'Session not found or logged out');
//     }

//     // 5) Дістаємо користувача
//     const user = await User.findById(payload.id);
//     if (!user) throw createError(401, 'User not found');

//     req.user = user;
//     next();
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       next(createError(401, 'Access token expired'));
//     } else {
//       next(err);
//     }
//   }
// }
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/user.js';
import Session from '../models/session.js';

export default async function authenticate(req, res, next) {
  try {
    let token = null;
    const authHeader = req.get('Authorization') || '';
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }
    if (!token) throw createError(401, 'Authorization token missing or malformed');

    const { id } = jwt.verify(token, process.env.ACCESS_SECRET);
    const session = await Session.findOne({ userId: id, accessToken: token });
    if (!session) throw createError(401, 'Session not found or logged out');

    const user = await User.findById(id);
    if (!user) throw createError(401, 'User not found');

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') next(createError(401, 'Access token expired'));
    else next(err);
  }
}
