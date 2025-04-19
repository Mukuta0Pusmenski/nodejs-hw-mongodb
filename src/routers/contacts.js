// const express = require('express');
// const router = express.Router();
// const contactsController = require('../controllers/contactsController');

// // Приклади маршрутів
// router.get('/contacts', contactsController.getAllContacts);
// router.post('/contacts', contactsController.createContact);
// router.patch('/contacts/:contactId', contactsController.updateContact);
// router.delete('/contacts/:contactId', contactsController.deleteContact);

// module.exports = router;

// import express from 'express';
// import { getAllContacts, getContactById } from '../controllers/contactsController.js';

// const router = express.Router();

// // Роутинг для контактів
// router.get('/contacts', getAllContacts);
// router.get('/contacts/:contactId', getContactById);

// export default router;

// import express from 'express';
// import {
//   getAllContacts,
//   getContactById,
//   createContact,
// } from '../controllers/contactsController.js';

// const router = express.Router();

// router.get('/contacts', getAllContacts);
// router.get('/contacts/:contactId', getContactById);
// router.post('/contacts', createContact); // Новий маршрут для додавання контакту

// export default router;

// import express from 'express';
// import {
//   getAllContacts,
//   getContactById,
//   createContact,
// } from '../controllers/contactsController.js';
// import ctrlWrapper from '../utils/ctrlWrapper.js';

// const router = express.Router();

// router.get('/contacts', ctrlWrapper(getAllContacts));
// router.get('/contacts/:contactId', ctrlWrapper(getContactById));
// router.post('/contacts', ctrlWrapper(createContact)); // Новий маршрут для додавання контакту

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

const router = express.Router();

router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContactById));
router.post('/contacts', ctrlWrapper(createContact));
router.patch('/contacts/:contactId', ctrlWrapper(updateContactById)); // Маршрут для оновлення контакту
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactById)); // Маршрут для видалення контакту

export default router;
