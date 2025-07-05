import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/user.js';
import Session from '../models/session.js';

const getExpiryDate = (token) => {
  const { exp } = jwt.decode(token);
  return new Date(exp * 1000);
};

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

    const userId = user._id;
    const accessToken  = jwt.sign({ id: userId }, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

    await Session.create({
      userId,
      accessToken,
      refreshToken,
      accessTokenValidUntil:  getExpiryDate(accessToken),
      refreshTokenValidUntil: getExpiryDate(refreshToken)
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

    const newAccessToken  = jwt.sign({ id }, process.env.ACCESS_SECRET,  { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

    session.accessToken  = newAccessToken;
    session.refreshToken = newRefreshToken;
    session.accessTokenValidUntil  = getExpiryDate(newAccessToken);
    session.refreshTokenValidUntil = getExpiryDate(newRefreshToken);
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
      next(createError(401, 'Refresh token expired'));
    } else {
      next(err);
    }
  }
};

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
