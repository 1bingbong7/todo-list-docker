const { getRequestQuery } = require("../../helpers/get_request_query");
const {
    addTodo,
    getTodoList,
    getTodo,
    updateTodo,
    deleteTodo
} = require("../../model/todo");

module.exports = (app) => {
    let routes = require("express").Router();

    routes.post("/", async(req, res, next) => {
        try {
            const result = await addTodo(req.body);
            return res.send({
                message: "Todo added successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    });

    routes.get("/", async(req, res, next) => {
        try {
            const { options, query } = getRequestQuery(req.query);
            const result = await getTodoList(options, query);
            return res.send({   
                message: "Retreived Todo List",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    });

    routes.put("/:id", async(req, res, next) => {
        try {
            const result = await updateTodo(req.params.id, req.body);
            return res.send({
                message: "Todo updated successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    })

    routes.delete("/:id", async(req, res, next) =>{
        try {
            const result = await deleteTodo(req.params.id);
            return res.send({
                message: "Todo deleted successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    })

    routes.get("/:id", async(req, res, next) => {
        try {
            const result = await getTodo(req.params.id);
            return res.send({
                message: "Retrieved Todo by ID",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    })

    return routes;
}