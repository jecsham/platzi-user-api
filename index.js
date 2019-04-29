const express = require("express");
const apicache = require("apicache");
const rateLimit = require("express-rate-limit");
const favicon = require("serve-favicon");
const path = require("path");
const consola = require("consola");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.enable("trust proxy");
app.use(express.static("public"));
app.use(cors());
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 200,
    handler: (req, res) => {
        const status = {
            error: true,
            code: 429
        };
        const userData = {};
        res.send(JSON.stringify({ status, userData }, null, 4));
    }
});
const cache = apicache.middleware;
const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheSuccesses = cache("10 minutes", onlyStatus200);
app.use(favicon(path.join(__dirname, "public", "assets/favicon.ico")));
app.use("/api/", apiLimiter);
app.use(cacheSuccesses);
require("./routes")(app);
app.listen(process.env.PORT || 80, () => {
    consola.info("Initializing server...");
});
