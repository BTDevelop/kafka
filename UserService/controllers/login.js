const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email } = req.body;
  

  try {
    const user = await User.findOne({ email: email });
    

    if (!user) {
      return res.status(404).json({
        status: "Fail",
        message: "User not found.",
      });
    } else {
      
      req.session.user = user;
      const token = await user.createJWT()
      
      res.status(200).json({Status: 'Logged in', token});
    }
  } catch (e) {
    res.status(404).json({
      status: "Fail.",
      error: e,
    });
  }
};
