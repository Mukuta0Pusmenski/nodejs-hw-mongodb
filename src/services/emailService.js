// src/services/emailService.js
import nodemailer from 'nodemailer';

export async function createTransporter() {
  console.log('SMTP config:', {
    host:   process.env.SMTP_HOST,
    port:   process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    user:   process.env.SMTP_USER
  });

  console.log('→ [emailService] USE_ETHEREAL =', process.env.USE_ETHEREAL);

  if (process.env.USE_ETHEREAL === 'true') {
    const testAccount = await nodemailer.createTestAccount();
    const port        = Number(process.env.ETHEREAL_PORT) || testAccount.smtp.port;
    const secure      = port === 465;

    const config = {
      host:   testAccount.smtp.host,
      port,
      secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    };

    console.log('→ [emailService] Ethereal config:', config);
    return nodemailer.createTransport(config);
  }

  console.log('→ [emailService] Using real SMTP:', process.env.SMTP_HOST);

  return nodemailer.createTransport({
    host:    process.env.SMTP_HOST,
    port:    Number(process.env.SMTP_PORT),
    secure:  process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    },
    logger:  true,
    debug:   true
  });
}
