// // // // // // // import nodemailer from 'nodemailer';
// // // // // // // import createError from 'http-errors';

// // // // // // // async function createTransporter() {
// // // // // // //   // Якщо хочемо чисто локальний «фейк» – без мережі
// // // // // // //   if (process.env.USE_FAKE_TRANSPORT === 'true') {
// // // // // // //     console.log('💡 Using fake transport – no real emails will be sent');
// // // // // // //     return nodemailer.createTransport({
// // // // // // //       // Stream transport просто поверне буфер, не відкриваючи портів
// // // // // // //       streamTransport: true,
// // // // // // //       newline: 'unix',
// // // // // // //       buffer: true
// // // // // // //     });
// // // // // // //   }

// // // // // // //   // Інакше – справжній Brevo
// // // // // // //   return nodemailer.createTransport({
// // // // // // //     host: process.env.SMTP_HOST,
// // // // // // //     port: Number(process.env.SMTP_PORT),
// // // // // // //     secure: process.env.SMTP_SECURE === 'true',
// // // // // // //     auth: {
// // // // // // //       user: process.env.SMTP_USER,
// // // // // // //       pass: process.env.SMTP_PASSWORD
// // // // // // //     }
// // // // // // //   });
// // // // // // // }

// // // // // // // async function sendResetEmail(to, token) {
// // // // // // //   const transporter = await createTransporter();

// // // // // // //   // перевіряємо (для фейку це пройде миттєво)
// // // // // // //   await transporter.verify();

// // // // // // //   const resetLink = `${process.env.APP_DOMAIN}/reset-password?token=${token}`;
// // // // // // //   const mailOptions = {
// // // // // // //     from: process.env.SMTP_FROM,
// // // // // // //     to,
// // // // // // //     subject: 'Password Reset Request',
// // // // // // //     html: `<p>Click <a href="${resetLink}">here</a> to reset password</p>`
// // // // // // //   };

// // // // // // //   let info;
// // // // // // //   try {
// // // // // // //     info = await transporter.sendMail(mailOptions);
// // // // // // //   } catch (err) {
// // // // // // //     console.error('❌ sendMail error:', err);
// // // // // // //     throw createError(500, 'Failed to send the email, please try again later.');
// // // // // // //   }

// // // // // // //   // для стрім-транспорту виведе наш лист в консоль як буфер
// // // // // // //   if (process.env.USE_FAKE_TRANSPORT === 'true') {
// // // // // // //     console.log('📨 Fake email content:\n', info.message.toString());
// // // // // // //   }
// // // // // // // }

// // // // // // // export default { sendResetEmail };

// // // // // // // src/services/emailService.js

// // // // // // console.log('Mailgun ENV:', {
// // // // // //   key:    process.env.MAILGUN_API_KEY,
// // // // // //   domain: process.env.MAILGUN_DOMAIN,
// // // // // //   from:   process.env.MAILGUN_FROM
// // // // // // });

// // // // // // import formData from 'form-data';
// // // // // // import Mailgun from 'mailgun.js';

// // // // // // const {
// // // // // //   MAILGUN_API_KEY,
// // // // // //   MAILGUN_DOMAIN,
// // // // // //   MAILGUN_FROM,
// // // // // //   APP_DOMAIN
// // // // // // } = process.env;

// // // // // // const mailgun = new Mailgun(formData);
// // // // // // const client = mailgun.client({
// // // // // //   username: 'api',
// // // // // //   key:      MAILGUN_API_KEY,
// // // // // //   url:      'https://api.mailgun.net'  // можна не вказувати
// // // // // // });

// // // // // // async function sendResetEmail(to, token) {
// // // // // //   const resetLink = `${APP_DOMAIN}/auth/reset-pwd?token=${token}`;
// // // // // //   const message = {
// // // // // //     from:    MAILGUN_FROM,
// // // // // //     to,
// // // // // //     subject: 'Скидання пароля',
// // // // // //     html: `
// // // // // //       <p>Щоб скинути пароль, перейдіть за посиланням:</p>
// // // // // //       <a href="${resetLink}">${resetLink}</a>
// // // // // //       <p>Лінк дійсний 5 хвилин.</p>
// // // // // //     `
// // // // // //   };

// // // // // //   const resp = await client.messages.create(MAILGUN_DOMAIN, message);
// // // // // //   console.log('✅ Mailgun API sent:', resp.id);
// // // // // // }

// // // // // // export default { sendResetEmail };


// // // // // export async function sendResetEmail(to, token) {
// // // // //   const link = `${process.env.APP_DOMAIN}/auth/reset-pwd?token=${token}`;
// // // // //   const from = process.env.EMAIL_PROVIDER === 'ukrnet'
// // // // //     ? process.env.UKRNET_FROM
// // // // //     : process.env.MAILGUN_FROM;

// // // // //   await transport.sendMail({
// // // // //     from,
// // // // //     to,
// // // // //     subject: 'Скидання пароля',
// // // // //     html: `<p>Перейдіть за <a href="${link}">цим посиланням</a>, щоб поміняти пароль.</p>`
// // // // //   });
// // // // // }

// // // // import nodemailer from 'nodemailer';

// // // // export async function createTransporter() {
// // // //   if (process.env.USE_ETHEREAL === 'true') {
// // // //     const testAccount = await nodemailer.createTestAccount();
// // // //     return nodemailer.createTransport({
// // // //       host: testAccount.smtp.host,
// // // //       port: testAccount.smtp.port,
// // // //       secure: testAccount.smtp.secure,
// // // //       auth: {
// // // //         user: testAccount.user,
// // // //         pass: testAccount.pass
// // // //       }
// // // //     });
// // // //   }

// // // //   // Інакше – ваш реальний SMTP
// // // //   return nodemailer.createTransport({
// // // //     host:     process.env.SMTP_HOST,
// // // //     port:     Number(process.env.SMTP_PORT),
// // // //     secure:   process.env.SMTP_SECURE === 'true',
// // // //     auth: {
// // // //       user: process.env.SMTP_USER,
// // // //       pass: process.env.SMTP_PASSWORD
// // // //     }
// // // //   });
// // // // }

// // // // src/services/emailService.js
// // // import nodemailer from 'nodemailer';

// // // export async function createTransporter() {
// // //   console.log('→ USE_ETHEREAL =', process.env.USE_ETHEREAL);
// // //   if (process.env.USE_ETHEREAL === 'true') {
// // //     console.log('→ Використовуємо Ethereal test account');
// // //     const testAccount = await nodemailer.createTestAccount();
// // //     return nodemailer.createTransport({
// // //       host: testAccount.smtp.host,
// // //       port: testAccount.smtp.port,
// // //       secure: testAccount.smtp.secure,
// // //       auth: {
// // //         user: testAccount.user,
// // //         pass: testAccount.pass
// // //       }
// // //     });
// // //   }

// // //   console.log('→ Використовуємо реальний SMTP:', process.env.SMTP_HOST);
// // //   return nodemailer.createTransport({
// // //     host:     process.env.SMTP_HOST,
// // //     port:     Number(process.env.SMTP_PORT),
// // //     secure:   process.env.SMTP_SECURE === 'true',
// // //     auth: {
// // //       user: process.env.SMTP_USER,
// // //       pass: process.env.SMTP_PASSWORD
// // //     }
// // //   });
// // // }

// // // src/services/emailService.js

// // import nodemailer from 'nodemailer';


// // export async function createTransporter() {
// //   console.log('→ [emailService] USE_ETHEREAL =', process.env.USE_ETHEREAL);

// //   if (process.env.USE_ETHEREAL === 'true') {
// //     console.log('→ [emailService] Створюємо Ethereal тестовий акаунт…');
// //     const testAccount = await nodemailer.createTestAccount();

// //     // Використовуємо ETHEREAL_PORT або дефолтний порт із testAccount
// //     const etherealPort = Number(process.env.ETHEREAL_PORT) || testAccount.smtp.port;

// //     const smtpConfig = {
// //       host: testAccount.smtp.host,
// //       port: etherealPort,
// //       secure: etherealPort === 465, // SSL тільки на 465
// //       auth: {
// //         user: testAccount.user,
// //         pass: testAccount.pass
// //       }
// //     };

// //     console.log('→ [emailService] Ethereal SMTP override:', smtpConfig);
// //     return nodemailer.createTransport(smtpConfig);
// //   }

// //   console.log('→ [emailService] Використовуємо реальний SMTP:', process.env.SMTP_HOST);
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

// // ───────────────────────────────────────────────────────────────────
// // src/services/emailService.js
// import nodemailer from 'nodemailer';

// export async function createTransporter() {
//   console.log('→ [emailService] USE_ETHEREAL =', process.env.USE_ETHEREAL);

//   if (process.env.USE_ETHEREAL === 'true') {
//     console.log('→ [emailService] Creating Ethereal test account…');
//     const testAccount = await nodemailer.createTestAccount();

//     // Якщо 587 блокується, можна перепризначити ETHEREAL_PORT (наприклад 2525)
//     const port   = Number(process.env.ETHEREAL_PORT) || testAccount.smtp.port;
//     const secure = port === 465;

//     const config = {
//       host:   testAccount.smtp.host,
//       port,
//       secure,
//       auth: {
//         user: testAccount.user,
//         pass: testAccount.pass
//       }
//     };

//     console.log('→ [emailService] Ethereal SMTP config override:', config);
//     return nodemailer.createTransport(config);
//   }

//   console.log('→ [emailService] Using real SMTP:', process.env.SMTP_HOST);
//   return nodemailer.createTransport({
//     host:   process.env.SMTP_HOST,
//     port:   Number(process.env.SMTP_PORT),
//     secure: process.env.SMTP_SECURE === 'true',
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASSWORD
//     }
//   });
// }

import nodemailer from 'nodemailer';

export async function createTransporter() {
  console.log('→ [emailService] USE_ETHEREAL =', process.env.USE_ETHEREAL);

  if (process.env.USE_ETHEREAL === 'true') {
    const testAccount = await nodemailer.createTestAccount();
    const port   = Number(process.env.ETHEREAL_PORT) || testAccount.smtp.port;
    const secure = port === 465;

    const config = {
      host: testAccount.smtp.host,
      port,
      secure,
      auth: { user: testAccount.user, pass: testAccount.pass }
    };
    console.log('→ [emailService] Ethereal config:', config);
    return nodemailer.createTransport(config);
  }

  console.log('→ [emailService] Using real SMTP:', process.env.SMTP_HOST);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
  });
}
