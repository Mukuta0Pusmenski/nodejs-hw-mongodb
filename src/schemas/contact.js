// // import Joi from 'joi';

// // export const contactSchema = Joi.object({
// //   name:     Joi.string().min(1).required(),
// //   email:    Joi.string().email().required(),
// //   phone:    Joi.string().min(5).required(),
// //   message:  Joi.string().allow('').optional()
// // });
// import Joi from 'joi';

// export const contactSchema = Joi.object({
//   name:    Joi.string().min(1).required(),
//   email:   Joi.string().email().required(),
//   phone:   Joi.string().min(5).required(),
//   message: Joi.string().allow('').optional()
// });
import Joi from 'joi';

export const contactSchema = Joi.object({
  name:    Joi.string().min(1).required(),
  email:   Joi.string().email().required(),
  phone:   Joi.string().min(5).required(),
  message: Joi.string().allow('').optional()
});
