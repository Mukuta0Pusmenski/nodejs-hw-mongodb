import express from 'express';
import { getAllContacts, getContactById } from './controllers/contactsController.js';

const setupServer = () => {
  const app = express();

  // Middleware for working with JSON
  app.use(express.json());

  // Register routes
  app.get('/contacts', getAllContacts);
  app.get('/contacts/:contactId', getContactById);

  // Handle non-existing routes
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

setupServer();
