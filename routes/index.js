const authenticate = require("../middleware/authenticate");

module.exports = (app) => {
    const routes = require("express").Router();

    routes.use("/auth", require("./endpoints/auth")(app));

    // Authorized routes
    routes.use("/todo", authenticate, require("./endpoints/todo")(app), authenticate);
    routes.use("/analytics", authenticate, require("./endpoints/analytics")(app));

    return routes;
};