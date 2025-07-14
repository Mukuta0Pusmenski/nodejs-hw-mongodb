// // // // // // import { Router } from 'express';
// // // // // // import { validateBody } from '../middlewares/validateBody.js';
// // // // // // import {
// // // // // //   createContactSchema,
// // // // // //   updateContactSchema
// // // // // // } from '../schemas/contact.js';
// // // // // // import * as ctrl from '../controllers/contactsController.js';

// // // // // // const router = Router();

// // // // // // router.get('/',    ctrl.listContacts);
// // // // // // router.get('/:id', ctrl.getContact);

// // // // // // router.post(
// // // // // //   '/',
// // // // // //   validateBody(createContactSchema),
// // // // // //   ctrl.createContact
// // // // // // );

// // // // // // router.patch(
// // // // // //   '/:id',
// // // // // //   validateBody(updateContactSchema),
// // // // // //   ctrl.updateContact
// // // // // // );

// // // // // // router.delete('/:id', ctrl.deleteContact);

// // // // // // export default router;
// // // // // import express from 'express';
// // // // // import authenticate     from '../middlewares/authenticate.js';
// // // // // import { validateBody, validateParams } from '../middlewares/validateBody.js';
// // // // // import * as ctrl        from '../controllers/contactsController.js';
// // // // // import {
// // // // //   contactPostSchema,
// // // // //   contactPatchSchema,
// // // // //   paramsSchema
// // // // // } from '../schemas/validationSchemas.js';

// // // // // const router = express.Router();

// // // // // // захищаємо всі маршрути токеном
// // // // // router.use(authenticate);

// // // // // router.get('/',                    ctrl.getAllContacts);
// // // // // router.get('/:id', validateParams(paramsSchema), ctrl.getContactById);

// // // // // router.post(
// // // // //   '/',
// // // // //   validateBody(contactPostSchema),
// // // // //   ctrl.createContact
// // // // // );

// // // // // router.patch(
// // // // //   '/:id',
// // // // //   validateParams(paramsSchema),
// // // // //   validateBody(contactPatchSchema),
// // // // //   ctrl.updateContactById
// // // // // );

// // // // // router.delete(
// // // // //   '/:id',
// // // // //   validateParams(paramsSchema),
// // // // //   ctrl.deleteContactById
// // // // // );

// // // // // export default router;
// // // // import express from 'express';
// // // // import authenticate from '../middlewares/authenticate.js';
// // // // import { validateBody, validateParams } from '../middlewares/validateBody.js';
// // // // import * as ctrl from '../controllers/contactsController.js';
// // // // import {
// // // //   contactPostSchema,
// // // //   contactPatchSchema,
// // // //   paramsSchema
// // // // } from '../schemas/contactSchemas.js';

// // // // const router = express.Router();

// // // // router.use(authenticate);

// // // // router.get('/',                    ctrl.getAllContacts);
// // // // router.get('/:id', validateParams(paramsSchema), ctrl.getContactById);

// // // // router.post(
// // // //   '/',
// // // //   validateBody(contactPostSchema),
// // // //   ctrl.createContact
// // // // );

// // // // router.patch(
// // // //   '/:id',
// // // //   validateParams(paramsSchema),
// // // //   validateBody(contactPatchSchema),
// // // //   ctrl.updateContactById
// // // // );

// // // // router.delete(
// // // //   '/:id',
// // // //   validateParams(paramsSchema),
// // // //   ctrl.deleteContactById
// // // // );

// // // // export default router;
// // // import express from 'express';
// // // import authenticate from '../middlewares/authenticate.js';
// // // import { validateBody, validateParams } from '../middlewares/validateBody.js';
// // // import * as ctrl from '../controllers/contactsController.js';
// // // import {
// // //   paramsSchema,
// // //   contactPostSchema,
// // //   contactPatchSchema
// // // } from '../schemas/contactSchemas.js';

// // // const router = express.Router();

// // // router.use(authenticate);

// // // router.get(
// // //   '/',
// // //   ctrl.getAllContacts
// // // );

// // // router.get(
// // //   '/:id',
// // //   validateParams(paramsSchema),
// // //   ctrl.getContactById
// // // );

// // // router.post(
// // //   '/',
// // //   validateBody(contactPostSchema),
// // //   ctrl.createContact
// // // );

// // // router.patch(
// // //   '/:id',
// // //   validateParams(paramsSchema),
// // //   validateBody(contactPatchSchema),
// // //   ctrl.updateContactById
// // // );

// // // router.delete(
// // //   '/:id',
// // //   validateParams(paramsSchema),
// // //   ctrl.deleteContactById
// // // );

// // // export default router;



// // import express from 'express';
// // import authenticate from '../middlewares/authenticate.js';
// // import { upload } from '../services/upload.js';
// // import { validateBody, validateParams } from '../middlewares/validateBody.js';
// // // import * as ctrl from '../controllers/contactsController.js';
// // import ctrl from '../controllers/contacts.js';
// // import { contactPutSchema } from '../schemas/contact.js';
// // import {
// //   paramsSchema,
// //   contactPostSchema,
// //   contactPatchSchema
// // } from '../schemas/contactSchemas.js';

// // const router = express.Router();
// // router.use(authenticate);

// // router.get('/', ctrl.getAllContacts);

// // router.get(
// //   '/:id',
// //   validateParams(paramsSchema),
// //   ctrl.getContactById
// // );

// // router.post(
// //   '/',
// //   upload.single('photo'),
// //   validateBody(contactPostSchema),
// //   ctrl.createContact
// // );

// // router.patch(
// //   '/:id',
// //   upload.single('photo'),
// //   validateParams(paramsSchema),
// //   validateBody(contactPatchSchema),
// //   ctrl.updateContactById
// // );

// // router.patch(
// //   '/:contactId',
// //   authenticate,
// //   validateBody(contactPutSchema),
// //   ctrl.updateContact
// // );

// // router.delete(
// //   '/:id',
// //   validateParams(paramsSchema),
// //   ctrl.deleteContactById
// // );

// // export default router;

// import express from 'express';
// import authenticate        from '../middlewares/authenticate.js';
// import { upload }          from '../services/upload.js';
// import { validateBody, validateParams } from '../middlewares/validateBody.js';
// import {
//   paramsSchema,
//   contactPostSchema,
//   contactPatchSchema
// } from '../schemas/contactSchemas.js';
// import * as ctrl from '../controllers/contactsController.js';
// const router = express.Router();

// // Усі маршрути під захистом
// router.use(authenticate);

// // GET /contacts
// router.get('/', ctrl.getAllContacts);

// // GET /contacts/:id
// router.get(
//   '/:id',
//   validateParams(paramsSchema),
//   ctrl.getContactById
// );

// // POST /contacts  (JSON + optional photo)
// router.post(
//   '/',
//   upload.single('photo'),
//   validateBody(contactPostSchema),
//   ctrl.createContact
// );

// // PATCH /contacts/:id  (оновлення полів і/або фото)
// router.patch(
//   '/:id',
//   upload.single('photo'),
//   validateParams(paramsSchema),
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

// всі маршрути тільки для залогінених
router.use(authenticate);

// GET /contacts
router.get('/', ctrl.getAllContacts);

// GET /contacts/:id
router.get(
  '/:id',
  validateParams(paramsSchema),
  ctrl.getContactById
);

// POST /contacts  — створити з опцією фото
router.post(
  '/',
  upload.single('photo'),
  validateBody(contactPostSchema),
  ctrl.createContact
);

// PATCH /contacts/:id — оновити поля і/або фото
router.patch(
  '/:id',
  upload.single('photo'),
  validateParams(paramsSchema),
  validateBody(contactPatchSchema),
  ctrl.updateContactById
);

router.patch(
  '/:id/photo',
  authenticate,
  validateParams(paramsSchema),
  upload.single('photo'),
  ctrl.updateContactById
);

// DELETE /contacts/:id
router.delete(
  '/:id',
  validateParams(paramsSchema),
  ctrl.deleteContactById
);

export default router;
