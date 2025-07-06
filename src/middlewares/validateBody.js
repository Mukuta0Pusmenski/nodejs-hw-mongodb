
// // import Joi from 'joi';

// // export const validateBody = (schema) => (req, res, next) => {
// //   const { error } = schema.validate(req.body, { abortEarly: false });
// //   if (error) {
// //     const errors = error.details.map(d => d.message);
// //     return res.status(400).json({
// //       status: 400,
// //       message: 'Validation error',
// //       errors
// //     });
// //   }
// //   next();
// // };


// // не чіпати без потреби
// // import Joi from 'joi';

// // // Перевірка URL параметру :id
// // export const paramsSchema = Joi.object({
// //   id: Joi.string().hex().length(24).required()
// // });

// // // POST /contacts
// // export const contactPostSchema = Joi.object({
// //   name:        Joi.string().min(3).max(30).required(),
// //   phoneNumber: Joi.string().min(3).max(20).required(),
// //   email:       Joi.string().email().required(),
// //   isFavourite: Joi.boolean().optional(),
// //   contactType: Joi.string().valid('work','home','personal').required()
// // });

// // // PATCH /contacts/:id
// // export const contactPatchSchema = Joi.object({
// //   name:        Joi.string().min(3).max(30),
// //   phoneNumber: Joi.string().min(3).max(20),
// //   email:       Joi.string().email(),
// //   isFavourite: Joi.boolean(),
// //   contactType: Joi.string().valid('work','home','personal')
// // }).min(1);
// import createError from 'http-errors';

// /**
//  * middleware для валідації req.body за Joi–схемою
//  */
// export function validateBody(schema) {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       // збираємо всі повідомлення в один рядок
//       const messages = error.details.map(d => d.message).join('; ');
//       return next(createError(400, `Validation error: ${messages}`));
//     }
//     next();
//   };
// }

// /**
//  * middleware для валідації req.params за Joi–схемою
//  */
// export function validateParams(schema) {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.params);
//     if (error) {
//       const messages = error.details.map(d => d.message).join('; ');
//       return next(createError(400, `Invalid params: ${messages}`));
//     }
//     next();
//   };
// }
import createError from 'http-errors';

/**
 * Middleware для валідації req.body за Joi–схемою
 */
export function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map(d => d.message).join('; ');
      return next(createError(400, messages));
    }
    next();
  };
}

/**
 * Middleware для валідації req.params за Joi–схемою
 */
export function validateParams(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error) {
      const messages = error.details.map(d => d.message).join('; ');
      return next(createError(400, messages));
    }
    next();
  };
}
