const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const {PasswordChangedPublisher} = require('../publishers/password-changed-publisher')

exports.ResetToken = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;
  
    // find user with matching reset token and check if it's still valid
    User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() + 60 * 12 * 24} }, (err, user) => {
      if (!user) {
        return res.status(404).json({ message: 'Invalid or expired token' });
      }
  
      // hash and update user's password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating password' });
        }
        User.findByIdAndUpdate(
          user._id,
          {
            password: hash,
            resetToken: null,
            resetTokenExpiry: null,
          },
          { new: true },
          (err, updatedUser) => {
            if (err) {
              return res.status(500).json({ message: 'Error updating user' });
            }
            res.status(200).json({ message: 'Password reset successfully' });
            return (new PasswordChangedPublisher(updatedUser).publish())
          }
        );
      });
    });
  };