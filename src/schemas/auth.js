
// // // // import Joi from 'joi';

// // // // export const registerSchema = Joi.object({
// // // //   name:     Joi.string().min(1).required(),
// // // //   email:    Joi.string().email().required(),
// // // //   password: Joi.string().min(6).required()
// // // // });

// // // // export const loginSchema = Joi.object({
// // // //   email:    Joi.string().email().required(),
// // // //   password: Joi.string().min(6).required()
// // // // });
// // // import Joi from 'joi';

// // // export const registerSchema = Joi.object({
// // //   name:     Joi.string().min(1).required(),
// // //   email:    Joi.string().email().required(),
// // //   password: Joi.string().min(6).required()
// // // });

// // // export const loginSchema = Joi.object({
// // //   email:    Joi.string().email().required(),
// // //   password: Joi.string().min(6).required()
// // // });

// // // // Додаємо нову схему для відправки лінку на скидання паролю
// // // export const sendResetEmailSchema = Joi.object({
// // //   email: Joi.string().email().required()
// // // });

// // // export const resetPwdSchema = Joi.object({
// // //   token:    Joi.string().required(),
// // //   password: Joi.string().min(6).required()
// // // });

// // import Joi from 'joi';

// // export const registerSchema = Joi.object({
// //   name:     Joi.string().min(1).required(),
// //   email:    Joi.string().email().required(),
// //   password: Joi.string().min(6).required()
// // });

// // export const loginSchema = Joi.object({
// //   email:    Joi.string().email().required(),
// //   password: Joi.string().min(6).required()
// // });

// // // для /auth/send-reset-email
// // export const sendResetEmailSchema = Joi.object({
// //   email: Joi.string().email().required()
// // });

// // // для /auth/reset-password/:token — лише пароль у тілі
// // export const resetPwdSchema = Joi.object({
// //   password: Joi.string().min(6).required()
// // });

// // ───────────────────────────────────────────────────────────────────
// // src/schemas/auth.js
// import Joi from 'joi';

// export const registerSchema = Joi.object({
//   name:     Joi.string().min(1).required(),
//   email:    Joi.string().email().required(),
//   password: Joi.string().min(6).required()
// });

// export const loginSchema = Joi.object({
//   email:    Joi.string().email().required(),
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
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const sendResetEmailSchema = Joi.object({
  email: Joi.string().email().required()
});

export const resetPwdSchema = Joi.object({
  password: Joi.string().min(6).required()
});
