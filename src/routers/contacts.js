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
import { contactSchema } from '../schemas/validationSchemas.js'; // Схема валідації

const router = express.Router();

router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactById));
router.post('/contacts', validateBody(contactSchema), ctrlWrapper(createContact));
router.patch('/contacts/:contactId', isValidId, validateBody(contactSchema), ctrlWrapper(updateContactById)); // Оновлення з перевіркою ID та body
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactById)); // Видалення з перевіркою ID

export default router;
