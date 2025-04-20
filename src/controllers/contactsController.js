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

