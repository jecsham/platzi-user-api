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
const api_v1_1 = __importDefault(require("../lib/api-v1"));
const API_PATH_V1 = "/api/v1";
module.exports = (app) => {
    // V1
    app.get(`${API_PATH_V1}/getUserSummary/:user`, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const user = req.params.user;
        const inmediateUpdate = req.query.inmediateUpdate || null;
        res.send(JSON.stringify(yield api_v1_1.default.getUserSummary(user, inmediateUpdate), null, 4));
    }));
};
