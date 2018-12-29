const express = require("express")
const apicache = require("apicache")
const rateLimit = require("express-rate-limit")
const favicon = require('serve-favicon')
const path = require('path')
const http = require("http")
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
        res.send(JSON.stringify({ status, userData }, null, 4))
    }
})
let cache = apicache.middleware
const onlyStatus200 = (req, res) => res.statusCode === 200
const cacheSuccesses = cache('10 minutes', onlyStatus200)
app.use(favicon(path.join(__dirname, 'public', 'assets/favicon.ico')))
app.use("/api/", apiLimiter)
app.use(cacheSuccesses)
require('./routes')(app)
setInterval(() => {
    http.get("http://osu-koko.herokuapp.com");
}, 900000)
app.listen(process.env.PORT, () => {
    console.info("Server started")
})