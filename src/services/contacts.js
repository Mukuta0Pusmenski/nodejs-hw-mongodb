const Contact = require('../models/contactModel');

const getAll = async () => {
  try {
    const contacts = await Contact.find();
    console.log('Contacts retrieved:', contacts);
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

module.exports = {
  getAll,
  getById,
}; // Експорт функцій сервісу
