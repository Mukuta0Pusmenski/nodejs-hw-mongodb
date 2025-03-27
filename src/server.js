const express = require('express');
const contactsController = require('./controllers/contactsController');
const initMongoConnection = require('./db/initMongoConnection');

const setupServer = async () => {
  // Ініціалізуємо підключення до MongoDB
  await initMongoConnection();

 const app = express();

// Middleware для роботи з JSON
app.use(express.json());

// Реєстрація маршрутів
app.get('/contacts', contactsController.getAllContacts);
app.get('/contacts/:contactId', contactsController.getContactById);

// Обробка неіснуючих маршрутів
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});


  // Запускаємо сервер
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

};

module.exports = setupServer;
