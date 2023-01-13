const express = require('express')
const app = express()
const router = require('./routes/api')
app.use(express.json());
require('dotenv').config()

const { PasswordChangedListener } = require('./listeners/password-changed-listener')
const PasswordChangedController = require('./event-controller/password-changed-controller').passwordChangedController
app.use('/api/v1', router)
app.get("/api/v1", (req, res) => {
    res.send("<h2>Hi there!!!</h2>");
});
app.enable("trust proxy")

new PasswordChangedListener().listen(PasswordChangedController)
app.listen(4000, () => console.log('Connected.'))