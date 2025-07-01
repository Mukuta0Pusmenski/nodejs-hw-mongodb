import {
    registerService,
    loginService,
    refreshService,
    logoutService,
  } from '../services/auth.js';
  
  export async function registerUser(req, res, next) {
    try {
      const user = await registerService(
        req.body.name,
        req.body.email,
        req.body.password
      );
      res.status(201).json({
        status:  201,
        message: 'Successfully registered a user!',
        data: { _id: user._id, name: user.name, email: user.email },
      });
    } catch (err) {
      next(err);
    }
  }
  
  export async function loginUser(req, res, next) {
    try {
      const { accessToken, refreshToken } = await loginService(
        req.body.email,
        req.body.password
      );
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge:   30 * 24 * 60 * 60 * 1000,
      });
      res.json({
        status:  200,
        message: 'Successfully logged in a user!',
        data: { accessToken },
      });
    } catch (err) {
      next(err);
    }
  }
  
  export async function refreshUser(req, res, next) {
    try {
      const { accessToken, refreshToken } = await refreshService(
        req.cookies.refreshToken
      );
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge:   30 * 24 * 60 * 60 * 1000,
      });
      res.json({
        status:  200,
        message: 'Successfully refreshed a session!',
        data: { accessToken },
      });
    } catch (err) {
      next(err);
    }
  }
  
  export async function logoutUser(req, res, next) {
    try {
      await logoutService(req.cookies.refreshToken);
      res.clearCookie('refreshToken');
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
  