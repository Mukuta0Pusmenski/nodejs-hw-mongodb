
import createError from 'http-errors';
import bcrypt      from 'bcrypt';
import jwt         from 'jsonwebtoken';

import User    from '../models/user.js';
import Session from '../models/session.js';

const ACCESS_EXPIRES_IN  = '15m';
const REFRESH_EXPIRES_IN = '30d';

export async function registerService(name, email, password) {
  if (await User.findOne({ email })) {
    throw createError(409, 'Email in use');
  }
  const hashed = await bcrypt.hash(password, 10);
  return User.create({ name, email, password: hashed });
}

export async function loginService(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw createError(401, 'Email or password is wrong');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw createError(401, 'Email or password is wrong');

  await Session.deleteMany({ userId: user._id });

  const accessToken  = jwt.sign(
    { id: user._id },
    process.env.ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES_IN }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES_IN }
  );
  const now = Date.now();

  await Session.create({
    userId:                user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil:  new Date(now + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(now + 30 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken };
}

export async function refreshService(oldRefreshToken) {
  const session = await Session.findOne({ refreshToken: oldRefreshToken });
  if (!session) throw createError(401, 'Refresh token invalid');

  await Session.deleteOne({ _id: session._id });
  return loginService(session.userId.toString());
}

export async function logoutService(refreshToken) {
  const { deletedCount } = await Session.deleteOne({ refreshToken });
  if (!deletedCount) throw createError(401, 'Session not found');
}
