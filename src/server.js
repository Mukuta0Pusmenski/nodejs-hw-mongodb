// import express from 'express';
// import { getAllContacts, getContactById } from './controllers/contactsController.js';

// const setupServer = () => {
//   const app = express();

//   app.use(express.json());
//   app.get('/contacts', getAllContacts);
//   app.get('/contacts/:contactId', getContactById);
//   app.use((req, res) => {
//     res.status(404).json({ message: 'Not found' });
//   });

//   const PORT = process.env.PORT;

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };

// export default setupServer;


// console.log('Server setup complete.'); // This line is for debugging purposes

import express from 'express';
import contactsRouter from './routers/contacts.js';

const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use('/api', contactsRouter);

  // Middleware для обробки 404
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;

console.log('Server setup complete.');
console.log('Server setup complete?.'); // This line is for debugging purposes