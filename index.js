const express = require("express")
const app = express()
require('dotenv').config()
const rateLimit = require("express-rate-limit")
app.enable("trust proxy")
app.use(express.static('public'))
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 200
})
app.use("/api/", apiLimiter)
require('./routes')(app)
app.listen(process.env.PORT, () => {
    console.info("Server started")
})