const User = require("../models/userModel")
const bcrypt = require("bcrypt")

const { UserCreatedPublisher} = require('../publishers/user-created')
const { BadRequestError } = require('../errors/bad-request-error')

exports.create = async (req, res, next) => {
  
  const { name, email, password, confirmPassword, dateOfBirth } = req.body
    
  User.create({
    name: name,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    dateOfBirth: dateOfBirth,
  })
  .then((newUser) => {
    req.session.user = newUser.email // SESSION SAVE
    if (confirmPassword != password) {
      res
        .status(400)
        .send({ 
          Failed: "Passwords are not matching" 
        });
    } else {
      res
        .status(201)
        .json({
          Created: newUser
        });
        return (new UserCreatedPublisher(newUser).publish()) // KAFKA PUBLISH
    } 
  })
  .catch((err) => {
    next(new BadRequestError(err.constructor.name + ":" + err.message))
  })
}
