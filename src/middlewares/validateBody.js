import Joi from 'joi';

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // ✅ `abortEarly: false` повертає всі помилки

    if (error) {
      const errors = error.details.map(err => err.message); // ✅ Масив усіх помилок
      return res.status(400).json({ message: "Validation error", errors });
    }

    next();
  };
};
