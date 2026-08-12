import { emailService } from '../services/emailService.js';

export const sendEmail = async ({ email, subject, message, html }) => {
  return await emailService.send({
    email,
    subject,
    text: message,
    html: html || message
  });
};
