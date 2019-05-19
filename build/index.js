"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apicache_1 = __importDefault(require("apicache"));
const consola_1 = __importDefault(require("consola"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = express_1.default();
app.enable("trust proxy");
app.use(express_1.default.static("public"));
app.use(cors_1.default());
const apiLimiter = new express_rate_limit_1.default({
    handler: (req, res) => {
        const status = {
            code: 429,
            error: true,
        };
        const userData = {};
        res.send(JSON.stringify({ status, userData }, null, 4));
    },
    max: 200,
    windowMs: 1 * 60 * 1000,
});
const cache = apicache_1.default.middleware;
const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheSuccesses = cache("10 minutes", onlyStatus200);
app.use(serve_favicon_1.default(path_1.default.join(__dirname, "../public", "assets/favicon.ico")));
app.use("/api/", apiLimiter);
app.use(cacheSuccesses);
routes_1.default(app),
    app.listen(process.env.PORT || 80, () => {
        consola_1.default.info("Initializing server...");
    });
