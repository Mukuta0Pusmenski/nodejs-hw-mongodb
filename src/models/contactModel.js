const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Ім'я контакту є обов'язковим
    },
    phoneNumber: {
      type: String,
      required: true, // Номер телефону обов'язковий
    },
    email: {
      type: String, // Електронна пошта, необов'язкова
      default: null,
    },
    isFavourite: {
      type: Boolean, // Чи є контакт улюбленим
      default: false,
    },
    contactType: {
      type: String, // Тип контакту: 'work', 'home', 'personal'
      enum: ['work', 'home', 'personal'], // Обмеження на типи
      required: true,
      default: 'personal', // За замовчуванням 'personal'
    },
  },
  {
    timestamps: true, // Автоматично додає поля createdAt та updatedAt
  }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
