// // // // // import nodemailer from 'nodemailer';

// // // // // const {
// // // // //   SMTP_HOST,
// // // // //   SMTP_PORT,
// // // // //   SMTP_USER,
// // // // //   SMTP_PASSWORD
// // // // // } = process.env;

// // // // // // кастинг порту і визначення TLS лише для 465
// // // // // const port = Number(SMTP_PORT);
// // // // // const secure = port === 465;

// // // // // const transporter = nodemailer.createTransport({
// // // // //   host: SMTP_HOST,
// // // // //   port,
// // // // //   secure,
// // // // //   auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
// // // // //   tls: {
// // // // //     rejectUnauthorized: false
// // // // //   }
// // // // // });

// // // // // // Додатковий лог для перевірки підключення
// // // // // transporter.verify()
// // // // //   .then(() => console.log('SMTP connected ✅', { host: SMTP_HOST, port, secure }))
// // // // //   .catch(err => console.error('SMTP connection failed ❌', err));

// // // // // export default async function sendMail({ to, subject, html }) {
// // // // //   const info = await transporter.sendMail({
// // // // //     from: SMTP_USER,
// // // // //     to,
// // // // //     subject,
// // // // //     html
// // // // //   });
// // // // //   console.log('[sendMail] Message sent:', info.messageId);
// // // // //   return info;
// // // // // }

// // // // import nodemailer from 'nodemailer';

// // // // const {
// // // //   SMTP_HOST,
// // // //   SMTP_PORT,
// // // //   SMTP_USER,
// // // //   SMTP_PASSWORD
// // // // } = process.env;

// // // // const port   = Number(SMTP_PORT);
// // // // const secure = port === 465;

// // // // const transporter = nodemailer.createTransport({
// // // //   host: SMTP_HOST,
// // // //   port,
// // // //   secure,
// // // //   auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
// // // //   tls: { rejectUnauthorized: false }
// // // // });

// // // // transporter.verify()
// // // //   .then(() => console.log('SMTP connected ✅', { host: SMTP_HOST, port, secure }))
// // // //   .catch(err => console.error('SMTP connection failed ❌', err));

// // // // export default async function sendMail({ to, subject, html }) {
// // // //   const info = await transporter.sendMail({
// // // //     from:    SMTP_USER,
// // // //     to,
// // // //     subject,
// // // //     html
// // // //   });
// // // //   console.log('[sendMail] Message sent:', info.messageId);
// // // //   return info;
// // // // }

// // // import nodemailer from 'nodemailer';

// // // const {
// // //   SMTP_USER,
// // //   SMTP_PASSWORD,
// // //   SMTP_FROM,
// // // } = process.env;

// // // const transporter = nodemailer.createTransport({
// // //   service: 'gmail',
// // //   auth: {
// // //     user: SMTP_USER,
// // //     pass: SMTP_PASSWORD,
// // //   },
// // // });

// // // // Перевірка підключення до SMTP
// // // transporter.verify()
// // //   .then(() => console.log('✅ Gmail SMTP connected'))
// // //   .catch(err => console.error('❌ SMTP connection failed:', err));

// // // export default async function sendMail({ to, subject, html }) {
// // //   const info = await transporter.sendMail({
// // //     from: SMTP_FROM || SMTP_USER,  // якщо немає FROM — використовуємо SMTP_USER
// // //     to,
// // //     subject,
// // //     html,
// // //   });

// // //   console.log('[sendMail] ✅ Message sent:', info.messageId);
// // //   return info;
// // // }

// // // src/services/sendMail.js
// // import nodemailer from 'nodemailer';

// // const transporter = nodemailer.createTransport({
// //   host: 'smtp.ukr.net',
// //   port: 465,
// //   secure: true,
// //   auth: {
// //     user: process.env.MAIL_APP_USER,
// //     pass: process.env.MAIL_APP_PASSWORD,
// //   },
// // });

// // transporter.verify()
// //   .then(() => console.log('✅ SMTP (ukr.net) connected'))
// //   .catch(err => console.error('❌ SMTP connection failed:', err.message));

// // export default async function sendMail(options = {}) {
// //   const emailOptions = {
// //     from: process.env.MAIL_APP_USER,
// //     subject: 'Reset password',
// //     text: 'Click the link to reset your password',
// //     ...options,
// //   };

// //   try {
// //     const info = await transporter.sendMail(emailOptions);
// //     console.log('[sendMail] ✅ Message sent:', info.messageId);
// //     return info;
// //   } catch (err) {
// //     console.error('[sendMail] ❌ Error sending email:', err.message);
// //     throw err;
// //   }
// // }

// // src/services/sendMail.js
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: 'smtp.ukr.net',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.MAIL_APP_USER,
//     pass: process.env.MAIL_APP_PASSWORD,
//   },
// });

// transporter.verify()
//   .then(() => console.log('✅ SMTP (ukr.net) connected'))
//   .catch(err => console.error('❌ SMTP connection failed:', err.message));

// export default async function sendMail(options = {}) {
//   const emailOptions = {
//     from: process.env.MAIL_APP_USER,
//     subject: 'Reset password',
//     text: 'Click the link to reset your password',
//     ...options,
//   };

//   try {
//     const info = await transporter.sendMail(emailOptions);
//     console.log('[sendMail] ✅ Message sent:', info.messageId);
//     return info;
//   } catch (err) {
//     console.error('[sendMail] ❌ Error sending email:', err.message);
//     throw err;
//   }
// }

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

transporter.verify()
  .then(() => console.log('✅ SMTP (ukr.net) connected'))
  .catch(err => console.error('❌ SMTP connection failed:', err.message));

export default async function sendMail(options = {}) {
  const mailOpts = {
    from: process.env.SMTP_USER,
    ...options
  };
  const info = await transporter.sendMail(mailOpts);
  console.log('[sendMail] Message sent:', info.messageId);
  return info;
}
