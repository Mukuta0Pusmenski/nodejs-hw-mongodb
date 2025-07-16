
import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';
import { getCurrent, updateAvatar } from '../controllers/users.js';

const router = express.Router();

// GET /users/current — отримати дані поточного користувача
router.get('/current', authenticate, getCurrent);

// PATCH /users/avatar — оновити аватарку
router.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  updateAvatar
);

export default router;
