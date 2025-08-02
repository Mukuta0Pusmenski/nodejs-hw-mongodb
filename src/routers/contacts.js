// // // // src/routes/contacts.js
// // // import express from 'express';
// // // import authenticate from '../middlewares/authenticate.js';
// // // import { upload } from '../services/upload.js';
// // // import { validateBody, validateParams } from '../middlewares/validateBody.js';
// // // import {
// // //   paramsSchema,
// // //   contactPostSchema,
// // //   contactPatchSchema
// // // } from '../schemas/contactSchemas.js';
// // // import * as ctrl from '../controllers/contactsController.js';

// // // const router = express.Router();
// // // // Всі контакти тільки для авторизованих
// // // router.use(authenticate);

// // // // GET /contacts
// // // router.get('/', ctrl.getAllContacts);

// // // // GET /contacts/:id
// // // router.get(
// // //   '/:id',
// // //   validateParams(paramsSchema),
// // //   ctrl.getContactById
// // // );

// // // // POST /contacts — створити контакт + опційно аватар
// // // // router.post(
// // // //   '/',
// // // //   upload.single('avatar'),
// // // //   validateBody(contactPostSchema),
// // // //   ctrl.addContact
// // // // );

// // // router.post(
// // //   '/',
// // //   upload.single('photo'),
// // //   validateBody(contactPostSchema),
// // //   ctrl.addContact
// // // );

// // // // PATCH /contacts/:id — оновити поля і/або аватар
// // // // router.patch(
// // // //   '/:id',
// // // //   validateParams(paramsSchema),
// // // //   upload.single('avatar'),
// // // //   validateBody(contactPatchSchema),
// // // //   ctrl.updateContactById
// // // // );

// // // router.patch(
// // //   '/:id',
// // //   validateParams(paramsSchema),
// // //   upload.single('photo'),
// // //   validateBody(contactPatchSchema),
// // //   ctrl.updateContactById
// // // );

// // // // DELETE /contacts/:id
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
// // import {
// //   paramsSchema,
// //   contactPostSchema,
// //   contactPatchSchema
// // } from '../schemas/contactSchemas.js';
// // import * as ctrl from '../controllers/contactsController.js';

// // const router = express.Router();
// // router.use(authenticate);

// // // GET /contacts
// // router.get('/', ctrl.getAllContacts);

// // // GET /contacts/:id
// // router.get(
// //   '/:id',
// //   validateParams(paramsSchema),
// //   ctrl.getContactById
// // );

// // // POST /contacts — створити контакт + опційно фото
// // router.post(
// //   '/',
// //   upload.single('photo'),
// //   validateBody(contactPostSchema),
// //   ctrl.addContact
// // );

// // // PATCH /contacts/:id — оновити поля і/або фото
// // router.patch(
// //   '/:id',
// //   validateParams(paramsSchema),
// //   upload.single('photo'),
// //   validateBody(contactPatchSchema),
// //   ctrl.updateContactById
// // );

// // // DELETE /contacts/:id
// // router.delete(
// //   '/:id',
// //   validateParams(paramsSchema),
// //   ctrl.deleteContactById
// // );

// // export default router;

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

// // ⛔ Автентифікація — обов’язкова для всіх маршрутів
// router.use(authenticate);

// // GET /contacts
// router.get('/', ctrl.getAllContacts);

// // GET /contacts/:id
// router.get(
//   '/:id',
//   validateParams(paramsSchema),
//   ctrl.getContactById
// );

// // POST /contacts — створити контакт + опційно фото
// router.post(
//   '/',
//   upload.single('photo'),
//   validateBody(contactPostSchema),
//   ctrl.addContact
// );

// // PATCH /contacts/:id — оновити поля і/або фото
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

/**
 * @swagger
 * /contacts:
 *   get:
 *     tags: [Contacts]
 *     summary: Отримати всі контакти
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список контактів
 *       401:
 *         description: Неавторизований
 */
router.get('/', ctrl.getAllContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     tags: [Contacts]
 *     summary: Отримати контакт за ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Контакт знайдено
 *       404:
 *         description: Контакт не знайдено
 */
router.get('/:id', validateParams(paramsSchema), ctrl.getContactById);

/**
 * @swagger
 * /contacts:
 *   post:
 *     tags: [Contacts]
 *     summary: Створити новий контакт
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               contactType:
 *                 type: string
 *                 enum: [work, home, personal]
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Контакт створено
 *       400:
 *         description: Помилка валідації
 */
router.post('/', upload.single('photo'),
  validateBody(contactPostSchema),
  ctrl.addContact);

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     tags: [Contacts]
 *     summary: Оновити контакт
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               contactType:
 *                 type: string
 *                 enum: [work, home, personal]
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Контакт оновлено
 *       404:
 *         description: Контакт не знайдено
 */
router.patch('/:id', validateParams(paramsSchema),
  upload.single('photo'),
  validateBody(contactPatchSchema),
  ctrl.updateContactById);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     tags: [Contacts]
 *     summary: Видалити контакт
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Контакт видалено
 *       404:
 *         description: Контакт не знайдено
 */
router.delete('/:id', validateParams(paramsSchema), ctrl.deleteContactById);

export default router;
