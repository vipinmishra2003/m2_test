const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
// const Twilio = require('twilio');
module.exports = {
  sendPassword: async (email, subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });
      const mailSend = {
        from: process.env.MAIL_USER,
        to: email,
        subject: subject,
        text: text,
      };
      const mail = await transporter.sendMail(mailSend);
      return mail;
    } catch (error) {
      console.error(error);
    }
  },
  tokenGenerator: (payload) => {
    try {
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
      return token;
    } catch (err) {
      console.error(err);
    }
  },
  generateQRCode: async (email, password) => {
    try {
      // Construct URL for user profile
      const text = `Email: ${email}\nPassword: ${password}`;
      const qrImage = await qr.toDataURL(text);
      // Generate QR code
      res.status(200).json("QR Code generated successfully.", qrImage);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  },
};
