

import createError from 'http-errors';


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
  