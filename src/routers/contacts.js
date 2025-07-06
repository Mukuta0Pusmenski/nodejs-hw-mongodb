// import { Router } from 'express';
// import { validateBody } from '../middlewares/validateBody.js';
// import {
//   createContactSchema,
//   updateContactSchema
// } from '../schemas/contact.js';
// import * as ctrl from '../controllers/contactsController.js';

// const router = Router();

// router.get('/',    ctrl.listContacts);
// router.get('/:id', ctrl.getContact);

// router.post(
//   '/',
//   validateBody(createContactSchema),
//   ctrl.createContact
// );

// router.patch(
//   '/:id',
//   validateBody(updateContactSchema),
//   ctrl.updateContact
// );

// router.delete('/:id', ctrl.deleteContact);

// export default router;
import express from 'express';
import authenticate     from '../middlewares/authenticate.js';
import { validateBody, validateParams } from '../middlewares/validateBody.js';
import * as ctrl        from '../controllers/contactsController.js';
import {
  contactPostSchema,
  contactPatchSchema,
  paramsSchema
} from '../schemas/validationSchemas.js';

const router = express.Router();

// захищаємо всі маршрути токеном
router.use(authenticate);

router.get('/',                    ctrl.getAllContacts);
router.get('/:id', validateParams(paramsSchema), ctrl.getContactById);

router.post(
  '/',
  validateBody(contactPostSchema),
  ctrl.createContact
);

router.patch(
  '/:id',
  validateParams(paramsSchema),
  validateBody(contactPatchSchema),
  ctrl.updateContactById
);

router.delete(
  '/:id',
  validateParams(paramsSchema),
  ctrl.deleteContactById
);

export default router;
