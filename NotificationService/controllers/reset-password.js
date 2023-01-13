const bcrypt = require('bcrypt');
const {PasswordChangedPublisher} = require('../publishers/password-changed-publisher')

exports.ResetPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;
  
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour
    if(resetTokenExpiry < Date.now() ){
      return res.status(404).json({ message: 'Token expired'});
    }
  
    // find user with matching reset token and check if it's still valid
    if (!token || !password) {
      return res.status(404).json({ message: 'Invalid or expired token' });
    }

   
      // hash and update user's password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating password' });
        }
        const updatedUser = {
          password: hash,
          resetToken: null,
          resetTokenExpiry: null,
        }
        res.status(200).json({ message: 'Password reset successfully' });
        return (new PasswordChangedPublisher(updatedUser).publish())
      });
  };