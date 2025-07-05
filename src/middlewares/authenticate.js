
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/user.js';
import Session from '../models/session.js';

export default async function authenticate(req, res, next) {
  try {
    let token;
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
    if (err.name === 'TokenExpiredError') {
      next(createError(401, 'Access token expired'));
    } else {
      next(err);
    }
  }
}
