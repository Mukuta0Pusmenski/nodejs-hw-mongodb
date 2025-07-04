// // // import Joi from 'joi';

// // // export const contactSchema = Joi.object({
// // //   name:     Joi.string().min(1).required(),
// // //   email:    Joi.string().email().required(),
// // //   phone:    Joi.string().min(5).required(),
// // //   message:  Joi.string().allow('').optional()
// // // });
// // import Joi from 'joi';

// // export const contactSchema = Joi.object({
// //   name:    Joi.string().min(1).required(),
// //   email:   Joi.string().email().required(),
// //   phone:   Joi.string().min(5).required(),
// //   message: Joi.string().allow('').optional()
// // });
// import Joi from 'joi';

// export const contactSchema = Joi.object({
//   name:    Joi.string().min(1).required(),
//   email:   Joi.string().email().required(),
//   phone:   Joi.string().min(5).required(),
//   message: Joi.string().allow('').optional()
// });
import Joi from 'joi';

export const createContactSchema = Joi.object({
  name:    Joi.string().min(1).required(),
  email:   Joi.string().email().required(),
  phone:   Joi.string().min(5).required(),
  message: Joi.string().allow('').optional()
});

export const updateContactSchema = Joi.object({
  name:    Joi.string().min(1).optional(),
  email:   Joi.string().email().optional(),
  phone:   Joi.string().min(5).optional(),
  message: Joi.string().allow('').optional()
})
  .min(1)
  .message('At least one field must be provided for update');
