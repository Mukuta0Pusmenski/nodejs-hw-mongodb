// // // src/services/email.js
// // import nodemailer from 'nodemailer';

// // export async function createTransporter() {
// //   // Якщо тестуємо на Ethereal
// //   if (process.env.USE_ETHEREAL === 'true') {
// //     const testAcc = await nodemailer.createTestAccount();
// //     return nodemailer.createTransport({
// //       host: testAcc.smtp.host,
// //       port: testAcc.smtp.port,
// //       secure: testAcc.smtp.secure,
// //       auth: {
// //         user: testAcc.user,
// //         pass: testAcc.pass
// //       }
// //     });
// //   }

// //   // Інакше – ваш реальний SMTP (Brevo/Ukr.net тощо)
// //   return nodemailer.createTransport({
// //     host:     process.env.SMTP_HOST,
// //     port:     Number(process.env.SMTP_PORT),
// //     secure:   process.env.SMTP_SECURE === 'true',
// //     auth: {
// //       user: process.env.SMTP_USER,
// //       pass: process.env.SMTP_PASSWORD
// //     }
// //   });
// // }

// // src/services/email.js
// import nodemailer from 'nodemailer';
// import 'dotenv/config';

// export async function createTransporter() {
//   // якщо тестуємо на Ethereal — отримуємо тимчасові облікові дані
//   if (process.env.USE_ETHEREAL === 'true') {
//     const testAcc = await nodemailer.createTestAccount();
//     console.log('Ethereal SMTP config:', testAcc.smtp);
//     return nodemailer.createTransport({
//       host: testAcc.smtp.host,
//       port: testAcc.smtp.port,
//       secure: testAcc.smtp.secure,
//       auth: {
//         user: testAcc.user,
//         pass: testAcc.pass,
//       },
//     });
//   }

//   // беремо пароль із будь-якої з можливих змінних
//   const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

//   // лог для перевірки, що підхопилося в ENV
//   console.log('SMTP config:', {
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: process.env.SMTP_SECURE,
//     user: process.env.SMTP_USER,
//     pass: smtpPass ? '*****' : null,
//   });

//   // створюємо реальний SMTP-транспортер
//   return nodemailer.createTransport({
//     host:     process.env.SMTP_HOST,
//     port:     Number(process.env.SMTP_PORT),
//     secure:   process.env.SMTP_SECURE === 'true',
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: smtpPass,
//     },
//   });
// }
import nodemailer from 'nodemailer';

// відправка листа (контролер/сервіс імпортують саме цю функцію)
export default async function sendMail({ from, to, subject, html }) {
  const transporter = await createTransporter();
  const sender = from || process.env.SMTP_FROM;

  return transporter.sendMail({ from: sender, to, subject, html });
}

export async function createTransporter() {
  if (process.env.USE_ETHEREAL === 'true') {
    const testAcc = await nodemailer.createTestAccount();
    console.log('Ethereal SMTP config:', testAcc.smtp);
    return nodemailer.createTransport({
      host:    testAcc.smtp.host,
      port:    testAcc.smtp.port,
      secure:  testAcc.smtp.secure,
      auth: {
        user: testAcc.user,
        pass: testAcc.pass,
      },
    });
  }

  // береться App-пароль ukr.net
  const smtpPass = process.env.SMTP_PASS;

  console.log('Loaded SMTP env:', {
    host:   process.env.SMTP_HOST,
    port:   process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    user:   process.env.SMTP_USER,
    pass:   smtpPass ? '*****' : null,
  });

  return nodemailer.createTransport({
    host:    process.env.SMTP_HOST,
    port:    Number(process.env.SMTP_PORT),
    secure:  process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: smtpPass,
    },
  });
}