
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
  name:        Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email:       Joi.string().email().required(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
                   .valid('work', 'home', 'personal')
                   .required()
});

/**
 * Схема для PATCH /contacts/:id
 */
export const contactPatchSchema = Joi.object({
  name:        Joi.string().min(3).max(30),
  phoneNumber: Joi.string().min(3).max(20),
  email:       Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal')
})
  .min(1)
  .messages({ 'object.min': 'At least one field must be provided for update' });
