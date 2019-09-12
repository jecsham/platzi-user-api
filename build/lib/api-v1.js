"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = __importDefault(require("request-promise"));
const db_1 = __importDefault(require("./db"));
class ApiV1Ctrl {
    /**
     * Get difference between 2 dates
     * @param {Date} a - date 1
     * @param {Date} b - date 2
     * @return {Number}
     */
    static dateDiffInDays(a, b) {
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.floor((utc2 - utc1) / this.MS_PER_DAY);
    }
    /**
     * Scrape and structurate user data from platzi.com
     * @param {String} user - Platzi username
     * @return {Object} - Contain userdata and status
     */
    static scrapePlatziUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let userData;
            const status = {
                code: 404,
                error: true,
            };
            let userDataPlatzi;
            yield request_promise_1.default({ uri: `${this.PLATZI_URL}/${user}/`, resolveWithFullResponse: true }).then((res) => {
                let data = res.body.match(/window.data(.|\n)*?};/g);
                if (data) {
                    data = data[0].replace("window.data =", "").replace("};", "}");
                    userDataPlatzi = JSON.parse(JSON.stringify(eval("(" + data + ")")));
                    status.error = false;
                    status.code = 200;
                    userData = {
                        answers: userDataPlatzi.answers,
                        avatar: userDataPlatzi.avatar,
                        careers: userDataPlatzi.careers.map((obj) => {
                            delete obj.slug;
                            delete obj.color;
                            delete obj.approved;
                            delete obj.diploma;
                            delete obj.percentage;
                            return obj;
                        }),
                        contributions: userDataPlatzi.contributions.map((obj) => {
                            delete obj.content;
                            delete obj.author_id;
                            delete obj.type;
                            return obj;
                        }),
                        courses: userDataPlatzi.courses.map((obj) => {
                            delete obj.slug;
                            delete obj.color;
                            delete obj.image;
                            delete obj.approved;
                            delete obj.diploma;
                            delete obj.deprecated;
                            delete obj.completed;
                            delete obj.exam_url;
                            delete obj.material_seen;
                            delete obj.total_material;
                            delete obj.has_exam;
                            return obj;
                        }),
                        description: userDataPlatzi.bio,
                        flag: userDataPlatzi.flag,
                        inactive_courses: userDataPlatzi.deprecated.map((obj) => {
                            delete obj.slug;
                            delete obj.color;
                            delete obj.image;
                            delete obj.approved;
                            delete obj.diploma;
                            delete obj.deprecated;
                            delete obj.completed;
                            delete obj.exam_url;
                            delete obj.material_seen;
                            delete obj.total_material;
                            delete obj.has_exam;
                            return obj;
                        }),
                        name: userDataPlatzi.name,
                        platzi_rank: userDataPlatzi.points,
                        profile_url: userDataPlatzi.profile_url,
                        socials: userDataPlatzi.socials,
                        username: userDataPlatzi.username,
                        website: userDataPlatzi.url,
                    };
                }
                else {
                    userData = {};
                    status.error = true;
                    status.code = 403;
                }
            }).catch(() => {
                userData = {};
            });
            if (status.code === 200) {
                yield this.insertOrUpdateUser(userData);
            }
            return {
                status,
                userData,
            };
        });
    }
    /**
     * Insert or update data in db
     * @param {Object} data - Userdata
     * @return {Boolean}
     */
    static insertOrUpdateUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.last_update = new Date();
            const options = { upsert: true };
            try {
                yield db_1.default.findOneAndUpdate({ username: data.username }, data, options).exec();
            }
            catch (err) {
                return false;
            }
            return true;
        });
    }
    /**
     * Get data from db. If not exist, scrape from platzi.com
     * if more than 1 day have passed since the last update,
     * the userdata will be updated in the next user request
     * @param {String} user - Platzi username
     * @return {Object} - Contain userdata and status
     */
    static getUserSummary(user, inmediateUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = {};
            const u = user.replace("@", "");
            let userData = {};
            try {
                userData = yield db_1.default.findOne({ username: u }, { _id: 0, __v: 0 }).exec();
            }
            catch (err) {
                status.error = true;
                status.code = 500;
                userData = {};
            }
            if (userData) {
                status.error = false;
                status.code = 200;
            }
            else {
                status.error = true;
                status.code = 404;
                userData = {};
            }
            if (status.code === 404) {
                const content = yield this.scrapePlatziUser(user);
                userData = content.userData;
                status.code = content.status.code;
                status.error = content.status.error;
            }
            else {
                if (status.code === 200) {
                    const datenow = new Date();
                    if (this.dateDiffInDays(userData.last_update, datenow) >= this.REQUIRED_DAYS) {
                        this.scrapePlatziUser(user);
                    }
                    else if (inmediateUpdate) {
                        this.scrapePlatziUser(user);
                    }
                }
            }
            return { status, userData };
        });
    }
}
ApiV1Ctrl.MS_PER_DAY = 1000 * 60 * 60 * 24;
ApiV1Ctrl.REQUIRED_DAYS = 1;
ApiV1Ctrl.PLATZI_URL = "https://platzi.com";
exports.default = ApiV1Ctrl;
