import Contact from '../models/contactModel.js';

const getAll = async () => {
  try {
    const contacts = await Contact.find();
    return contacts; 
  } catch (error) {
    throw new Error('Unable to retrieve contacts: ' + error.message);
  }
};

const getById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    throw new Error('Unable to retrieve contact: ' + error.message);
  }
};

const addContact = async (contactData) => {
  const newContact = new Contact(contactData);
  return await newContact.save();
};

const deleteContact = async (id) => {
  try {
    const contact = await Contact.findByIdAndDelete(id);
    return contact;
  } catch (error) {
    throw new Error('Unable to delete contact: ' + error.message);
  }
};

const updateContact = async (id, updateData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedContact;
  } catch (error) {
    throw new Error('Unable to update contact: ' + error.message);
  }
};

export { getAll, getById, addContact, deleteContact, updateContact };
