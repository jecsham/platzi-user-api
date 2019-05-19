"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consola_1 = __importDefault(require("consola"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
});
const db = mongoose_1.default.connection;
db.on("error", () => consola_1.default.error("MongoDB Error"));
db.on("connecting", () => consola_1.default.info("MongoDB Connecting..."));
db.on("connected", () => consola_1.default.success("MongoDB Connected"));
// Schema
const apiV1UserSchema = new mongoose_1.default.Schema({
    avatar: String,
    careers: Array,
    contributions: Array,
    courses: Array,
    description: String,
    flag: String,
    last_update: Date,
    name: String,
    platzi_rank: String,
    profile_url: String,
    socials: Array,
    username: String,
    website: String,
});
// Model
const apiV1User = mongoose_1.default.model("API_v1_User", apiV1UserSchema);
exports.default = apiV1User;
