import assert from "assert";
import ApiV1Ctrl from "../lib/api_v1";

describe("API V1", () => {
    describe("#scrapePlatziUser()", () => {
        it("should return \"Jecsham Castillo\" with the param \"@jecsham\"", async () => {
            const data: any = await ApiV1Ctrl.scrapePlatziUser("@jecsham");
            const value: string = data.userData.name;
            assert.deepEqual(value, "Jecsham Castillo");
        });
    });
    describe("#scrapePlatziUser() - private profile (403)", () => {
        it("should return status code 403 with the param \"@jcdevtest\"", async () => {
            const data: any = await ApiV1Ctrl.scrapePlatziUser("@jcdevtest");
            const value: string = data.status.code;
            assert.deepEqual(value, 403);
        });
    });
    describe("#scrapePlatziUser() - error (404)", () => {
        it("should return status code 404 with the param \"randomroute\"", async () => {
            const data: any = await ApiV1Ctrl.scrapePlatziUser("randomroute");
            const value: number = data.status.code;
            assert.deepEqual(value, 404);
        });
    });
    describe("#insertOrUpdateUser()", () => {
        it("should return true with the param apiv1.scrapePlatziUser(\"@jecsham\")", async () => {
            const data = await ApiV1Ctrl.scrapePlatziUser("@jecsham");
            const value: boolean = await ApiV1Ctrl.insertOrUpdateUser(data.userData);
            assert.deepEqual(value, true);
        });
    });
});
