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

// import express from 'express';
// import contactsRouter from './routers/contacts.js';

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


// import express from 'express';
// import contactsRouter from './routers/contacts.js';

// const setupServer = () => {
//   const app = express();

//   app.use(express.json());
//   app.use('/api', contactsRouter);

//   // Middleware для обробки 404
//   app.use((req, res) => {
//     res.status(404).json({ message: 'Not found' });
//   });

//   // Оголошуємо PORT тільки один раз
//   const PORT = process.env.PORT || 3000;

//   // Запуск сервера з обробкою помилок
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   }).on('error', (err) => {
//     console.error(`Error starting server on port ${PORT}:`, err.message);
//   });
// };

// export default setupServer;

// console.log('Server setup complete.');
// console.log(`Using port: ${process.env.PORT || 3000}`);
// console.log(`Using port from environment: ${process.env.PORT}`);
// console.log('Environment variables:', process.env);
// console.log('agan this comand?')


// import express from 'express';
// import contactsRouter from './routers/contacts.js';

// const setupServer = () => {
//   const app = express();

//   app.use(express.json());
//   app.use('/api', contactsRouter);

//   // Middleware для обробки 404
//   app.use((req, res) => {
//     res.status(404).json({ message: 'Not found' });
//   });

//   // Силове коректування PORT
//   const PORT = isNaN(Number(process.env.PORT)) ? 3000 : Number(process.env.PORT);

//   // Запуск сервера з обробкою помилок
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   }).on('error', (err) => {
//     console.error(`Error starting server on port ${PORT}:`, err.message);
//   });
// };

// export default setupServer;

// // Діагностика
// console.log('Server setup complete.');
// console.log(`RAW PORT value: ${process.env.PORT}`);
// console.log(`Processed PORT value: ${isNaN(Number(process.env.PORT)) ? 3000 : Number(process.env.PORT)}`);

// import express from 'express';
// import contactsRouter from './routers/contacts.js';
// import notFoundHandler from './middlewares/notFoundHandler.js';
// import errorHandler from './middlewares/errorHandler.js'; // Імпорт middleware обробки помилок

// const setupServer = () => {
//   const app = express();

//   app.use(express.json());
//   app.use('/api', contactsRouter);

//   // Middleware для обробки 404 (видаляємо ручний `res.status(404)` і замінюємо `notFoundHandler`)
//   app.use(notFoundHandler); // Для обробки неіснуючих маршрутів
  
//   // Middleware для обробки помилок
//   app.use(errorHandler);

//   // Силове коректування PORT
//   const PORT = isNaN(Number(process.env.PORT)) ? 3000 : Number(process.env.PORT);

//   // Запуск сервера з обробкою помилок
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   }).on('error', (err) => {
//     console.error(`Error starting server on port ${PORT}:`, err.message);
//   });

//   console.log('Server setup complete.');
//   console.log(`RAW PORT value: ${process.env.PORT}`);
//   console.log(`Processed PORT value: ${PORT}`);
// };

// export default setupServer;

// console.log('Server setup complete.?.');

import express from 'express';
import contactsRouter from './routers/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use('/api', contactsRouter); // Додаємо префікс до маршруту

  // Middleware для обробки неіснуючих маршрутів
  app.use(notFoundHandler);

  // Middleware для обробки помилок
  app.use(errorHandler);

  const PORT = isNaN(Number(process.env.PORT)) ? 3000 : Number(process.env.PORT);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }).on('error', (err) => {
    console.error(`Error starting server on port ${PORT}:`, err.message);
  });

  console.log('Server setup complete.');
};

export default setupServer;
