const express = require('express');
const { getAllContacts, getContactById } = require('./controllers/contactsController');
const getEnvVar = require('./utils/getEnvVar'); // Утиліта для змінних середовища

const setupServer = () => {
  const app = express();

  // Middleware для роботи з JSON
  app.use(express.json());

  // Реєстрація маршрутів
  app.get('/contacts', getAllContacts);
  app.get('/contacts/:contactId', getContactById);

  // Обробка неіснуючих маршрутів
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = setupServer; // Експорт функції setupServer
