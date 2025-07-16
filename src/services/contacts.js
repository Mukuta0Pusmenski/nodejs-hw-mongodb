

import Contact from '../models/contact.js';

export const fetchContacts = async (userId, { page, perPage, sortBy, sortOrder, isFavourite, contactType }) => {
  const filter = { userId };
  if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';
  if (contactType) filter.contactType = contactType;

  const skip = (page - 1) * perPage;
  const sortOptions = sortBy ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 } : {};

  const contacts = await Contact.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(perPage)
    .lean();

  const totalItems = await Contact.countDocuments(filter);

  return { contacts, totalItems, page, perPage };
};

export const getById = async (id, userId) =>
  Contact.findOne({ _id: id, userId }).lean();

export const addContact = async data => {
  const newContact = new Contact(data);
  return newContact.save();
};

export const updateContact = async (id, data) =>
  Contact.findOneAndUpdate({ _id: id, userId: data.userId }, data, { new: true }).lean();

export const deleteContact = async (id, userId) =>
  Contact.findOneAndDelete({ _id: id, userId }).lean();
