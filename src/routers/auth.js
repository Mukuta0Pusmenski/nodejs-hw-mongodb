
import express from 'express';
import cookieParser from 'cookie-parser';

import {
  register,
  login,
  refresh,
  logout
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../schemas/auth.js';

const router = express.Router();
router.use(cookieParser());

router.post('/register', validateBody(registerSchema), register);
router.post('/login',    validateBody(loginSchema),    login);
router.post('/refresh',  refresh);
router.post('/logout',   logout);

export default router;
