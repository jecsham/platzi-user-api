const express = require("express")
const apicache = require("apicache")
const rateLimit = require("express-rate-limit")
require('dotenv').config()
const app = express()
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
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.header("Content-Type", 'application/json')
        res.send(JSON.stringify({ status, userData }, null, 4)).status()
    }
})
let cache = apicache.middleware
const onlyStatus200 = (req, res) => res.statusCode === 200
const cacheSuccesses = cache('10 minutes', onlyStatus200)
app.use("/api/", apiLimiter)
app.use(cacheSuccesses)
require('./routes')(app)
app.listen(process.env.PORT, () => {
    console.info("Server started")
})