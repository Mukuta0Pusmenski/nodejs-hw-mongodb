// // import Contact from '../models/contactModel.js';

// // const getAll = async () => {
// //   try {
// //     const contacts = await Contact.find();
// //     return contacts;
// //   } catch (error) {
// //     throw new Error('Unable to retrieve contacts: ' + error.message);
// //   }
// // };

// // const getById = async (id) => {
// //   try {
// //     const contact = await Contact.findById(id);
// //     return contact;
// //   } catch (error) {
// //     throw new Error('Unable to retrieve contact: ' + error.message);
// //   }
// // };

// // const addContact = async (contactData) => {
// //   const newContact = new Contact(contactData);
// //   return await newContact.save();
// // };

// // const deleteContact = async (id) => {
// //   try {
// //     const contact = await Contact.findByIdAndDelete(id);
// //     return contact;
// //   } catch (error) {
// //     throw new Error('Unable to delete contact: ' + error.message);
// //   }
// // };

// // const updateContact = async (id, updateData) => {
// //   try {
// //     const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
// //       new: true,
// //       runValidators: true,
// //     });

// //     return updatedContact;
// //   } catch (error) {
// //     throw new Error('Unable to update contact: ' + error.message);
// //   }
// // };

// // const fetchContacts = async (page, perPage, sortBy, sortOrder, type, isFavourite) => {
// //   const filter = {};
// //   if (type) filter.contactType = type;
// //   if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

// //   const totalItems = await Contact.countDocuments(filter);

// //   const contacts = await Contact.find(filter)
// //     .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
// //     .skip((page - 1) * perPage)
// //     .limit(Number(perPage));

// //   return { contacts, totalItems };
// // };

// // export { getAll, getById, addContact, deleteContact, updateContact, fetchContacts };
// import Contact from '../models/contact.js';

// export const listContacts = async (
//   ownerId,
//   { page = 1, limit = 20, sortBy = 'name', sortOrder = 'asc' }
// ) => {
//   const filter = { owner: ownerId };
//   const skip   = (page - 1) * limit;
//   const sort   = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

//   const totalItems = await Contact.countDocuments(filter);
//   const contacts   = await Contact.find(filter)
//     .sort(sort)
//     .skip(skip)
//     .limit(limit);

//   return { contacts, totalItems };
// };

// export const getContactById = async (contactId, ownerId) => {
//   return await Contact.findOne({ _id: contactId, owner: ownerId });
// };

// export const addContact = async (data, ownerId) => {
//   return await Contact.create({ ...data, owner: ownerId });
// };

// export const updateContact = async (contactId, data, ownerId) => {
//   return await Contact.findOneAndUpdate(
//     { _id: contactId, owner: ownerId },
//     data,
//     { new: true, runValidators: true }
//   );
// };

// export const removeContact = async (contactId, ownerId) => {
//   return await Contact.findOneAndDelete({ _id: contactId, owner: ownerId });
// };

import Contact from '../models/contact.js';

export const listContacts = async (ownerId, { page=1, limit=20, sortBy='name', sortOrder='asc' }) => {
  const filter = { owner: ownerId };
  const skip   = (page - 1) * limit;
  const sort   = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const totalItems = await Contact.countDocuments(filter);
  const contacts   = await Contact.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return { contacts, totalItems };
};

export const getContactById = (id, ownerId) =>
  Contact.findOne({ _id: id, owner: ownerId });

export const addContact = (data, ownerId) =>
  Contact.create({ ...data, owner: ownerId });

export const updateContact = (id, data, ownerId) =>
  Contact.findOneAndUpdate(
    { _id: id, owner: ownerId },
    data,
    { new: true, runValidators: true }
  );

export const removeContact = (id, ownerId) =>
  Contact.findOneAndDelete({ _id: id, owner: ownerId });
