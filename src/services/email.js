// src/services/email.js
import nodemailer from 'nodemailer';

export async function createTransporter() {
  // Якщо тестуємо на Ethereal
  if (process.env.USE_ETHEREAL === 'true') {
    const testAcc = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: testAcc.smtp.host,
      port: testAcc.smtp.port,
      secure: testAcc.smtp.secure,
      auth: {
        user: testAcc.user,
        pass: testAcc.pass
      }
    });
  }

  // Інакше – ваш реальний SMTP (Brevo/Ukr.net тощо)
  return nodemailer.createTransport({
    host:     process.env.SMTP_HOST,
    port:     Number(process.env.SMTP_PORT),
    secure:   process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
}
