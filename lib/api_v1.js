const db = require("./db");
const PLATZI_URL = "https://platzi.com";
const request = require("request-promise");
const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const REQUIRED_DAYS = 1;

/**
 * A function for get difference between 2 dates
 * @param {Date} a - date 1
 * @param {Date} b - date 2
 * @return {Number}
 */
function dateDiffInDays(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

/**
 * Scrape user data from platzi.com
 * @param {String} user - Platzi username
 * @return {Object} - Contain userdata and status
 */
let scrapePlatziUser = async (user) => {
    let userData;
    let status = {
        error: true,
        code: 404
    };
    let userDataPlatzi;
    await request({ uri: `${PLATZI_URL}/${user}/`, resolveWithFullResponse: true }).then((res) => {
        let data = res.body.match(/window.data(.|\n)*?};/g);
        if (data) {
            data = data[0].replace("window.data =", "").replace("};", "}");
            userDataPlatzi = JSON.parse(JSON.stringify(eval("(" + data + ")")));
            status.error = false;
            status.code = 200;
            userData = {
                username: userDataPlatzi.username,
                name: userDataPlatzi.name,
                avatar: userDataPlatzi.avatar,
                flag: userDataPlatzi.flag,
                platzi_rank: userDataPlatzi.points,
                description: userDataPlatzi.bio,
                website: userDataPlatzi.url,
                socials: userDataPlatzi.socials,
                profile_url: userDataPlatzi.profile_url,
                careers: userDataPlatzi.careers.map((obj) => {
                    delete obj["slug"];
                    delete obj["color"];
                    delete obj["approved"];
                    delete obj["diploma"];
                    delete obj["percentage"];
                    return obj;
                }),
                courses: userDataPlatzi.courses.map((obj) => {
                    delete obj["slug"];
                    delete obj["color"];
                    delete obj["image"];
                    delete obj["approved"];
                    delete obj["diploma"];
                    delete obj["deprecated"];
                    delete obj["completed"];
                    delete obj["exam_url"];
                    delete obj["material_seen"];
                    delete obj["total_material"];
                    delete obj["has_exam"];
                    return obj;
                }),
                inactive_courses: userDataPlatzi.deprecated.map((obj) => {
                    delete obj["slug"];
                    delete obj["color"];
                    delete obj["image"];
                    delete obj["approved"];
                    delete obj["diploma"];
                    delete obj["deprecated"];
                    delete obj["completed"];
                    delete obj["exam_url"];
                    delete obj["material_seen"];
                    delete obj["total_material"];
                    delete obj["has_exam"];
                    return obj;
                }),
                contributions: userDataPlatzi.contributions.map((obj) => {
                    delete obj["content"];
                    delete obj["author_id"];
                    delete obj["type"];
                    return obj;
                })
            };
        } else {
            userData = {};
            status.error = true;
            status.code = 403;
        }
    }).catch(() => {
        userData = {};
    });
    if (status.code === 200) await insertOrUpdateUser(userData);
    return { userData, status };
};

/**
 * Insert or update in db
 * @param {Object} data - Userdata
 * @return {Boolean} 
 */
let insertOrUpdateUser = async (data) => {
    data.last_update = new Date();
    let options = { upsert: true };
    try {
        await db.api_v1_User.findOneAndUpdate({ username: data.username }, data, options).exec();
    } catch (err) {
        return false;
    }
    return true;
};

/**
 * Get data from db. If not exist, scrape from platzi.com
 * if more than 1 day have passed since the last update, 
 * the userdata will be updated in the next user request
 * @param {String} user - Platzi username
 * @return {Object} - Contain userdata and status
 */
let getUserSummary = async (user) => {
    let status = {};
    let u = user.replace("@", "");
    let userData = {};
    try {
        userData = await db.api_v1_User.findOne({ username: u }, { _id: 0, __v: 0 }).exec();
    } catch (err) {
        status.error = true;
        status.code = 500;
        userData = {};
    }
    if (userData) {
        status.error = false;
        status.code = 200;
    } else {
        status.error = true;
        status.code = 404;
        userData = {};
    }
    if (status.code === 404) {
        let content = await scrapePlatziUser(user);
        userData = content.userData;
        status.code = content.status.code;
        status.error = content.status.error;
    } else {
        if (status.code === 200) {
            let datenow = new Date();
            if (dateDiffInDays(userData.last_update, datenow) >= REQUIRED_DAYS) {
                scrapePlatziUser(user);
            }
        }
    }
    return { status, userData };
};

module.exports = {
    scrapePlatziUser,
    insertOrUpdateUser,
    getUserSummary
};