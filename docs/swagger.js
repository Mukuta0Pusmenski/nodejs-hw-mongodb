// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API для керування контактами',
    },
    servers: [
      {
        url: 'https://nodejs-hw-mongodb-6-kq3a.onrender.com/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'], // шляхи до файлів з документацією
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
