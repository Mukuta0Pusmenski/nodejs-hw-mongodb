import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema
} from '../schemas/contact.js';
import * as ctrl from '../controllers/contactsController.js';

const router = Router();

router.get('/',    ctrl.listContacts);
router.get('/:id', ctrl.getContact);

router.post(
  '/',
  validateBody(createContactSchema),
  ctrl.createContact
);

router.patch(
  '/:id',
  validateBody(updateContactSchema),
  ctrl.updateContact
);

router.delete('/:id', ctrl.deleteContact);

export default router;
