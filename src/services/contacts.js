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

// Експорт функцій
export { getAll, getById };
