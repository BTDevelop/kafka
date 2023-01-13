const express = require("express")
const router = express.Router()

const { create }    = require("../controllers/create-user")
const { get }       = require('../controllers/get-users')
const { update }    = require("../controllers/update-user")
const { deleteOne } = require('../controllers/delete-user')
const { login }     = require('../controllers/login')
const { logout }    = require('../controllers/logout')
const forgotPassword   = require('../controllers/forgot-password')
const { ResetToken } = require("../controllers/reset-password")

router
  .post('/create', create)
  .get('/get', get)
  .patch('/update/:id', update)
  .delete('/delete/:id', deleteOne)
  .post('/login', login )
  .delete('/logout', logout)
  .post('/forgot-password', forgotPassword.ForgotPassword)
  .post('/reset-password/:token', ResetToken)
  

module.exports = router