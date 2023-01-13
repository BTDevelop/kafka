const express = require('express')
const router = express.Router()

const forgotPassword = require('../controllers/forgot-password').ForgotPassword
const resetPassword  = require('../controllers/reset-password').ResetPassword
const verifyToken    = require('../utils/verifyToken').authenticateToken

router
    .post('/forgot-password', forgotPassword)
    .post('/reset-password/:token', resetPassword)

module.exports = router