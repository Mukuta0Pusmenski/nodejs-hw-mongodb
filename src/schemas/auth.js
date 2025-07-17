

// import Joi from 'joi';

// export const registerSchema = Joi.object({
//   name: Joi.string().min(1).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required()
// });

// export const loginSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required()
// });

// export const sendResetEmailSchema = Joi.object({
//   email: Joi.string().email().required()
// });

// export const resetPwdSchema = Joi.object({
//   password: Joi.string().min(6).required()
// });

import Joi from 'joi';

export const registerSchema = Joi.object({
  name:     Joi.string().min(1).required(),
  email:    Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  email:    Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const sendResetEmailSchema = Joi.object({
  email: Joi.string().email().required()
});

// Тепер приймаємо і токен, і новий пароль
export const resetPwdSchema = Joi.object({
  token:       Joi.string().required(),
  newPassword: Joi.string().min(6).required()
});
