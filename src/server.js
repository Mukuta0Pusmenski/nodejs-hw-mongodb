const express = require('express');
const contactsController = require('./controllers/contactsController');

const setupServer = () => {
  const app = express();

  // Middleware for working with JSON
  app.use(express.json());

  // Register routes
  app.get('/contacts', contactsController.getAllContacts);
  app.get('/contacts/:contactId', contactsController.getContactById);

  // Handle non-existing routes
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = setupServer;


// хулі тут використовується async/await, якщо ніде не використовується async/await?
// виправив