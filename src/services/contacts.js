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

// import Contact from '../models/contactModel.js';

// const getAll = async () => {
//   try {
//     const contacts = await Contact.find();
//     return contacts;
//   } catch (error) {
//     throw new Error('Unable to retrieve contacts: ' + error.message);
//   }
// };

// const getById = async (id) => {
//   try {
//     const contact = await Contact.findById(id);
//     return contact;
//   } catch (error) {
//     throw new Error('Unable to retrieve contact: ' + error.message);
//   }
// };

// const contacts = []; // Простий масив для демонстрації. Замініть на базу даних.

// // const addContact = async (contactData) => {
// //   const newContact = {
// //     id: contacts.length + 1, // Автоматичне генерування ID
// //     ...contactData,
// //   };
// //   contacts.push(newContact); // Додаємо до списку
// //   return newContact;
// // };

// export const addContact = async (contactData) => {
//   const newContact = new Contact(contactData);
//   return await newContact.save(); // Переконайся, що ID генерується базою
// };


// const deleteContact = async (id) => {
//   try {
//     const contact = await Contact.findByIdAndDelete(id); // Видалення контакту через модель
//     return contact; // Повертаємо видалений контакт або null, якщо не знайдено
//   } catch (error) {
//     throw new Error('Unable to delete contact: ' + error.message);
//   }
// };

// const updateContact = async (id, updateData) => {
//   try {
//     const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
//       new: true, // Повертає оновлений документ
//       runValidators: true, // Запускає валідацію моделі перед оновленням
//     });

//     return updatedContact; // Повертає оновлений контакт або null, якщо не знайдено
//   } catch (error) {
//     throw new Error('Unable to update contact: ' + error.message);
//   }
// };



// // export { addContact };


// // Експорт функцій
// // export { getAll, getById };

// export { getAll, getById, addContact, deleteContact, updateContact };


// import Contact from '../models/contactModel.js';

// // Отримання всіх контактів
// const getAll = async () => {
//   try {
//     const contacts = await Contact.find();
//     return contacts;
//   } catch (error) {
//     throw new Error('Unable to retrieve contacts: ' + error.message);
//   }
// };

// // Отримання контакту за ID
// const getById = async (id) => {
//   try {
//     const contact = await Contact.findById(id);
//     return contact;
//   } catch (error) {
//     throw new Error('Unable to retrieve contact: ' + error.message);
//   }
// };

// // Додавання нового контакту
// const addContact = async (contactData) => {
//   const newContact = new Contact(contactData);
//   return await newContact.save(); // MongoDB автоматично генерує ID
// };

// // Видалення контакту за ID
// const deleteContact = async (id) => {
//   try {
//     const contact = await Contact.findByIdAndDelete(id); // Видалення контакту через модель
//     return contact; // Повертаємо видалений контакт або null, якщо не знайдено
//   } catch (error) {
//     throw new Error('Unable to delete contact: ' + error.message);
//   }
// };

// // Оновлення контакту за ID
// const updateContact = async (id, updateData) => {
//   try {
//     const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
//       new: true, // Повертає оновлений документ
//       runValidators: true, // Запускає валідацію моделі перед оновленням
//     });

//     return updatedContact; // Повертає оновлений контакт або null, якщо не знайдено
//   } catch (error) {
//     throw new Error('Unable to update contact: ' + error.message);
//   }
// };

// // Експорт функцій
// export { getAll, getById, addContact, deleteContact, updateContact };

import Contact from '../models/contactModel.js';

// Отримання всіх контактів
const getAll = async () => {
  try {
    const contacts = await Contact.find();
    return contacts; // Повертаємо всі контакти, отримані з бази
  } catch (error) {
    throw new Error('Unable to retrieve contacts: ' + error.message);
  }
};

// Отримання контакту за ID
const getById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact; // Повертаємо контакт, знайдений базою
  } catch (error) {
    throw new Error('Unable to retrieve contact: ' + error.message);
  }
};

// Додавання нового контакту
const addContact = async (contactData) => {
  const newContact = new Contact(contactData);
  return await newContact.save(); // Повертаємо створений контакт
};

// Видалення контакту за ID
const deleteContact = async (id) => {
  try {
    const contact = await Contact.findByIdAndDelete(id);
    return contact; // Повертаємо видалений контакт або null, якщо не знайдено
  } catch (error) {
    throw new Error('Unable to delete contact: ' + error.message);
  }
};

// Оновлення контакту за ID
const updateContact = async (id, updateData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true, // Повертає оновлений документ
      runValidators: true, // Вмикає валідацію перед оновленням
    });

    return updatedContact; // Повертаємо оновлений контакт або null, якщо не знайдено
  } catch (error) {
    throw new Error('Unable to update contact: ' + error.message);
  }
};

// Експорт функцій
export { getAll, getById, addContact, deleteContact, updateContact };
