
// // // // import Contact from '../models/contact.js';

// // // // export const listContacts = async (ownerId, { page=1, limit=20, sortBy='name', sortOrder='asc' }) => {
// // // //   const filter = { owner: ownerId };
// // // //   const skip   = (page - 1) * limit;
// // // //   const sort   = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

// // // //   const totalItems = await Contact.countDocuments(filter);
// // // //   const contacts   = await Contact.find(filter)
// // // //     .sort(sort)
// // // //     .skip(skip)
// // // //     .limit(limit);

// // // //   return { contacts, totalItems };
// // // // };

// // // // export const getContactById = (id, ownerId) =>
// // // //   Contact.findOne({ _id: id, owner: ownerId });

// // // // export const addContact = (data, ownerId) =>
// // // //   Contact.create({ ...data, owner: ownerId });

// // // // export const updateContact = (id, data, ownerId) =>
// // // //   Contact.findOneAndUpdate(
// // // //     { _id: id, owner: ownerId },
// // // //     data,
// // // //     { new: true, runValidators: true }
// // // //   );

// // // // export const removeContact = (id, ownerId) =>
// // // //   Contact.findOneAndDelete({ _id: id, owner: ownerId });
// // // import Contact from '../models/contact.js';

// // // export const fetchContacts = async (userId, { page, perPage, sortBy, sortOrder, isFavourite, contactType }) => {
// // //   const filter = { userId };
// // //   if (isFavourite !== undefined) filter.isFavourite = isFavourite;
// // //   if (contactType) filter.contactType = contactType;

// // //   const docs = await Contact.find(filter)
// // //     .sort(sortBy ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 } : {})
// // //     .skip((page - 1) * perPage)
// // //     .limit(perPage);

// // //   const total = await Contact.countDocuments(filter);
// // //   return {
// // //     contacts: docs,
// // //     page, perPage,
// // //     totalItems: total,
// // //     totalPages: Math.ceil(total / perPage)
// // //   };
// // // };

// // // export const getById = async (id, userId) =>
// // //   Contact.findOne({ _id: id, userId });

// // // export const addContact = async data =>
// // //   Contact.create(data);

// // // export const updateContact = async (id, data, userId) =>
// // //   Contact.findOneAndUpdate({ _id: id, userId }, data, { new: true });

// // // export const deleteContact = async (id, userId) =>
// // //   Contact.findOneAndDelete({ _id: id, userId });
// // // src/services/contacts.js

// // import Contact from '../models/contact.js';

// // export const fetchContacts = async (userId, { page, perPage, sortBy, sortOrder, isFavourite, contactType }) => {
// //   const pageNum   = Number(page);
// //   const perPageNum= Number(perPage);
// //   const filter    = { userId };
// //   if (isFavourite !== undefined) filter.isFavourite = isFavourite;
// //   if (contactType) filter.contactType = contactType;

// //   const docs = await Contact.find(filter)
// //     .sort(sortBy ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 } : {})
// //     .skip((pageNum - 1) * perPageNum)
// //     .limit(perPageNum);

// //   const totalItems = await Contact.countDocuments(filter);

// //   return { contacts: docs, totalItems, page: pageNum, perPage: perPageNum };
// // };
// // src/services/contacts.js
// import createError from 'http-errors';
// import Contact from '../models/contact.js';

// /**
//  * Повертає відфільтрований, відсортований і посторінково нарізаний список контактів
//  */
// export const fetchContacts = async (
//   userId,
//   { page = 1, perPage = 10, sortBy, sortOrder, isFavourite, contactType }
// ) => {
//   const pageNum    = Number(page);
//   const perPageNum = Number(perPage);
//   const filter     = { userId };

//   if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';
//   if (contactType) filter.contactType = contactType;

//   const docs = await Contact.find(filter)
//     .sort(sortBy ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 } : {})
//     .skip((pageNum - 1) * perPageNum)
//     .limit(perPageNum);

//   const totalItems = await Contact.countDocuments(filter);
//   return { docs, totalItems, page: pageNum, perPage: perPageNum };
// };

// /**
//  * Повертає один контакт за id і userId
//  */
// export const getById = async (id, userId) => {
//   const contact = await Contact.findOne({ _id: id, userId });
//   if (!contact) {
//     throw createError(404, 'Contact not found');
//   }
//   return contact;
// };

// /**
//  * Створює новий контакт
//  */
// export const addContact = async body => {
//   return Contact.create(body);
// };

// /**
//  * Оновлює контакт за id і userId
//  */
// export const updateContact = async (id, update, userId) => {
//   const contact = await Contact.findOneAndUpdate(
//     { _id: id, userId },
//     update,
//     { new: true }
//   );
//   if (!contact) {
//     throw createError(404, 'Contact not found');
//   }
//   return contact;
// };

// /**
//  * Видаляє контакт за id і userId
//  */
// export const deleteContact = async (id, userId) => {
//   const contact = await Contact.findOneAndRemove({ _id: id, userId });
//   if (!contact) {
//     throw createError(404, 'Contact not found');
//   }
//   return contact;
// };
import createError from 'http-errors';
import Contact from '../models/contact.js';

/**
 * Повертає відфільтрований, відсортований і посторінково нарізаний список контактів
 */
export const fetchContacts = async (
  userId,
  { page = 1, perPage = 10, sortBy, sortOrder, isFavourite, contactType }
) => {
  const pageNum    = Number(page);
  const perPageNum = Number(perPage);
  const filter     = { userId };

  if (isFavourite !== undefined) {
    filter.isFavourite = isFavourite === 'true';
  }
  if (contactType) {
    filter.contactType = contactType;
  }

  const docs = await Contact.find(filter)
    .sort(sortBy ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 } : {})
    .skip((pageNum - 1) * perPageNum)
    .limit(perPageNum);

  const totalItems = await Contact.countDocuments(filter);

  // Повертаємо ключ contacts, як очікує контролер
  return {
    contacts: docs,
    totalItems,
    page: pageNum,
    perPage: perPageNum
  };
};

/**
 * Повертає один контакт за id і userId
 */
export const getById = async (id, userId) => {
  const contact = await Contact.findOne({ _id: id, userId });
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  return contact;
};

/**
 * Створює новий контакт
 */
export const addContact = async body => {
  return Contact.create(body);
};

/**
 * Оновлює контакт за id і userId
 */
export const updateContact = async (id, update, userId) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: id, userId },
    update,
    { new: true }
  );
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  return contact;
};

/**
 * Видаляє контакт за id і userId
 */
export const deleteContact = async (id, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: id, userId });
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  return contact;
};

