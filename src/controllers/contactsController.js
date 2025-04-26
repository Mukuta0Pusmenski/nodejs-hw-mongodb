// import createError from 'http-errors';
// import { getAll, getById, addContact, updateContact, deleteContact } from '../services/contacts.js';

// const getAllContacts = async (req, res) => {
//   try {
//     const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;

//     let totalItems = await getAll(); // Отримуємо всі контакти

//     // Фільтруємо контакти за `contactType` та `isFavourite`
//     if (type) {
//       totalItems = totalItems.filter(contact => contact.contactType === type);
//     }
//     if (isFavourite !== undefined) {
//       const isFavBoolean = isFavourite === 'true';
//       totalItems = totalItems.filter(contact => contact.isFavourite === isFavBoolean);
//     }

//     const totalCount = totalItems.length;

//     // Сортуємо відфільтровані контакти
//     const sortedContacts = totalItems.sort((a, b) => {
//       return sortOrder === 'asc' ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
//     });

//     // Пагінуємо відсортовані контакти
//     const contacts = sortedContacts.slice((page - 1) * perPage, (page - 1) * perPage + Number(perPage));

//     res.status(200).json({
//       status: 200,
//       message: 'Successfully found contacts!',
//       data: {
//         data: contacts,
//         page: Number(page),
//         perPage: Number(perPage),
//         totalItems: totalCount,
//         totalPages: Math.ceil(totalCount / perPage),
//         hasPreviousPage: Number(page) > 1,
//         hasNextPage: Number(page) * Number(perPage) < totalCount,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve contacts', error: error.message });
//   }
// };

// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await getById(contactId);

//   if (!contact) {
//     throw createError(404, "Contact not found");
//   }

//   res.status(200).json({
//     status: 200,
//     message: `Successfully found contact with id ${contactId}!`,
//     data: contact,
//   });
// };

// const createContact = async (req, res) => {
//   const newContact = await addContact(req.body); // База повертає створений контакт
//   res.status(201).json({
//     status: 201,
//     message: 'Successfully created a contact!',
//     data: newContact, // Повертаємо об'єкт створеного контакту
//   });
// };

// const updateContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const updatedContact = await updateContact(contactId, req.body); // База повертає оновлений контакт

//   if (!updatedContact) {
//     throw createError(404, "Contact not found");
//   }

//   res.status(200).json({
//     status: 200,
//     message: `Successfully updated contact with id ${contactId}!`,
//     data: updatedContact, // Повертаємо оновлений контакт
//   });
// };

// const deleteContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const deletedContact = await deleteContact(contactId); // База повертає видалений контакт

//   if (!deletedContact) {
//     throw createError(404, "Contact not found");
//   }

//   res.status(204).send(); // Без тіла відповіді
// };

// export {
//   getAllContacts,
//   getContactById,
//   createContact,
//   updateContactById,
//   deleteContactById,
// };


// import createError from 'http-errors';
// import Contact from '../models/contact.js';
// import { getById, addContact, updateContact, deleteContact } from '../services/contacts.js';

// const getAllContacts = async (req, res) => {
//   try {
//     const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;

//     const filter = {}; // Підготовка фільтрів для MongoDB
//     if (type) filter.contactType = type;
//     if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

//     // Отримуємо загальну кількість елементів з урахуванням фільтрів
//     const totalItems = await Contact.countDocuments(filter);

//     // Запит до MongoDB з фільтрацією, сортуванням і пагінацією
//     const contacts = await Contact.find(filter)
//       .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 }) // Сортування в MongoDB
//       .skip((page - 1) * perPage) // Пагінація
//       .limit(Number(perPage)); // Кількість елементів на сторінку

//     res.status(200).json({
//       status: 200,
//       message: 'Successfully found contacts!',
//       data: {
//         data: contacts,
//         page: Number(page),
//         perPage: Number(perPage),
//         totalItems,
//         totalPages: Math.ceil(totalItems / perPage),
//         hasPreviousPage: Number(page) > 1,
//         hasNextPage: Number(page) * Number(perPage) < totalItems,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve contacts', error: error.message });
//   }
// };

// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await getById(contactId);

//   if (!contact) {
//     throw createError(404, "Contact not found");
//   }

//   res.status(200).json({
//     status: 200,
//     message: `Successfully found contact with id ${contactId}!`,
//     data: contact,
//   });
// };

// const createContact = async (req, res) => {
//   const newContact = await addContact(req.body); // База повертає створений контакт
//   res.status(201).json({
//     status: 201,
//     message: 'Successfully created a contact!',
//     data: newContact, // Повертаємо об'єкт створеного контакту
//   });
// };

// const updateContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const updatedContact = await updateContact(contactId, req.body); // База повертає оновлений контакт

//   if (!updatedContact) {
//     throw createError(404, "Contact not found");
//   }

//   res.status(200).json({
//     status: 200,
//     message: `Successfully updated contact with id ${contactId}!`,
//     data: updatedContact, // Повертаємо оновлений контакт
//   });
// };

// const deleteContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const deletedContact = await deleteContact(contactId); // База повертає видалений контакт

//   if (!deletedContact) {
//     throw createError(404, "Contact not found");
//   }

//   res.status(204).send(); // Без тіла відповіді
// };

// export {
//   getAllContacts,
//   getContactById,
//   createContact,
//   updateContactById,
//   deleteContactById,
// };

import createError from 'http-errors';
import Contact from '../models/contact.js'; // ✅ Переконайся, що `models/contact.js` експортує `export default Contact`
import { getById, addContact, updateContact, deleteContact } from '../services/contacts.js';

const getAllContacts = async (req, res) => {
  try {
    const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;

    const filter = {}; // Підготовка фільтрів для MongoDB
    if (type) filter.contactType = type;
    if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

    // Отримуємо загальну кількість елементів з урахуванням фільтрів
    const totalItems = await Contact.countDocuments(filter);

    // Запит до MongoDB з фільтрацією, сортуванням і пагінацією
    const contacts = await Contact.find(filter)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 }) // Сортування в MongoDB
      .skip((page - 1) * perPage) // Пагінація
      .limit(Number(perPage)); // Кількість елементів на сторінку

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts,
        page: Number(page),
        perPage: Number(perPage),
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        hasPreviousPage: Number(page) > 1,
        hasNextPage: Number(page) * Number(perPage) < totalItems,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contacts', error: error.message });
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getById(contactId);

  if (!contact) {
    throw createError(404, "Contact not found");
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

const createContact = async (req, res) => {
  const newContact = await addContact(req.body); // База повертає створений контакт
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact, // Повертаємо об'єкт створеного контакту
  });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body); // База повертає оновлений контакт

  if (!updatedContact) {
    throw createError(404, "Contact not found");
  }

  res.status(200).json({
    status: 200,
    message: `Successfully updated contact with id ${contactId}!`,
    data: updatedContact, // Повертаємо оновлений контакт
  });
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContact(contactId); // База повертає видалений контакт

  if (!deletedContact) {
    throw createError(404, "Contact not found");
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
