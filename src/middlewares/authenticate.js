import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/user.js';

export default async function authenticate(req, res, next) {
  try {
    const authHeader = req.get('Authorization') || '';
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw createError(401, 'Authorization token missing or malformed');
    }

    const payload = jwt.verify(token, process.env.ACCESS_SECRET);
    const user = await User.findById(payload.id);
    if (!user) throw createError(401, 'User not found');

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      next(createError(401, 'Access token expired'));
    } else {
      next(err);
    }
  }
}
