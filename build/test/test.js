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
const assert_1 = __importDefault(require("assert"));
const api_v1_1 = __importDefault(require("../lib/api-v1"));
describe("API V1", () => {
    describe("#scrapePlatziUser()", () => {
        it("should return \"Jecsham Castillo\" with the param \"@jecsham\"", () => __awaiter(this, void 0, void 0, function* () {
            const data = yield api_v1_1.default.scrapePlatziUser("@jecsham");
            const value = data.userData.name;
            assert_1.default.deepEqual(value, "Jecsham Castillo");
        }));
    });
    describe("#scrapePlatziUser() - private profile (403)", () => {
        it("should return status code 403 with the param \"@jcdevtest\"", () => __awaiter(this, void 0, void 0, function* () {
            const data = yield api_v1_1.default.scrapePlatziUser("@jcdevtest");
            const value = data.status.code;
            assert_1.default.deepEqual(value, 403);
        }));
    });
    describe("#scrapePlatziUser() - error (404)", () => {
        it("should return status code 404 with the param \"randomroute\"", () => __awaiter(this, void 0, void 0, function* () {
            const data = yield api_v1_1.default.scrapePlatziUser("randomroute");
            const value = data.status.code;
            assert_1.default.deepEqual(value, 404);
        }));
    });
    describe("#insertOrUpdateUser()", () => {
        it("should return true with the param apiv1.scrapePlatziUser(\"@jecsham\")", () => __awaiter(this, void 0, void 0, function* () {
            const data = yield api_v1_1.default.scrapePlatziUser("@jecsham");
            const value = yield api_v1_1.default.insertOrUpdateUser(data.userData);
            assert_1.default.deepEqual(value, true);
        }));
    });
});
