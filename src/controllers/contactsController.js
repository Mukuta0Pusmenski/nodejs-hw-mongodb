import createError from 'http-errors';
import { fetchContacts, getById, addContact, updateContact, deleteContact } from '../services/contacts.js';

const getAllContacts = async (req, res) => {
  try {
    const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;

    const { contacts, totalItems } = await fetchContacts(page, perPage, sortBy, sortOrder, type, isFavourite);

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
  try {
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
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contact', error: error.message });
  }
};

const createContact = async (req, res) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create contact', error: error.message });
  }
};

const updateContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);

    if (!updatedContact) {
      throw createError(404, "Contact not found");
    }

    res.status(200).json({
      status: 200,
      message: `Successfully updated contact with id ${contactId}!`,
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update contact', error: error.message });
  }
};

const deleteContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await deleteContact(contactId);

    if (!deletedContact) {
      throw createError(404, "Contact not found");
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contact', error: error.message });
  }
};

export {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
};
