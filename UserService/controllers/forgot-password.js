const nodemailer = require('nodemailer')
const User = require('../models/userModel')
const crypto = require('crypto')

exports.ForgotPassword = async (req, res, next) => {

 
  
    const { email } = req.body;
  
    // find user by email
    User.findOne({ email }, (err, user) => {
      if (!user) {
        return res.status(404).json({ message: 'No user found with that email' });
      }
      const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "94911e71d93438",
          pass: "3b89be36a92a00"
        }
        });
        
        const mailOptions = {
          from: 'msevvalar@gmail.com',
          to: user.email,
          subject: 'Password reset link',
          html: '<p>Click <a href="http://localhost:60177/reset-password">here</a> to reset your password.</p>',
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      // generate reset token and expiration date
      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // 1 hour
  
      // update user with reset token and expiry
      User.findByIdAndUpdate(
        user._id,
        {
          resetToken,
          resetTokenExpiry,
        },
        { new: true },
        (err, updatedUser) => {
          if (err) {
            return res.status(500).json({ message: 'Error updating user' });
          }
          
          // send reset link to user's email
          const resetLink = `http://localhost:59314/api/v1/users/reset-password/${resetToken}`;
          transporter.sendMail(
            {
              to: email,
              subject: 'Password reset link',
              html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
            },
            (error, info) => {
              if (error) {
                return res.status(500).json({ message: 'Error sending email' });
              }
              res.status(200).json({ message: 'Reset link sent to email' });
            }
          );
        }
      );
    });
  }





