const User = require('../models/userModel')

exports.get =  async (req, res, next) => {
    const userList = await User.find().select("-password");

    if (!User) {
      return res.status(400)
    }
  
    res.json({ "Total Count": userList.length,  Users: userList });
    next()
}
