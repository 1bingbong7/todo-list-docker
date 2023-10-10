const jwt = require('jsonwebtoken');
const { HttpError } = require("../../helpers/http_error");

module.exports = (app) => {
    let routes = require("express").Router();

    routes.post("/login", async(req, res, next) => {
        try {
            const username = req.body.username;
            const password = req.body.password;

            if (username != "johndoe" || password != "12345") {
                throw new HttpError(HttpError.S.Unauthorized, "Invalid username or password", "login");
            }
            const data = {
                name: "John Doe",
                username: "johndoe",
                email: "johndoe@gmail.com"
            }
            const token = jwt.sign(data, process.env.SECRET, { expiresIn: "8h", algorithm: "HS256" });

            return res.send({
                message: "You've successfully logged in",
                data: {
                    token
                },
            });
        } catch (error) {
            next(error);
        }
    });

    return routes;
}