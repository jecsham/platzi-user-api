require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.info('MongoDB Connected')
});

//Schema
const api_v1_UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    avatar: String,
    platzi_rank: String,
    description: String,
    website: String,
    flag: String,
    socials: Array,
    profile_url: String,
    careers: Array,
    courses: Array,
    contributions: Array,
    last_update: Date
});

//Model
const api_v1_User = mongoose.model('API_v1_User', api_v1_UserSchema);

module.exports = {
    api_v1_User: api_v1_User
}