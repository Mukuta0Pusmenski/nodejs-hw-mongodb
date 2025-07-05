
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
