"use strict";
module.exports = (app) => {
    app.get("/", (req, res) => {
        res.sendFile("public/index.html", { root: __dirname });
    });
};
