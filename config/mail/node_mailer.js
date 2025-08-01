import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

//smtp email tranport
const sendEmail = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default sendEmail;
