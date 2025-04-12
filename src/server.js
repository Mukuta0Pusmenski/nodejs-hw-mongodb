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

// const setupServer = () => {
//   const app = express();

//   app.use(express.json());
//   app.use('/api', contactsRouter);

//   // Middleware для обробки 404
//   app.use((req, res) => {
//     res.status(404).json({ message: 'Not found' });
//   });

// const setupServer = () => {
//   const app = express();

//   app.use(express.json());
//   app.use('/api', contactsRouter);

//   // Middleware для 404
//   app.use((req, res) => {
//     res.status(404).json({ message: 'Not found' });
//   });

//   // const PORT = process.env.PORT || 3000;
//   // app.listen(PORT, () => {
//   //   console.log(`Server is running on port ${PORT}`);
//   // });



//   // const PORT = process.env.PORT;
// const PORT = process.env.PORT || 3000; // Оголошуємо тільки один раз у потрібному контексті

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });






//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// }).on('error', (err) => {
//   console.error('Error starting server:', err.message);
// });


// export default setupServer;

// console.log('Server setup complete.');
// console.log('Server setup complete?.'); // This line is for debugging purposes # PORT=3000
// console.log('not Server setup complete!!');
// console.log(`Using port: ${process.env.PORT || 3000}`);


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

  // Оголошуємо PORT тільки один раз
  const PORT = process.env.PORT || 3000;

  // Запуск сервера з обробкою помилок
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }).on('error', (err) => {
    console.error(`Error starting server on port ${PORT}:`, err.message);
  });
};

export default setupServer;

console.log('Server setup complete.');
console.log(`Using port: ${process.env.PORT || 3000}`);
