"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const api_1 = __importDefault(require("./api"));
const home_1 = __importDefault(require("./home"));
module.exports = (app) => {
    api_1.default(app);
    home_1.default(app);
};
