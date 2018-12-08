const express = require("express")
const app = express()
require('dotenv').config()
const rateLimit = require("express-rate-limit")
app.enable("trust proxy")
app.use(express.static('public'))
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 200,
    handler: (req, res) => {
        let status = {
            error: true,
            code: 429
        }
        let userData = {}
        res.header("Content-Type", 'application/json')
        res.send(JSON.stringify({ status, userData }, null, 4))
    }
})
app.use("/api/", apiLimiter)
require('./routes')(app)
app.listen(process.env.PORT, () => {
    console.info("Server started")
})