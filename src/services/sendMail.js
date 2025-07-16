// src/services/sendMail.js
import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  const emailOptions = {
    from: SMTP_USER,
    to,
    subject,
    html,
  };

  await transporter.sendMail(emailOptions);
};

export default sendEmail;
