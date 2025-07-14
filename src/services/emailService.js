// // import nodemailer from 'nodemailer';
// // import createError from 'http-errors';

// // async function createTransporter() {
// //   // Якщо хочемо чисто локальний «фейк» – без мережі
// //   if (process.env.USE_FAKE_TRANSPORT === 'true') {
// //     console.log('💡 Using fake transport – no real emails will be sent');
// //     return nodemailer.createTransport({
// //       // Stream transport просто поверне буфер, не відкриваючи портів
// //       streamTransport: true,
// //       newline: 'unix',
// //       buffer: true
// //     });
// //   }

// //   // Інакше – справжній Brevo
// //   return nodemailer.createTransport({
// //     host: process.env.SMTP_HOST,
// //     port: Number(process.env.SMTP_PORT),
// //     secure: process.env.SMTP_SECURE === 'true',
// //     auth: {
// //       user: process.env.SMTP_USER,
// //       pass: process.env.SMTP_PASSWORD
// //     }
// //   });
// // }

// // async function sendResetEmail(to, token) {
// //   const transporter = await createTransporter();

// //   // перевіряємо (для фейку це пройде миттєво)
// //   await transporter.verify();

// //   const resetLink = `${process.env.APP_DOMAIN}/reset-password?token=${token}`;
// //   const mailOptions = {
// //     from: process.env.SMTP_FROM,
// //     to,
// //     subject: 'Password Reset Request',
// //     html: `<p>Click <a href="${resetLink}">here</a> to reset password</p>`
// //   };

// //   let info;
// //   try {
// //     info = await transporter.sendMail(mailOptions);
// //   } catch (err) {
// //     console.error('❌ sendMail error:', err);
// //     throw createError(500, 'Failed to send the email, please try again later.');
// //   }

// //   // для стрім-транспорту виведе наш лист в консоль як буфер
// //   if (process.env.USE_FAKE_TRANSPORT === 'true') {
// //     console.log('📨 Fake email content:\n', info.message.toString());
// //   }
// // }

// // export default { sendResetEmail };

// // src/services/emailService.js

// console.log('Mailgun ENV:', {
//   key:    process.env.MAILGUN_API_KEY,
//   domain: process.env.MAILGUN_DOMAIN,
//   from:   process.env.MAILGUN_FROM
// });

// import formData from 'form-data';
// import Mailgun from 'mailgun.js';

// const {
//   MAILGUN_API_KEY,
//   MAILGUN_DOMAIN,
//   MAILGUN_FROM,
//   APP_DOMAIN
// } = process.env;

// const mailgun = new Mailgun(formData);
// const client = mailgun.client({
//   username: 'api',
//   key:      MAILGUN_API_KEY,
//   url:      'https://api.mailgun.net'  // можна не вказувати
// });

// async function sendResetEmail(to, token) {
//   const resetLink = `${APP_DOMAIN}/auth/reset-pwd?token=${token}`;
//   const message = {
//     from:    MAILGUN_FROM,
//     to,
//     subject: 'Скидання пароля',
//     html: `
//       <p>Щоб скинути пароль, перейдіть за посиланням:</p>
//       <a href="${resetLink}">${resetLink}</a>
//       <p>Лінк дійсний 5 хвилин.</p>
//     `
//   };

//   const resp = await client.messages.create(MAILGUN_DOMAIN, message);
//   console.log('✅ Mailgun API sent:', resp.id);
// }

// export default { sendResetEmail };

import { getMailTransport } from './emailTransport.js';

const transport = getMailTransport();

export async function sendResetEmail(to, token) {
  const link = `${process.env.APP_DOMAIN}/auth/reset-pwd?token=${token}`;
  const from = process.env.EMAIL_PROVIDER === 'ukrnet'
    ? process.env.UKRNET_FROM
    : process.env.MAILGUN_FROM;

  await transport.sendMail({
    from,
    to,
    subject: 'Скидання пароля',
    html: `<p>Перейдіть за <a href="${link}">цим посиланням</a>, щоб поміняти пароль.</p>`
  });
}
