// import apicache from "apicache";
import consola from "consola";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import RateLimit from "express-rate-limit";
import routes from "./routes";
import path from "path";
dotenv.config();

const app = express();
app.enable("trust proxy");
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(cors());
const apiLimiter = RateLimit({
    handler: (req: any, res: any) => {
        const status = {
            code: 429,
            error: true,
        };
        const userData = {};
        res.send(JSON.stringify({ status, userData }, null, 4));
    },
    max: 300,
    windowMs: 1 * 60 * 1000,
});
app.use("/api/", apiLimiter);
routes(app),
    app.listen(process.env.PORT || 80, () => {
        consola.info("Initializing server...");
    });
