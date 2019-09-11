import request from "request-promise";
import apiV1User from "./db";

interface IData {
    status: {
        code: number;
        error: boolean;
    };
    userData: any;
}

export default class ApiV1Ctrl {

    public static readonly MS_PER_DAY: number = 1000 * 60 * 60 * 24;
    public static readonly REQUIRED_DAYS: number = 1;
    private static readonly PLATZI_URL: string = "https://platzi.com";

    /**
     * Get difference between 2 dates
     * @param {Date} a - date 1
     * @param {Date} b - date 2
     * @return {Number}
     */
    public static dateDiffInDays(a: any, b: any): number {
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.floor((utc2 - utc1) / this.MS_PER_DAY);
    }

    /**
     * Scrape and structurate user data from platzi.com
     * @param {String} user - Platzi username
     * @return {Object} - Contain userdata and status
     */
    public static async scrapePlatziUser(user: string): Promise<IData> {
        let userData;
        const status = {
            code: 404,
            error: true,
        };
        let userDataPlatzi;
        await request({ uri: `${this.PLATZI_URL}/${user}/`, resolveWithFullResponse: true }).then((res) => {
            let data = res.body.match(/window.data(.|\n)*?};/g);
            if (data) {
                data = data[0].replace("window.data =", "").replace("};", "}");
                userDataPlatzi = JSON.parse(JSON.stringify(eval("(" + data + ")")));
                status.error = false;
                status.code = 200;
                userData = {
                    avatar: userDataPlatzi.avatar,
                    careers: userDataPlatzi.careers.map((obj: any) => {
                        delete obj.slug;
                        delete obj.color;
                        delete obj.approved;
                        delete obj.diploma;
                        delete obj.percentage;
                        return obj;
                    }),
                    contributions: userDataPlatzi.contributions.map((obj: any) => {
                        delete obj.content;
                        delete obj.author_id;
                        delete obj.type;
                        return obj;
                    }),
                    courses: userDataPlatzi.courses.map((obj: any) => {
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
                    inactive_courses: userDataPlatzi.deprecated.map((obj: any) => {
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
                    answers: userDataPlatzi.answers,
                    profile_url: userDataPlatzi.profile_url,
                    socials: userDataPlatzi.socials,
                    username: userDataPlatzi.username,
                    website: userDataPlatzi.url,
                };
            } else {
                userData = {};
                status.error = true;
                status.code = 403;
            }
        }).catch(() => {
            userData = {};
        });
        if (status.code === 200) {
            await this.insertOrUpdateUser(userData);
        }
        return {
            status,
            userData,
        };
    }

    /**
     * Insert or update data in db
     * @param {Object} data - Userdata
     * @return {Boolean}
     */
    public static async insertOrUpdateUser(data: any) {
        data.last_update = new Date();
        const options = { upsert: true };
        try {
            await apiV1User.findOneAndUpdate({ username: data.username }, data, options).exec();
        } catch (err) {
            return false;
        }
        return true;
    }

    /**
     * Get data from db. If not exist, scrape from platzi.com
     * if more than 1 day have passed since the last update,
     * the userdata will be updated in the next user request
     * @param {String} user - Platzi username
     * @return {Object} - Contain userdata and status
     */
    public static async getUserSummary(user: string) {
        const status: any = {};
        const u: string = user.replace("@", "");
        let userData: any = {};
        try {
            userData = await apiV1User.findOne({ username: u }, { _id: 0, __v: 0 }).exec();
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
            const content: IData = await this.scrapePlatziUser(user);
            userData = content.userData;
            status.code = content.status.code;
            status.error = content.status.error;
        } else {
            if (status.code === 200) {
                const datenow = new Date();
                if (this.dateDiffInDays(userData.last_update, datenow) >= this.REQUIRED_DAYS) {
                    this.scrapePlatziUser(user);
                }
            }
        }
        return { status, userData };
    }
}
