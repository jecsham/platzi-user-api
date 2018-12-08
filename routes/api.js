const API_PATH_V1 = '/api/v1'
const apiv1 = require('../controllers/api_v1')
module.exports = (app) => {
    // V1
    app.get(`${API_PATH_V1}/getUserSummary/:user`, async (req, res) => {
        let user = req.params.user
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.header("Content-Type", 'application/json')
        res.send(JSON.stringify(await apiv1.getUserSummary(user), null, 4))
    })

}