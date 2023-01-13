const User = require("../models/userModel")
const bcrypt = require("bcrypt")

const { UserUpdatedPublisher} = require('../publishers/user-updated-publisher')
const { BadRequestError } = require('../errors/bad-request-error')

exports.update = async (req, res, next) => {
  
  const { name, email, dateOfBirth } = req.body

  User.findByIdAndUpdate(req.params.id, {
    name: name,
    email: email,
    
    dateOfBirth: dateOfBirth,
  })
  .then((user) => {
    
    
      res
        .status(201)
        .json({
          Updated: user.email
        });
        return (new UserUpdatedPublisher(user).publish()) // KAFKA PUBLISH
  
  })
  .catch((err) => {
    next(new BadRequestError(err.constructor.name + ":" + err.message))
  })
}
