
import express from 'express';
import contactsRouter from './routers/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(contactsRouter); 

 
  app.use(notFoundHandler);


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
