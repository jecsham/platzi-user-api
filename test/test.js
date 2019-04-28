const assert = require("assert");
const apiv1 = require("../lib/api_v1");
describe("API V1", function () {
    describe("#scrapePlatziUser()", function () {
        it("should return \"Jecsham Castillo\" with the param \"@jecsham\"", async function () {
            let data = await apiv1.scrapePlatziUser("@jecsham");
            assert.equal(data.userData.name, "Jecsham Castillo");
        });
    });
    describe("#scrapePlatziUser() - private profile (403)", function () {
        it("should return status code 403 with the param \"@jcdevtest\"", async function () {
            let data = await apiv1.scrapePlatziUser("@jcdevtest");
            assert.equal(data.status.code, 403);
        });
    });
    describe("#scrapePlatziUser() - error (404)", function () {
        it("should return status code 404 with the param \"randomroute\"", async function () {
            let data = await apiv1.scrapePlatziUser("randomroute");
            assert.equal(data.status.code, 404);
        });
    });
    describe("#insertOrUpdateUser()", function () {
        it("should return true with the param apiv1.scrapePlatziUser(\"@jecsham\")", async function () {
            let data = await apiv1.scrapePlatziUser("@jecsham");
            let result = await apiv1.insertOrUpdateUser(data.userData);
            assert.equal(result, true);
        });
    });
});