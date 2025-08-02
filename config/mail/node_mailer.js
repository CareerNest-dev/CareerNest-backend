import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { ACCOUNT_VERIFICATION_HTML_TEMPLATE } from "./account_verification_templete.js";
import { WELCOME_EMAIL_TEMPLETE } from "./welcome_email..js";
dotenv.config();

//smtp email tranport
const sendEmail = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
  pool: true,
  maxConnections: 5,
});

// Email service functions
export const sendWelcomeEmail = async (email, username) => {
  try {
    const mailReciver = {
      from: process.env.APP_EMAIL,
      to: email,
      subject: "Welcome to CareerNest",
      html: WELCOME_EMAIL_TEMPLETE.replace("{{username}}", username),
    };

    // Replace with your email service implementation
    await sendEmail.sendMail(mailReciver);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
export const sendVerificationEmail = async (email, username) => {
  try {
    const mailReciver = {
      from: process.env.APP_EMAIL,
      to: email,
      subject: "Welcome to CareerNest",
      html: ACCOUNT_VERIFICATION_HTML_TEMPLATE.replace(
        "{{username}}",
        username
      ),
    };

    // Replace with your email service implementation
    await sendEmail.sendMail(mailReciver);
    console.log(`Pending validation email sent to ${email}`);
  } catch (error) {
    console.error("Error sending Pending email:", error);
  }
};
