module.exports = (app) => {
    require("./api")(app);
    require("./home")(app);
};
