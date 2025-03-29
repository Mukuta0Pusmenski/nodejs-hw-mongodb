const express = require('express');
const { getAllContacts, getContactById } = require('./controllers/contactsController');

const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.get('/contacts', getAllContacts);
  app.get('/contacts/:contactId', getContactById);
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = setupServer;
