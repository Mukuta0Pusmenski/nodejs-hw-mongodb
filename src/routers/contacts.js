import express from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../controllers/contactsController.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js'; 
import { contactPostSchema, contactPatchSchema } from '../schemas/validationSchemas.js'; 

const router = express.Router();

router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactById));
router.post('/contacts', validateBody(contactPostSchema), ctrlWrapper(createContact)); 
router.patch('/contacts/:contactId', isValidId, validateBody(contactPatchSchema), ctrlWrapper(updateContactById));
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactById)); 

export default router;
