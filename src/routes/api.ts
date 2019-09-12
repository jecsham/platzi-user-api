import ApiV1Ctrl from "../lib/api-v1";
const API_PATH_V1 = "/api/v1";
export = (app: any) => {
    // V1
    app.get(`${API_PATH_V1}/getUserSummary/:user`, async (req: any, res: any) => {
        const user = req.params.user;
        const inmediateUpdate = req.query.inmediateUpdate || null;
        res.send(JSON.stringify(await ApiV1Ctrl.getUserSummary(user, inmediateUpdate ), null, 4));
    });
};
