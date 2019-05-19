import consola from "consola";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", () => consola.error("MongoDB Error"));
db.on("connecting", () => consola.info("MongoDB Connecting..."));
db.on("connected", () => consola.success("MongoDB Connected"));

// Schema
const apiV1UserSchema = new mongoose.Schema({
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
const apiV1User = mongoose.model("API_v1_User", apiV1UserSchema);

export default apiV1User;
