// import express from 'express';
// import {
//   getAllContacts,
//   getContactById,
//   createContact,
//   updateContactById,
//   deleteContactById,
// } from '../controllers/contactsController.js';

// import ctrlWrapper from '../utils/ctrlWrapper.js';
// import { validateBody } from '../middlewares/validateBody.js'; // Додаємо валідацію body
// import { isValidId } from '../middlewares/isValidId.js'; // Додаємо перевірку ID
// import { contactSchema } from '../schemas/validationSchemas.js'; // Схема валідації

// const router = express.Router();

// router.get('/contacts', ctrlWrapper(getAllContacts));
// router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactById));
// router.post('/contacts', validateBody(contactSchema), ctrlWrapper(createContact));
// router.patch('/contacts/:contactId', isValidId, validateBody(contactSchema), ctrlWrapper(updateContactById)); // Оновлення з перевіркою ID та body
// router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactById)); // Видалення з перевіркою ID

// export default router;


import express from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../controllers/contactsController.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js'; // Додаємо валідацію body
import { isValidId } from '../middlewares/isValidId.js'; // Додаємо перевірку ID
import { contactPostSchema, contactPatchSchema } from '../schemas/validationSchemas.js'; // Оновлені схеми

const router = express.Router();

router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactById));
router.post('/contacts', validateBody(contactPostSchema), ctrlWrapper(createContact)); // `POST` з required полями
router.patch('/contacts/:contactId', isValidId, validateBody(contactPatchSchema), ctrlWrapper(updateContactById)); // `PATCH` без required
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactById)); // Видалення з перевіркою ID

export default router;
