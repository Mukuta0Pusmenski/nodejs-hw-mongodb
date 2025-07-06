
// import Joi from 'joi';

// export const validateBody = (schema) => (req, res, next) => {
//   const { error } = schema.validate(req.body, { abortEarly: false });
//   if (error) {
//     const errors = error.details.map(d => d.message);
//     return res.status(400).json({
//       status: 400,
//       message: 'Validation error',
//       errors
//     });
//   }
//   next();
// };

import Joi from 'joi';

// Перевірка URL параметру :id
export const paramsSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

// POST /contacts
export const contactPostSchema = Joi.object({
  name:        Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email:       Joi.string().email().required(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work','home','personal').required()
});

// PATCH /contacts/:id
export const contactPatchSchema = Joi.object({
  name:        Joi.string().min(3).max(30),
  phoneNumber: Joi.string().min(3).max(20),
  email:       Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work','home','personal')
}).min(1);
