const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email, subject, message } = req.body;
  console.log(email, subject, message);

  // Enhance the message to include the email
  const enhancedMessage = `Email: ${email}\n\n${message}`;

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: "hello@headshot.energy",
    subject: subject,
    text: enhancedMessage,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send({ message: 'Failed to send email' });
    } else {
      console.log("Email sent successfully!");
      res.status(200).send({ message: 'Email sent successfully!' });
    }
  });
});

module.exports = { sendEmail };
