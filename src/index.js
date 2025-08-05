
// // // // // // // // // // import 'dotenv/config';
// // // // // // // // // // import initMongoConnection from './db/initMongoConnection.js';
// // // // // // // // // // import setupServer        from './server.js';

// // // // // // // // // // (async () => {
// // // // // // // // // //   try {
// // // // // // // // // //     await initMongoConnection();
// // // // // // // // // //     setupServer();
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     console.error('✖️ Failed to start app:', err);
// // // // // // // // // //     process.exit(1);
// // // // // // // // // //   }
// // // // // // // // // // })();
// // // // // // // // // import 'dotenv/config';
// // // // // // // // // import express from 'express';
// // // // // // // // // import mongoose from 'mongoose';
// // // // // // // // // import cookieParser from 'cookie-parser';

// // // // // // // // // import authRouter from './routes/auth.js';

// // // // // // // // // const app = express();

// // // // // // // // // app.use(express.json());
// // // // // // // // // app.use(cookieParser());

// // // // // // // // // app.use('/auth', authRouter);

// // // // // // // // // // централізований хендлер помилок
// // // // // // // // // app.use((err, req, res, next) => {
// // // // // // // // //   const status = err.status || 500;
// // // // // // // // //   res.status(status).json({ status, message: err.message });
// // // // // // // // // });

// // // // // // // // // const { PORT, MONGODB_URI } = process.env;

// // // // // // // // // mongoose
// // // // // // // // //   .connect(MONGODB_URI)
// // // // // // // // //   .then(() => {
// // // // // // // // //     console.log('MongoDB connected');
// // // // // // // // //     app.listen(PORT, () => {
// // // // // // // // //       console.log(Server listening on port ${PORT});
// // // // // // // // //     });
// // // // // // // // //   })
// // // // // // // // //   .catch(err => {
// // // // // // // // //     console.error('DB connection error:', err);
// // // // // // // // //     process.exit(1);
// // // // // // // // //   });
// // // // // // // // import 'dotenv/config';
// // // // // // // // import express from 'express';
// // // // // // // // import mongoose from 'mongoose';
// // // // // // // // import cookieParser from 'cookie-parser';

// // // // // // // // import authRouter from './routes/auth.js';

// // // // // // // // const app = express();

// // // // // // // // app.use(express.json());
// // // // // // // // app.use(cookieParser());

// // // // // // // // app.use('/auth', authRouter);

// // // // // // // // // централізований хендлер помилок
// // // // // // // // app.use((err, req, res, next) => {
// // // // // // // //   const status = err.status || 500;
// // // // // // // //   res.status(status).json({ status, message: err.message });
// // // // // // // // });

// // // // // // // // const { PORT, MONGODB_URI } = process.env;

// // // // // // // // mongoose
// // // // // // // //   .connect(MONGODB_URI)
// // // // // // // //   .then(() => {
// // // // // // // //     console.log('MongoDB connected');
// // // // // // // //     app.listen(PORT, () => {
// // // // // // // //       console.log(Server listening on port ${PORT});
// // // // // // // //     });
// // // // // // // //   })
// // // // // // // //   .catch(err => {
// // // // // // // //     console.error('DB connection error:', err);
// // // // // // // //     process.exit(1);
// // // // // // // //   });

// // // // // // // import 'dotenv/config';
// // // // // // // import express from 'express';
// // // // // // // import mongoose from 'mongoose';
// // // // // // // import cookieParser from 'cookie-parser';

// // // // // // // import authRouter from './routers/auth.js';

// // // // // // // const app = express();

// // // // // // // app.use(express.json());
// // // // // // // app.use(cookieParser());

// // // // // // // app.use('/auth', authRouter);

// // // // // // // // централізований хендлер помилок
// // // // // // // app.use((err, req, res, next) => {
// // // // // // //   const status = err.status || 500;
// // // // // // //   res.status(status).json({ status, message: err.message });
// // // // // // // });

// // // // // // // const { PORT, MONGODB_URI } = process.env;

// // // // // // // mongoose
// // // // // // //   .connect(MONGODB_URI)
// // // // // // //   .then(() => {
// // // // // // //     console.log('MongoDB connected');
// // // // // // //     app.listen(PORT, () => {
// // // // // // //       console.log(`Server listening on port ${PORT}`);
// // // // // // //     });
// // // // // // //   })
// // // // // // //   .catch(err => {
// // // // // // //     console.error('DB connection error:', err);
// // // // // // //     process.exit(1);
// // // // // // //   });
// // // // // // import 'dotenv/config';
// // // // // // import express from 'express';
// // // // // // import mongoose from 'mongoose';
// // // // // // import cookieParser from 'cookie-parser';

// // // // // // import authRouter from './routers/auth.js';

// // // // // // const app = express();

// // // // // // app.use(express.json());
// // // // // // app.use(cookieParser());

// // // // // // // AUTH
// // // // // // app.use('/auth', authRouter);

// // // // // // // 404 → JSON
// // // // // // app.use((req, res) => {
// // // // // //   res.status(404).json({ status: 404, message: 'Not Found' });
// // // // // // });

// // // // // // // Error handler → JSON
// // // // // // app.use((err, req, res, next) => {
// // // // // //   const status = err.status || 500;
// // // // // //   res.status(status).json({ status, message: err.message });
// // // // // // });

// // // // // // const { PORT, MONGODB_URI } = process.env;

// // // // // // mongoose.connect(MONGODB_URI)
// // // // // //   .then(() => {
// // // // // //     console.log('MongoDB connected');
// // // // // //     app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// // // // // //   })
// // // // // //   .catch(err => {
// // // // // //     console.error('DB connection error:', err);
// // // // // //     process.exit(1);
// // // // // //   });

// // // // // import 'dotenv/config';
// // // // // import express from 'express';
// // // // // import mongoose from 'mongoose';
// // // // // import cookieParser from 'cookie-parser';

// // // // // import authRouter from './routers/auth.js';
// // // // // import contactsRouter from './routers/contacts.js';
// // // // // import swaggerUi from 'swagger-ui-express';
// // // // // import { swaggerSpec } from './swagger.js';

// // // // // const app = express();

// // // // // app.use(express.json());
// // // // // app.use(cookieParser());

// // // // // // AUTH
// // // // // app.use('/auth', authRouter);

// // // // // // CONTACTS (захищений middleware'ом всередині)
// // // // // app.use('/contacts', contactsRouter);

// // // // // // 404 → JSON
// // // // // app.use((req, res) => {
// // // // //   res.status(404).json({ status: 404, message: 'Not Found' });
// // // // // });

// // // // // // Error handler → JSON
// // // // // app.use((err, req, res, next) => {
// // // // //   const status = err.status || 500;
// // // // //   res.status(status).json({ status, message: err.message });
// // // // // });

// // // // // const { PORT, MONGODB_URI } = process.env;

// // // // // mongoose.connect(MONGODB_URI)
// // // // //   .then(() => {
// // // // //     console.log('MongoDB connected');
// // // // //     app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// // // // //   })
// // // // //   .catch(err => {
// // // // //     console.error('DB connection error:', err);
// // // // //     process.exit(1);
// // // // //   });

// // // // import 'dotenv/config';
// // // // import express from 'express';
// // // // import mongoose from 'mongoose';
// // // // import cookieParser from 'cookie-parser';

// // // // import authRouter from './routers/auth.js';
// // // // import contactsRouter from './routers/contacts.js';

// // // // import swaggerUi from 'swagger-ui-express';
// // // // import { swaggerSpec } from './swagger.js';

// // // // const app = express();

// // // // app.use(express.json());
// // // // app.use(cookieParser());

// // // // // AUTH
// // // // app.use('/auth', authRouter);

// // // // // CONTACTS
// // // // app.use('/contacts', contactsRouter);

// // // // // Swagger UI (документація)
// // // // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // // // // 404 → JSON
// // // // app.use((req, res) => {
// // // //   res.status(404).json({ status: 404, message: 'Not Found' });
// // // // });

// // // // // Error handler → JSON
// // // // app.use((err, req, res, next) => {
// // // //   const status = err.status || 500;
// // // //   res.status(status).json({ status, message: err.message });
// // // // });

// // // // const { PORT, MONGODB_URI } = process.env;

// // // // mongoose.connect(MONGODB_URI)
// // // //   .then(() => {
// // // //     console.log('MongoDB connected');
// // // //     app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// // // //   })
// // // //   .catch(err => {
// // // //     console.error('DB connection error:', err);
// // // //     process.exit(1);
// // // //   });

// // // import 'dotenv/config';
// // // import express from 'express';
// // // import mongoose from 'mongoose';
// // // import cookieParser from 'cookie-parser';
// // // import path from 'path';

// // // import authRouter from './routers/auth.js';
// // // import contactsRouter from './routers/contacts.js';

// // // import swaggerUi from 'swagger-ui-express';
// // // import { swaggerSpec } from './swagger.js';

// // // const app = express();

// // // app.use(express.json());
// // // app.use(cookieParser());

// // // // AUTH & CONTACTS
// // // app.use('/auth', authRouter);
// // // app.use('/contacts', contactsRouter);

// // // // Swagger UI (interactive docs)
// // // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // // // ReDocly static docs
// // // app.use('/docs', express.static(path.join(process.cwd(), 'docs')));

// // // // 404 → JSON
// // // app.use((req, res) => {
// // //   res.status(404).json({ status: 404, message: 'Not Found' });
// // // });

// // // // Error handler → JSON
// // // app.use((err, req, res, next) => {
// // //   const status = err.status || 500;
// // //   res.status(status).json({ status, message: err.message });
// // // });

// // // const { PORT, MONGODB_URI } = process.env;
// // // mongoose.connect(MONGODB_URI)
// // //   .then(() => {
// // //     console.log('MongoDB connected');
// // //     app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// // //   })
// // //   .catch(err => {
// // //     console.error('DB connection error:', err);
// // //     process.exit(1);
// // //   });

// // // src/index.js
// // import 'dotenv/config';
// // import express from 'express';
// // import mongoose from 'mongoose';
// // import cookieParser from 'cookie-parser';
// // import path from 'path';

// // import authRouter from './routers/auth.js';
// // import contactsRouter from './routers/contacts.js';

// // import swaggerUi from 'swagger-ui-express';
// // import { swaggerSpec } from './swagger.js';

// // const app = express();

// // app.use(express.json());
// // app.use(cookieParser());

// // // AUTH & CONTACTS
// // app.use('/auth', authRouter);
// // app.use('/contacts', contactsRouter);

// // // Swagger UI (interactive docs)
// // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // // ReDocly UI: serve redoc.html on /docs
// // app.get('/docs', (req, res) => {
// //   res.sendFile(path.join(process.cwd(), 'docs', 'redoc.html'));
// // });
// // // Also serve static files in docs (e.g., swagger.json)
// // app.use('/docs', express.static(path.join(process.cwd(), 'docs')));

// // // 404 → JSON
// // app.use((req, res) => {
// //   res.status(404).json({ status: 404, message: 'Not Found' });
// // });

// // // Error handler → JSON
// // app.use((err, req, res, next) => {
// //   const status = err.status || 500;
// //   res.status(status).json({ status, message: err.message });
// // });

// // const { PORT = 3000, MONGODB_URI } = process.env;

// // mongoose.connect(MONGODB_URI)
// //   .then(() => {
// //     console.log('MongoDB connected');
// //     app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// //   })
// //   .catch(err => {
// //     console.error('DB connection error:', err);
// //     process.exit(1);
// //   });

// // src/index.js
// import 'dotenv/config';
// import express from 'express';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
// import path from 'path';

// import authRouter from './routers/auth.js';
// import contactsRouter from './routers/contacts.js';

// import swaggerUi from 'swagger-ui-express';
// import { swaggerSpec } from './swagger.js';

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// // AUTH & CONTACTS
// app.use('/auth', authRouter);
// app.use('/contacts', contactsRouter);

// // Swagger UI (інтерактивна документація)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // ReDocly UI: віддаємо html-файл на /docs
// app.get('/docs', (req, res) => {
//   res.sendFile(path.join(process.cwd(), 'docs', 'index.html'));
// });
// // І також даємо доступ до всіх інших файлів у папці docs (swagger.json, favicon, тощо)
// app.use('/docs', express.static(path.join(process.cwd(), 'docs')));

// // 404 → JSON
// app.use((req, res) => {
//   res.status(404).json({ status: 404, message: 'Not Found' });
// });

// // Централізований обробник помилок → JSON
// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   res.status(status).json({ status, message: err.message });
// });

// const { PORT = 3000, MONGODB_URI } = process.env;

// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
//   })
//   .catch(err => {
//     console.error('DB connection error:', err);
//     process.exit(1);
//   });

// src/index.js
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';

import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

// AUTH & CONTACTS
app.use('/auth', authRouter);
app.use('/contacts', contactsRouter);

// Swagger UI (interactive docs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ReDocly static docs (змінено на redoc.html)
app.get('/docs', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'docs', 'index.html'));
});
app.use('/docs', express.static(path.join(process.cwd(), 'docs')));

// 404 → JSON
app.use((req, res) => {
  res.status(404).json({ status: 404, message: 'Not Found' });
});

// Error handler → JSON
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ status, message: err.message });
});

const { PORT = 3000, MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection error:', err);
    process.exit(1);
  });
