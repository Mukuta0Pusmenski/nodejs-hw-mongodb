// import express from 'express';
// import {
//   getAllContacts,
//   getContactById,
//   createContact,
//   updateContactById,
//   deleteContactById,
// } from '../controllers/contactsController.js';

// import ctrlWrapper from '../utils/ctrlWrapper.js';
// import { validateBody } from '../middlewares/validateBody.js';
// import { isValidId } from '../middlewares/isValidId.js';
// import { contactPostSchema, contactPatchSchema } from '../schemas/validationSchemas.js';

// const router = express.Router();

// router.get('/contacts', ctrlWrapper(getAllContacts));
// router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactById));
// router.post('/contacts', validateBody(contactPostSchema), ctrlWrapper(createContact));
// router.patch('/contacts/:contactId', isValidId, validateBody(contactPatchSchema), ctrlWrapper(updateContactById));
// router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactById));

// export default router;

import { Router } from 'express';
import authenticate from '../middlewares/authenticate.js';
import Contact      from '../models/contact.js';
import jwt          from 'jsonwebtoken';
import createError  from 'http-errors';

const router = Router();

// HTML-сторінка контактів із cookie-refresh
router.get('/contacts/page', async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.redirect('/auth/login');

    // Оновлюємо сесію
    const { accessToken, refreshToken: newRT } = await 
      import('../services/auth.js').then(m => m.refreshService(refreshToken));

    res.cookie('refreshToken', newRT, {
      httpOnly: true,
      maxAge:   30 * 24 * 60 * 60 * 1000,
    });

    const { id: userId } = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    const contacts = await Contact.find({ userId });

    let html = '<h2>Your Contacts</h2><ul>';
    contacts.forEach(c => {
      html += `<li>${c.name} — ${c.email} — ${c.phoneNumber}</li>`;
    });
    html += '</ul><a href="/auth/login"><button>Logout</button></a>';
    res.send(html);
  } catch (err) {
    next(err);
  }
});

// Всі JSON-роути під захистом
router.use(authenticate);

router.get('/contacts', async (req, res, next) => {
  try {
    const contacts = await Contact.find({ userId: req.user._id });
    res.json({ status: 200, message: 'Fetched contacts', data: contacts });
  } catch (err) {
    next(err);
  }
});

router.get('/contacts/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!contact) throw createError(404, 'Contact not found');
    res.json({ status: 200, data: contact });
  } catch (err) {
    next(err);
  }
});

router.post('/contacts', async (req, res, next) => {
  try {
    const contact = await Contact.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json({ status: 201, data: contact });
  } catch (err) {
    next(err);
  }
});

router.put('/contacts/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!contact) throw createError(404, 'Contact not found');
    res.json({ status: 200, data: contact });
  } catch (err) {
    next(err);
  }
});

router.delete('/contacts/:id', async (req, res, next) => {
  try {
    const result = await Contact.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!result) throw createError(404, 'Contact not found');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
