// import Joi from 'joi';

// export const contactSchema = Joi.object({
//   name: Joi.string().min(3).max(20).required(),
//   phoneNumber: Joi.string().min(3).max(20).required(),
//   email: Joi.string().email().optional(),
//   isFavourite: Joi.boolean().optional(),
//   contactType: Joi.string().valid('work', 'home', 'personal').required()
// });


import Joi from 'joi';

// ✅ Схема для `POST /contacts` (усі поля required)
export const contactPostSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').required()
});

// ✅ Схема для `PATCH /contacts/:contactId` (без required)
export const contactPatchSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal')
});
