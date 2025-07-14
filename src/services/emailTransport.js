// // // // // // src/services/emailTransport.js
// // // // // // import nodemailer from 'nodemailer';
// // // // // // import mailgunTransport from 'nodemailer-mailgun-transport';

// // // // // // // 1) ukr.net SMTP
// // // // // // const ukrnetTransport = nodemailer.createTransport({
// // // // // //   host:   'smtp.ukr.net',
// // // // // //   port:   465,
// // // // // //   secure: true,
// // // // // //   auth: {
// // // // // //     user: process.env.UKRNET_USER,
// // // // // //     pass: process.env.UKRNET_PASSWORD,
// // // // // //   }
// // // // // // });

// // // // // // // 2) Mailgun via nodemailer-mailgun-transport
// // // // // // const mailgunOpts = {
// // // // // //   auth: {
// // // // // //     api_key: process.env.MAILGUN_API_KEY,
// // // // // //     domain:  process.env.MAILGUN_DOMAIN
// // // // // //   }
// // // // // // };
// // // // // // const mailgunTransporter = nodemailer.createTransport(
// // // // // //   mailgunTransport(mailgunOpts)
// // // // // // );

// // // // // // export function getMailTransport() {
// // // // // //   return process.env.EMAIL_PROVIDER === 'ukrnet'
// // // // // //     ? ukrnetTransport
// // // // // //     : mailgunTransporter;
// // // // // // }
// // // // // // src/services/emailTransport.js

// // // // // import nodemailer from 'nodemailer';

// // // // // const ukrnetTransport = nodemailer.createTransport({
// // // // //   host:   'smtp.ukr.net',
// // // // //   port:   465,
// // // // //   secure: true,
// // // // //   auth: {
// // // // //     user: process.env.UKRNET_USER,
// // // // //     pass: process.env.UKRNET_PASSWORD,
// // // // //   }
// // // // // });

// // // // // export function getMailTransport() {
// // // // //   return ukrnetTransport;
// // // // // }
// // // // import nodemailer from 'nodemailer';

// // // // const ukrnetTransport = nodemailer.createTransport({
// // // //   host: process.env.UKRNET_HOST || 'smtp.ukr.net',
// // // //   port: Number(process.env.UKRNET_PORT) || 465,
// // // //   // якщо порт 465 — true (SSL), якщо 2525 або 587 — false (STARTTLS)
// // // //   secure: String(process.env.UKRNET_PORT) === '465',
// // // //   auth: {
// // // //     user: process.env.UKRNET_USER,
// // // //     pass: process.env.UKRNET_PASSWORD,
// // // //   },
// // // //   tls: {
// // // //     // у тестах можна вимкнути перевірку сертифіката
// // // //     rejectUnauthorized: false
// // // //   },
// // // //   connectionTimeout: 10000,
// // // //   greetingTimeout:   10000,
// // // // });

// // // // export function getMailTransport() {
// // // //   return ukrnetTransport;
// // // // }
// // // // src/services/emailTransport.js

// // // import nodemailer from 'nodemailer';

// // // const transport = nodemailer.createTransport({
// // //   host: process.env.UKRNET_HOST,
// // //   port: Number(process.env.UKRNET_PORT),
// // //     secure: String(process.env.UKRNET_PORT) === '465',
// // //     requireTLS: String(process.env.UKRNET_PORT) !== '465',
// // //   auth: {
// // //     user: process.env.UKRNET_USER,
// // //     pass: process.env.UKRNET_PASSWORD,
// // //   },
// // //   logger: true,   // вмикаємо логування
// // //   debug:  true,   // вмикаємо debug-режим
// // //   tls: { rejectUnauthorized: false },
// // //   connectionTimeout: 10000,
// // //   greetingTimeout:   10000,
// // // });

// // // export function getMailTransport() {
// // //   return transport;
// // // }
// // // src/services/emailTransport.js
// // import nodemailer from 'nodemailer';

// // const transport = nodemailer.createTransport({
// //   host:       process.env.UKRNET_HOST,
// //   port:       Number(process.env.UKRNET_PORT),
// //   secure:     false,            // 2525 → false (STARTTLS)
// //   requireTLS: true,             // змушує підняти TLS після з’єднання
// //   auth: {
// //     user: process.env.UKRNET_USER,
// //     pass: process.env.UKRNET_PASSWORD,
// //   },
// //   connectionTimeout: 10000,
// //   greetingTimeout:   10000,
// // });

// // export function getMailTransport() {
// //   return transport;
// // }

// // src/services/emailTransport.js
// import nodemailer from 'nodemailer';

// const transport = nodemailer.createTransport({
//   host: process.env.UKRNET_HOST,               // smtp.ukr.net
//   port: Number(process.env.UKRNET_PORT),       // 2525
//   secure: false,                               // STARTTLS, а не SSL
//   auth: {
//     user: process.env.UKRNET_USER,
//     pass: process.env.UKRNET_PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: false                   // ігноруємо самопідписані сертифікати
//   },
//   connectionTimeout: 20000,                    // збільшуємо timeouts
//   greetingTimeout:   20000,
// });

// export function getMailTransport() {
//   return transport;
// }
import nodemailer from 'nodemailer';

const host = process.env.UKRNET_HOST || 'smtp.ukr.net';
const port = Number(process.env.UKRNET_PORT || 2525);

// для 2525 ставимо secure: true (Implicit SSL)
const transport = nodemailer.createTransport({
  host,
  port,
  secure: true,
  auth: {
    user: process.env.UKRNET_USER,
    pass: process.env.UKRNET_PASSWORD,
  },
  tls: {
    // тестово вимикаємо перевірку сертифіката
    rejectUnauthorized: false
  },
  logger: true,    // виводить усі SMTP-команди
  debug: true,     // додатковий дебаг
  connectionTimeout: 20000,
  greetingTimeout:   20000,
});

export function getMailTransport() {
  return transport;
}
