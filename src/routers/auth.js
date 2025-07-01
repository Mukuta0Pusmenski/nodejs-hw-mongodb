import { Router } from 'express';
import {
  registerUser,
  loginUser,
  refreshUser,
  logoutUser,
} from '../controllers/auth.js';

const router = Router();

router.post('/auth/register', registerUser);
router.post('/auth/login',    loginUser);
router.post('/auth/refresh',  refreshUser);
router.post('/auth/logout',   logoutUser);

export default router;
