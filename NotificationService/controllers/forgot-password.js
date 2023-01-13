const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.ForgotPassword = async (req, res, next) => {
  const email = req.body.email;

  // generate reset token and expiration date
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour

  // setup email transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "94911e71d93438",
      pass: "3b89be36a92a00",
    },
  });

  // send reset link to user's email
  const resetLink = `http://localhost:4000/api/v1/reset-password/${resetToken}`;
  transporter.sendMail(
    {
      to: email,
      subject: "Password reset link",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    },
    (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email" });
      }
      res.status(200).json({ message: "Reset link sent to email" });
    }
  );
};
