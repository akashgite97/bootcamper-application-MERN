const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const msg = {
    from: `${process.env.FROM_NAME} ${process.env.EMAIL} `, // sender address
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
};


