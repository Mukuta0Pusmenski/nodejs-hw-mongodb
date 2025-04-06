// import mongoose from 'mongoose';

// const contactSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//     },
//     isFavourite: {
//       type: Boolean,
//       default: false,
//     },
//     contactType: {
//       type: String,
//       enum: ['work', 'home', 'personal'],
//       required: true,
//       default: 'personal',
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Contact = mongoose.model('Contact', contactSchema);

// export default Contact;

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

const contacts = []; // Простий масив для демонстрації. Замініть на базу даних.

const addContact = async (contactData) => {
  const newContact = {
    id: contacts.length + 1, // Автоматичне генерування ID
    ...contactData,
  };
  contacts.push(newContact); // Додаємо до списку
  return newContact;
};

const deleteContact = async (id) => {
  try {
    const contact = await Contact.findByIdAndDelete(id); // Видалення контакту через модель
    return contact; // Повертаємо видалений контакт або null, якщо не знайдено
  } catch (error) {
    throw new Error('Unable to delete contact: ' + error.message);
  }
};


// export { addContact };


// Експорт функцій
// export { getAll, getById };

export { getAll, getById, addContact, deleteContact };
