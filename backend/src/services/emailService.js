import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'support@techzonwide.com';
import logger from '../utils/logger.js';

class EmailService {
  constructor() {
    // We use Nodemailer pointing to Brevo SMTP servers
    this.transporter = nodemailer.createTransport({
      host: env.brevo.host || 'smtp-relay.brevo.com',
      port: env.brevo.port || 587,
      auth: {
        user: env.brevo.user || 'mock_user',
        pass: env.brevo.pass || 'mock_pass',
      },
    });
  }

  /**
   * Generic send method with retry logic
   */
  async send(options, retries = 3) {
    const mailOptions = {
      from: `"${env.appName}" <noreply@techzonsolutions.com>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
      text: options.text || options.message, // Fallback
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent: ${info.messageId} to ${options.email}`);
      return info;
    } catch (error) {
      if (retries > 0) {
        logger.warn(`Email send failed. Retrying... (${retries} attempts left)`);
        return await this.send(options, retries - 1);
      }
      logger.error('Email failed after retries:', error);
      // We don't throw an error directly to the user to prevent transaction aborts
      // but we log it heavily.
      return false;
    }
  }

  // --- Templates ---

  async sendVerificationEmail(email, verifyUrl) {
    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Verify Your Email</h2>
        <p>Thank you for registering. Please click the button below to verify your email address.</p>
        <a href="${verifyUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
      </div>
    `;
    return await this.send({ email, subject: 'Email Verification', html });
  }

  async sendPasswordResetEmail(email, resetUrl) {
    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Click the button below to reset your password. This link is valid for 10 minutes.</p>
        <a href="${resetUrl}" style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
      </div>
    `;
    return await this.send({ email, subject: 'Password Reset', html });
  }

  async sendWelcomeEmail(email, name) {
    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Welcome to Techzon IT Solutions, ${name}!</h2>
        <p>We are thrilled to have you onboard.</p>
      </div>
    `;
    return await this.send({ email, subject: 'Welcome to Techzon', html });
  }
  async sendContactInternalNotification(data) {
    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>New Project Request Received</h2>
        <p>A new client has submitted a project request through the Techzon Wide website.</p>
        
        <h3>Client Details</h3>
        <ul>
          <li><strong>Name:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone || 'N/A'}</li>
          <li><strong>Company:</strong> ${data.company || 'N/A'}</li>
          <li><strong>Project Type:</strong> ${data.subject || 'N/A'}</li>
          <li><strong>Budget:</strong> ${data.budget || 'N/A'}</li>
        </ul>

        <h3>Project / Request Details</h3>
        <p>${data.message}</p>

        <p>Please review the request and contact the client as soon as possible.</p>
        <p><i>This email is intended for the Techzon Wide support/team mailbox.</i></p>
      </div>
    `;
    return await this.send({
      email: SUPPORT_EMAIL,
      subject: `New Project Request – ${data.name}`,
      html,
      replyTo: data.email
    });
  }

  async sendContactClientConfirmation(email, name) {
    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <p>Hi ${name},</p>
        <p>Thank you for contacting Techzon Wide.</p>
        <p>Your project request / project idea has been successfully submitted to our team.</p>
        <p>Our team members will review your request and get in touch with you soon to discuss your requirements and the next steps.</p>
        <p>We appreciate your interest in working with Techzon Wide.</p>
        <br/>
        <p>Best Regards,</p>
        <p>Techzon Wide Team</p>
        <p>support@techzonwide.com</p>
      </div>
    `;
    return await this.send({ email, subject: 'Your Project Request Has Been Submitted – Techzon Wide', html });
  }

  async sendNewsletterInternalNotification(email) {
    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      </div>
    `;
    return await this.send({ email: SUPPORT_EMAIL, subject: 'New Newsletter Subscription', html });
  }

  async sendNewsletterSubscriberConfirmation(email) {
    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <p>Hi,</p>
        <p>Thank you for subscribing to Techzon Wide.</p>
        <p>Your subscription has been successfully received.</p>
        <p>You'll receive updates, insights, and important information from our team.</p>
        <br/>
        <p>Best Regards,</p>
        <p>Techzon Wide Team</p>
        <p>support@techzonwide.com</p>
      </div>
    `;
    return await this.send({ email, subject: "You're Subscribed to Techzon Wide", html });
  }
}

export const emailService = new EmailService();
