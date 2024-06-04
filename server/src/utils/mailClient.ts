import nodemailer from "nodemailer";

const passkey = process.env.TRANSPORTER_APP_PASSWORD as string;

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: `devtest8055@gmail.com`,
    pass: passkey,
  },
});
