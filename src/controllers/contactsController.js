// // // import createError from 'http-errors';
// // // import { fetchContacts, getById, addContact, updateContact, deleteContact } from '../services/contacts.js';

// // // const getAllContacts = async (req, res) => {
// // //   try {
// // //     const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;

// // //     const { contacts, totalItems } = await fetchContacts(page, perPage, sortBy, sortOrder, type, isFavourite);

// // //     res.status(200).json({
// // //       status: 200,
// // //       message: 'Successfully found contacts!',
// // //       data: {
// // //         data: contacts,
// // //         page: Number(page),
// // //         perPage: Number(perPage),
// // //         totalItems,
// // //         totalPages: Math.ceil(totalItems / perPage),
// // //         hasPreviousPage: Number(page) > 1,
// // //         hasNextPage: Number(page) * Number(perPage) < totalItems,
// // //       },
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Failed to retrieve contacts', error: error.message });
// // //   }
// // // };

// // // const getContactById = async (req, res) => {
// // //   try {
// // //     const { contactId } = req.params;
// // //     const contact = await getById(contactId);

// // //     if (!contact) {
// // //       throw createError(404, "Contact not found");
// // //     }

// // //     res.status(200).json({
// // //       status: 200,
// // //       message: `Successfully found contact with id ${contactId}!`,
// // //       data: contact,
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Failed to retrieve contact', error: error.message });
// // //   }
// // // };

// // // const createContact = async (req, res) => {
// // //   try {
// // //     const newContact = await addContact(req.body);
// // //     res.status(201).json({
// // //       status: 201,
// // //       message: 'Successfully created a contact!',
// // //       data: newContact,
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Failed to create contact', error: error.message });
// // //   }
// // // };

// // // const updateContactById = async (req, res) => {
// // //   try {
// // //     const { contactId } = req.params;
// // //     const updatedContact = await updateContact(contactId, req.body);

// // //     if (!updatedContact) {
// // //       throw createError(404, "Contact not found");
// // //     }

// // //     res.status(200).json({
// // //       status: 200,
// // //       message: `Successfully updated contact with id ${contactId}!`,
// // //       data: updatedContact,
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Failed to update contact', error: error.message });
// // //   }
// // // };

// // // const deleteContactById = async (req, res) => {
// // //   try {
// // //     const { contactId } = req.params;
// // //     const deletedContact = await deleteContact(contactId);

// // //     if (!deletedContact) {
// // //       throw createError(404, "Contact not found");
// // //     }

// // //     res.status(204).send();
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Failed to delete contact', error: error.message });
// // //   }
// // // };

// // // export {
// // //   getAllContacts,
// // //   getContactById,
// // //   createContact,
// // //   updateContactById,
// // //   deleteContactById,
// // // };
// // import createError from 'http-errors';
// // import * as contactsService from '../services/contacts.js';

// // export const listContacts = async (req, res, next) => {
// //   try {
// //     const { page, limit, sortBy, sortOrder } = req.query;
// //     const { contacts, totalItems } = await contactsService.listContacts(
// //       req.user._id,
// //       {
// //         page: Number(page) || 1,
// //         limit: Number(limit) || 20,
// //         sortBy,
// //         sortOrder
// //       }
// //     );

// //     res.json({
// //       status: 200,
// //       message: 'Contacts retrieved successfully',
// //       data: {
// //         contacts,
// //         page: Number(page) || 1,
// //         perPage: Number(limit) || 20,
// //         totalItems,
// //         totalPages: Math.ceil(totalItems / (Number(limit) || 20)),
// //         hasPreviousPage: (Number(page) || 1) > 1,
// //         hasNextPage:
// //           (Number(page) || 1) * (Number(limit) || 20) < totalItems
// //       }
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const getContact = async (req, res, next) => {
// //   try {
// //     const contact = await contactsService.getContactById(
// //       req.params.id,
// //       req.user._id
// //     );
// //     if (!contact) throw createError(404, 'Contact not found');

// //     res.json({
// //       status: 200,
// //       message: 'Contact found',
// //       data: contact
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const createContact = async (req, res, next) => {
// //   try {
// //     const newContact = await contactsService.addContact(
// //       req.body,
// //       req.user._id
// //     );
// //     res.status(201).json({
// //       status: 201,
// //       message: 'Contact created',
// //       data: newContact
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const updateContact = async (req, res, next) => {
// //   try {
// //     const updated = await contactsService.updateContact(
// //       req.params.id,
// //       req.body,
// //       req.user._id
// //     );
// //     if (!updated) throw createError(404, 'Contact not found');

// //     res.json({
// //       status: 200,
// //       message: 'Contact updated',
// //       data: updated
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const deleteContact = async (req, res, next) => {
// //   try {
// //     const deleted = await contactsService.removeContact(
// //       req.params.id,
// //       req.user._id
// //     );
// //     if (!deleted) throw createError(404, 'Contact not found');

// //     res.status(204).send();
// //   } catch (err) {
// //     next(err);
// //   }
// // };
// import createError from 'http-errors';
// import * as contactsService from '../services/contacts.js';

// export const listContacts = async (req, res, next) => {
//   try {
//     const { page, limit, sortBy, sortOrder } = req.query;
//     const { contacts, totalItems } = await contactsService.listContacts(
//       req.user._id,
//       {
//         page: Number(page) || 1,
//         limit: Number(limit) || 20,
//         sortBy,
//         sortOrder
//       }
//     );

//     res.json({
//       status: 200,
//       message: 'Contacts retrieved successfully',
//       data: {
//         contacts,
//         page: Number(page) || 1,
//         perPage: Number(limit) || 20,
//         totalItems,
//         totalPages: Math.ceil(totalItems / (Number(limit) || 20)),
//         hasPreviousPage: (Number(page) || 1) > 1,
//         hasNextPage:
//           (Number(page) || 1) * (Number(limit) || 20) < totalItems
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const getContact = async (req, res, next) => {
//   try {
//     const contact = await contactsService.getContactById(
//       req.params.id,
//       req.user._id
//     );
//     if (!contact) throw createError(404, 'Contact not found');

//     res.json({
//       status: 200,
//       message: 'Contact found',
//       data: contact
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const createContact = async (req, res, next) => {
//   try {
//     const newContact = await contactsService.addContact(
//       req.body,
//       req.user._id
//     );
//     res.status(201).json({
//       status: 201,
//       message: 'Contact created',
//       data: newContact
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const updateContact = async (req, res, next) => {
//   try {
//     const updated = await contactsService.updateContact(
//       req.params.id,
//       req.body,
//       req.user._id
//     );
//     if (!updated) throw createError(404, 'Contact not found');

//     res.json({
//       status: 200,
//       message: 'Contact updated',
//       data: updated
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const deleteContact = async (req, res, next) => {
//   try {
//     const deleted = await contactsService.removeContact(
//       req.params.id,
//       req.user._id
//     );
//     if (!deleted) throw createError(404, 'Contact not found');

//     res.status(204).send();
//   } catch (err) {
//     next(err);
//   }
// };
import createError from 'http-errors';
import * as service from '../services/contacts.js';

export const listContacts = async (req, res, next) => {
  try {
    const { page, limit, sortBy, sortOrder } = req.query;
    const { contacts, totalItems } = await service.listContacts(
      req.user._id,
      {
        page: Number(page) || 1,
        limit: Number(limit) || 20,
        sortBy,
        sortOrder
      }
    );
    res.json({
      status: 200,
      message: 'Contacts retrieved successfully',
      data: {
        contacts,
        page: Number(page) || 1,
        perPage: Number(limit) || 20,
        totalItems,
        totalPages: Math.ceil(totalItems / (Number(limit) || 20)),
        hasPreviousPage: (Number(page) || 1) > 1,
        hasNextPage: (Number(page) || 1) * (Number(limit) || 20) < totalItems
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const contact = await service.getContactById(req.params.id, req.user._id);
    if (!contact) throw createError(404, 'Contact not found');
    res.json({ status: 200, message: 'Contact found', data: contact });
  } catch (err) {
    next(err);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newC = await service.addContact(req.body, req.user._id);
    res.status(201).json({ status: 201, message: 'Contact created', data: newC });
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const updated = await service.updateContact(req.params.id, req.body, req.user._id);
    if (!updated) throw createError(404, 'Contact not found');
    res.json({ status: 200, message: 'Contact updated', data: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const deleted = await service.removeContact(req.params.id, req.user._id);
    if (!deleted) throw createError(404, 'Contact not found');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
