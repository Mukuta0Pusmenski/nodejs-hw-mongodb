// import Joi from 'joi';

// /**
//  * Схема для перевірки URL-параметру :id
//  */
// export const paramsSchema = Joi.object({
//   id: Joi.string().hex().length(24).required()
// });

// /**
//  * Схема для POST /contacts
//  */
// export const contactPostSchema = Joi.object({
//   name:        Joi.string().min(2).required(),
//   email:       Joi.string().email().required(),
//   phoneNumber: Joi.string().pattern(/^\+?\d{7,15}$/).required(),
//   contactType: Joi.string().valid('personal','work','other').required(),
//   isFavourite: Joi.boolean().optional()
// });

// /**
//  * Схема для PATCH /contacts/:id
//  */
// export const contactPatchSchema = Joi.object({
//   name:        Joi.string().min(2),
//   email:       Joi.string().email(),
//   phoneNumber: Joi.string().pattern(/^\+?\d{7,15}$/),
//   contactType: Joi.string().valid('personal','work','other'),
//   isFavourite: Joi.boolean(),
//   photo:       Joi.string().uri()
// })
//   .min(1)
//   .messages({ 'object.min': 'At least one field must be provided for update' })
//   .or('name','email','phoneNumber','contactType','isFavourite','photo');
import Joi from 'joi';

/**
 * Схема для перевірки URL-параметру :id
 */
export const paramsSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

/**
 * Схема для POST /contacts
 */
export const contactPostSchema = Joi.object({
  name:        Joi.string().min(2).required(),
  email:       Joi.string().email().required(),
  phoneNumber: Joi.string().pattern(/^\+?\d{7,15}$/).required(),
  contactType: Joi.string().valid('personal','work','other').required(),
  isFavourite: Joi.boolean().optional()
});

/**
 * Схема для PATCH /contacts/:id
 */
export const contactPatchSchema = Joi.object({
  name:        Joi.string().min(2),
  email:       Joi.string().email(),
  phoneNumber: Joi.string().pattern(/^\+?\d{7,15}$/),
  contactType: Joi.string().valid('personal','work','other'),
  isFavourite: Joi.boolean(),
  photo:       Joi.string().uri()
})
  .min(1)
  .messages({ 'object.min': 'At least one field must be provided for update' })
  .or('name','email','phoneNumber','contactType','isFavourite','photo');
