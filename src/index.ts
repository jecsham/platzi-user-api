import apicache from "apicache";
import consola from "consola";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import path from "path";
import favicon from "serve-favicon";
import routes from "./routes";

dotenv.config();

const app = express();
app.enable("trust proxy");
app.use(express.static("public"));
app.use(cors());
const apiLimiter = new rateLimit({
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
const cache = apicache.middleware;
const onlyStatus200 = (req: any, res: any) => res.statusCode === 200;
const cacheSuccesses = cache("10 minutes", onlyStatus200);
app.use(favicon(path.join(__dirname, "../public", "assets/favicon.ico")));
app.use("/api/", apiLimiter);
app.use(cacheSuccesses);
routes(app),
app.listen(process.env.PORT || 80, () => {
    consola.info("Initializing server...");
});
