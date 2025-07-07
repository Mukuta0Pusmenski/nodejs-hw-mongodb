// // import createError from 'http-errors';
// // import * as service from '../services/contacts.js';

// // export const listContacts = async (req, res, next) => {
// //   try {
// //     const page  = Number(req.query.page)    || 1;
// //     const limit = Number(req.query.limit)
// //                     || Number(req.query.perPage)
// //                     || 20;
// //     const { sortBy, sortOrder } = req.query;

// //     const { contacts, totalItems } = await service.listContacts(
// //       req.user._id,
// //       { page, limit, sortBy, sortOrder }
// //     );

// //     res.json({
// //       status: 200,
// //       message: 'Contacts retrieved successfully',
// //       data: {
// //         contacts,
// //         page,
// //         perPage: limit,
// //         totalItems,
// //         totalPages: Math.ceil(totalItems / limit),
// //         hasPreviousPage: page > 1,
// //         hasNextPage: page * limit < totalItems
// //       }
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const getContact = async (req, res, next) => {
// //   try {
// //     const contact = await service.getContactById(req.params.id, req.user._id);
// //     if (!contact) throw createError(404, 'Contact not found');
// //     res.json({ status: 200, message: 'Contact found', data: contact });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const createContact = async (req, res, next) => {
// //   try {
// //     const newC = await service.addContact(req.body, req.user._id);
// //     res.status(201).json({ status: 201, message: 'Contact created', data: newC });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const updateContact = async (req, res, next) => {
// //   try {
// //     const updated = await service.updateContact(
// //       req.params.id,
// //       req.body,
// //       req.user._id
// //     );
// //     if (!updated) throw createError(404, 'Contact not found');
// //     res.json({ status: 200, message: 'Contact updated', data: updated });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const deleteContact = async (req, res, next) => {
// //   try {
// //     const deleted = await service.removeContact(req.params.id, req.user._id);
// //     if (!deleted) throw createError(404, 'Contact not found');
// //     res.json({ status: 200, message: 'Contact deleted', data: null });
// //   } catch (err) {
// //     next(err);
// //   }
// // };
// import createError from 'http-errors';
// import {
//   fetchContacts,
//   getById,
//   addContact,
//   updateContact,
//   deleteContact
// } from '../services/contacts.js';

// export const getAllContacts = async (req, res, next) => {
//   try {
//     const { page = 1, perPage = 10, sortBy, sortOrder, isFavourite, contactType } = req.query;
//     const result = await fetchContacts(req.user._id, {
//       page, perPage, sortBy, sortOrder, isFavourite, contactType
//     });
//     res.json({ status: 200, message: 'Contacts retrieved', data: result });
//   } catch (err) {
//     next(err);
//   }
// };

// export const getContactById = async (req, res, next) => {
//   try {
//     const contact = await getById(req.params.id, req.user._id);
//     if (!contact) throw createError(404, 'Contact not found');
//     res.json({ status: 200, message: 'Contact found', data: contact });
//   } catch (err) {
//     next(err);
//   }
// };

// export const createContact = async (req, res, next) => {
//   try {
//     const newContact = await addContact({ ...req.body, userId: req.user._id });
//     res.status(201).json({ status: 201, message: 'Contact created', data: newContact });
//   } catch (err) {
//     next(err);
//   }
// };

// export const updateContactById = async (req, res, next) => {
//   try {
//     const updated = await updateContact(req.params.id, req.body, req.user._id);
//     if (!updated) throw createError(404, 'Contact not found');
//     res.json({ status: 200, message: 'Contact updated', data: updated });
//   } catch (err) {
//     next(err);
//   }
// };

// export const deleteContactById = async (req, res, next) => {
//   try {
//     const deleted = await deleteContact(req.params.id, req.user._id);
//     if (!deleted) throw createError(404, 'Contact not found');
//     res.status(204).end();
//   } catch (err) {
//     next(err);
//   }
// };
// src/controllers/contactsController.js

import createError from 'http-errors';
import { fetchContacts, getById, addContact, updateContact, deleteContact } from '../services/contacts.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, sortBy, sortOrder, isFavourite, contactType } = req.query;
    const { contacts, totalItems, page: pageNum, perPage: perPageNum } =
      await fetchContacts(req.user._id, { page, perPage, sortBy, sortOrder, isFavourite, contactType });

    res.status(200).json({
      status: 200,
      message: 'Contacts retrieved',
      data: {
        data: contacts,
        page: pageNum,
        perPage: perPageNum,
        totalItems,
        totalPages: Math.ceil(totalItems / perPageNum),
        hasPreviousPage: pageNum > 1,
        hasNextPage: pageNum < Math.ceil(totalItems / perPageNum)
      }
    });
  } catch (err) {
    next(err);
  }
};
