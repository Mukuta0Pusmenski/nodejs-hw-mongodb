// // src/routes/contacts.js
// import express from 'express';
// import authenticate from '../middlewares/authenticate.js';
// import { upload } from '../services/upload.js';
// import { validateBody, validateParams } from '../middlewares/validateBody.js';
// import {
//   paramsSchema,
//   contactPostSchema,
//   contactPatchSchema
// } from '../schemas/contactSchemas.js';
// import * as ctrl from '../controllers/contactsController.js';

// const router = express.Router();
// // Всі контакти тільки для авторизованих
// router.use(authenticate);

// // GET /contacts
// router.get('/', ctrl.getAllContacts);

// // GET /contacts/:id
// router.get(
//   '/:id',
//   validateParams(paramsSchema),
//   ctrl.getContactById
// );

// // POST /contacts — створити контакт + опційно аватар
// // router.post(
// //   '/',
// //   upload.single('avatar'),
// //   validateBody(contactPostSchema),
// //   ctrl.addContact
// // );

// router.post(
//   '/',
//   upload.single('photo'),
//   validateBody(contactPostSchema),
//   ctrl.addContact
// );

// // PATCH /contacts/:id — оновити поля і/або аватар
// // router.patch(
// //   '/:id',
// //   validateParams(paramsSchema),
// //   upload.single('avatar'),
// //   validateBody(contactPatchSchema),
// //   ctrl.updateContactById
// // );

// router.patch(
//   '/:id',
//   validateParams(paramsSchema),
//   upload.single('photo'),
//   validateBody(contactPatchSchema),
//   ctrl.updateContactById
// );

// // DELETE /contacts/:id
// router.delete(
//   '/:id',
//   validateParams(paramsSchema),
//   ctrl.deleteContactById
// );

// export default router;

import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import { upload } from '../services/upload.js';
import { validateBody, validateParams } from '../middlewares/validateBody.js';
import {
  paramsSchema,
  contactPostSchema,
  contactPatchSchema
} from '../schemas/contactSchemas.js';
import * as ctrl from '../controllers/contactsController.js';

const router = express.Router();
router.use(authenticate);

// GET /contacts
router.get('/', ctrl.getAllContacts);

// GET /contacts/:id
router.get(
  '/:id',
  validateParams(paramsSchema),
  ctrl.getContactById
);

// POST /contacts — створити контакт + опційно фото
router.post(
  '/',
  upload.single('photo'),
  validateBody(contactPostSchema),
  ctrl.addContact
);

// PATCH /contacts/:id — оновити поля і/або фото
router.patch(
  '/:id',
  validateParams(paramsSchema),
  upload.single('photo'),
  validateBody(contactPatchSchema),
  ctrl.updateContactById
);

// DELETE /contacts/:id
router.delete(
  '/:id',
  validateParams(paramsSchema),
  ctrl.deleteContactById
);

export default router;
