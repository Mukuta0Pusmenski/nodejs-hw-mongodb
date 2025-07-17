

// import createError from 'http-errors';


// export function validateBody(schema) {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body, { abortEarly: false });
//     if (error) {
//       const messages = error.details.map(d => d.message).join('; ');
//       return next(createError(400, messages));
//     }
//     next();
//   };
// }


// export function validateParams(schema) {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.params, { abortEarly: false });
//     if (error) {
//       const messages = error.details.map(d => d.message).join('; ');
//       return next(createError(400, messages));
//     }
//     next();
//   };
// }
  
import createError from 'http-errors';

// Перевірка тіла (req.body)
export const validateBody = (schema) => (req, res, next) => {
  // Для PATCH із файлом дозволяємо пусте тіло
  if (
    req.method === 'PATCH' &&
    req.file &&
    Object.keys(req.body).length === 0
  ) {
    return next();
  }

  const { error } = schema.validate(req.body);
  if (error) {
    return next(createError(400, error.message));
  }
  next();
};

// Перевірка URL-параметрів (req.params)
export const validateParams = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.params);
  if (error) {
    return next(createError(400, error.message));
  }
  next();
};
