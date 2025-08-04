// // // import swaggerJSDoc from 'swagger-jsdoc';

// // // const options = {
// // //   definition: {
// // //     openapi: '3.0.0',
// // //     info: {
// // //       title: 'Contacts API',
// // //       version: '1.0.0',
// // //       description: 'API для керування контактами, автентифікації та скидання пароля',
// // //     },
// // //     servers: [
// // //       { url: 'http://localhost:3000' },
// // //       { url: 'https://nodejs-hw-mongodb-5-8zat.onrender.com' },
// // //     ],
// // //     components: {
// // //       securitySchemes: {
// // //         bearerAuth: {
// // //           type: 'http',
// // //           scheme: 'bearer',
// // //           bearerFormat: 'JWT',
// // //         },
// // //       },
// // //     },
// // //     security: [{ bearerAuth: [] }],
// // //   },
// // //   apis: ['./src/routers/*.js'], // шлях до файлів з JSDoc
// // // };

// // // export const swaggerSpec = swaggerJSDoc(options);

// // import swaggerJSDoc from 'swagger-jsdoc';

// // const options = {
// //   definition: {
// //     openapi: '3.0.0',
// //     info: {
// //       title: 'Contacts API',
// //       version: '1.0.0',
// //       description: 'API для керування контактами, автентифікації та скидання пароля',
// //     },
// //     servers: [
// //       { url: 'http://localhost:3000' },
// //       { url: 'https://nodejs-hw-mongodb-5-8zat.onrender.com' }
// //     ],
// //     components: {
// //       securitySchemes: {
// //         bearerAuth: {
// //           type: 'http',
// //           scheme: 'bearer',
// //           bearerFormat: 'JWT'
// //         }
// //       }
// //     },
// //     security: [{ bearerAuth: [] }]
// //   },
// //   apis: ['./src/routers/*.js']  // шлях до твоїх роутів з JSDoc
// // };

// // export const swaggerSpec = swaggerJSDoc(options);

// import swaggerJSDoc from 'swagger-jsdoc';

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Contacts API',
//       version: '1.0.0',
//       description: 'API для керування контактами, автентифікації та скидання пароля',
//     },
//     servers: [
//     {
//     url: 'https://nodejs-hw-mongodb-6.onrender.com',
//     description: 'Deployed server',
//     },
//     {
//       url: 'http://localhost:3000',
//       description: 'Local server',
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
//       }
//     },
//     security: [{ bearerAuth: [] }]
//   },
//   apis: ['./src/routers/*.js']
// };

// export const swaggerSpec = swaggerJSDoc(options);
// src/swagger.js
import swaggerDocument from '../docs/swagger.json' assert { type: 'json' };

export const swaggerSpec = swaggerDocument;
