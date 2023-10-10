const { getRequestQuery } = require("../../helpers/get_request_query");
const {
    getAnalyticList
} = require("../../model/analytics");

module.exports = (app) => {
    let routes = require("express").Router();

    routes.get("/", async(req, res, next) => {
        try {
            const { options, query } = getRequestQuery(req.query);
            const result = await getAnalyticList(options, query);
            return res.send({   
                message: "Retreived Analytics List",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    });

    return routes;
}