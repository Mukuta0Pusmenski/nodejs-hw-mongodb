import Contact from '../models/Contact.js';

export const getAll = async () => {
  return await Contact.find();
};

export const getById = async (id) => {
  return await Contact.findById(id);
};

export const addContact = async (contactData) => {
  const newContact = new Contact(contactData);
  return await newContact.save();
};

export const updateContact = async (id, contactData) => {
  return await Contact.findByIdAndUpdate(id, contactData, { new: true });
};

export const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};
