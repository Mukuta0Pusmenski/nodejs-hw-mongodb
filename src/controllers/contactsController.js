// import { getAll, getById } from '../services/contacts.js';

// const getAllContacts = async (req, res) => {
//   try {
//     const contacts = await getAll();
//     res.status(200).json({
//       status: 200,
//       message: 'Successfully found contacts!',
//       data: contacts,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// const getContactById = async (req, res) => {
//   try {
//     const { contactId } = req.params;
//     const contact = await getById(contactId);

//     if (!contact) {
//       return res.status(404).json({ message: 'Contact not found' });
//     }

//     res.status(200).json({
//       status: 200,
//       message: `Successfully found contact with id ${contactId}!`,
//       data: contact,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export { getAllContacts, getContactById };

// import { getAll, getById } from '../services/contacts.js';

// const getAllContacts = async (req, res) => {
//   try {
//     const contacts = await getAll();
//     res.status(200).json({
//       status: 200,
//       message: 'Successfully found contacts!',
//       data: contacts,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// const getContactById = async (req, res) => {
//   try {
//     const { contactId } = req.params;
//     const contact = await getById(contactId);

//     if (!contact) {
//       return res.status(404).json({ message: 'Contact not found' });
//     }

//     res.status(200).json({
//       status: 200,
//       message: `Successfully found contact with id ${contactId}!`,
//       data: contact,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export { getAllContacts, getContactById };

// import { getAll, getById, addContact, updateContact, deleteContact } from '../services/contacts.js';
// import ctrlWrapper from '../utils/ctrlWrapper.js'; // Обгортка для контролерів

// const getAllContacts = async (req, res) => {
//   const contacts = await getAll();
//   res.status(200).json({
//     status: 200,
//     message: 'Successfully found contacts!',
//     data: contacts,
//   });
// };

// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await getById(contactId);

//   if (!contact) {
//     res.status(404).json({ message: 'Contact not found' });
//     return;
//   }

//   res.status(200).json({
//     status: 200,
//     message: `Successfully found contact with id ${contactId}!`,
//     data: contact,
//   });
// };

// const createContact = async (req, res) => {
//   const newContact = await addContact(req.body); // Виклик сервісу
//   res.status(201).json({
//     status: 201,
//     message: 'Successfully created a contact!',
//     data: newContact,
//   });
// };


// const updateContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const updatedContact = await updateContact(contactId, req.body);

//   if (!updatedContact) {
//     res.status(404).json({ message: 'Contact not found' });
//     return;
//   }

//   res.status(200).json({
//     status: 200,
//     message: `Successfully updated contact with id ${contactId}!`,
//     data: updatedContact,
//   });
// };

// const deleteContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const deletedContact = await deleteContact(contactId);

//   if (!deletedContact) {
//     res.status(404).json({ message: 'Contact not found' });
//     return;
//   }

//   res.status(204).send(); // Без тіла відповіді
// };

// export {
//   ctrlWrapper(getAllContacts) as getAllContacts,
//   ctrlWrapper(getContactById) as getContactById,
//   ctrlWrapper(createContact) as createContact,
//   ctrlWrapper(updateContactById) as updateContactById,
//   ctrlWrapper(deleteContactById) as deleteContactById,
// };

// import { getAll, getById, addContact, updateContact, deleteContact } from '../services/contacts.js';
// import ctrlWrapper from '../utils/ctrlWrapper.js';

// // Обгортаємо функції без повторного оголошення імені
// const wrappedGetAllContacts = ctrlWrapper(async (req, res) => {
//   const contacts = await getAll();
//   res.status(200).json({
//     status: 200,
//     message: 'Successfully found contacts!',
//     data: contacts,
//   });
// });

// const wrappedGetContactById = ctrlWrapper(async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await getById(contactId);

//   if (!contact) {
//     res.status(404).json({ message: 'Contact not found' });
//     return;
//   }

//   res.status(200).json({
//     status: 200,
//     message: `Successfully found contact with id ${contactId}!`,
//     data: contact,
//   });
// });

// const wrappedCreateContact = ctrlWrapper(async (req, res) => {
//   const newContact = await addContact(req.body);
//   res.status(201).json({
//     status: 201,
//     message: 'Successfully created a contact!',
//     data: newContact,
//   });
// });

// const wrappedUpdateContactById = ctrlWrapper(async (req, res) => {
//   const { contactId } = req.params;
//   const updatedContact = await updateContact(contactId, req.body);

//   if (!updatedContact) {
//     res.status(404).json({ message: 'Contact not found' });
//     return;
//   }

//   res.status(200).json({
//     status: 200,
//     message: `Successfully updated contact with id ${contactId}!`,
//     data: updatedContact,
//   });
// });

// const wrappedDeleteContactById = ctrlWrapper(async (req, res) => {
//   const { contactId } = req.params;
//   const deletedContact = await deleteContact(contactId);

//   if (!deletedContact) {
//     res.status(404).json({ message: 'Contact not found' });
//     return;
//   }

//   res.status(204).send(); // Без тіла відповіді
// });

// // Експорт тільки обгорнутих функцій без конфліктів
// export {
//   wrappedGetAllContacts as getAllContacts,
//   wrappedGetContactById as getContactById,
//   wrappedCreateContact as createContact,
//   wrappedUpdateContactById as updateContactById,
//   wrappedDeleteContactById as deleteContactById,
// };


import createError from 'http-errors';
import { getAll, getById, addContact, updateContact, deleteContact } from '../services/contacts.js';

const getAllContacts = async (req, res) => {
  const contacts = await getAll();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getById(contactId);

  if (!contact) {
    throw createError(404, "Contact not found"); // Використання http-errors
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

const createContact = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);

  if (!updatedContact) {
    throw createError(404, "Contact not found"); // Використання http-errors
  }

  res.status(200).json({
    status: 200,
    message: `Successfully updated contact with id ${contactId}!`,
    data: updatedContact,
  });
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContact(contactId);

  if (!deletedContact) {
    throw createError(404, "Contact not found"); // Використання http-errors
  }

  res.status(204).send(); // Без тіла відповіді
};

export {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
};
