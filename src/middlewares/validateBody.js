// // import Joi from 'joi';

// // export const validateBody = (schema) => {
// //   return (req, res, next) => {
// //     const { error } = schema.validate(req.body, { abortEarly: false }); // ✅ `abortEarly: false` повертає всі помилки

// //     if (error) {
// //       const errors = error.details.map(err => err.message); // ✅ Масив усіх помилок
// //       return res.status(400).json({ message: "Validation error", errors });
// //     }

// //     next();
// //   };
// // };

// import Joi from 'joi';

// export const validateBody = (schema) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body, { abortEarly: false });
//     if (error) {
//       const errors = error.details.map(err => err.message);
//       return res.status(400).json({ message: "Validation error", errors });
//     }
//     next();
//   };
// };
import Joi from 'joi';

export const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(d => d.message);
    return res.status(400).json({ status: 400, message: 'Validation error', errors });
  }
  next();
};
