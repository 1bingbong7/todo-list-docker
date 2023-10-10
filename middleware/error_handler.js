const { HttpError } = require("../helpers/http_error");

const errorHandler = async (err, req, res, next) => {
    console.log("🚀 ~ file: error_handler.js:10 ~ errorHandler ~ err:", err)
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({ error: err.message });
    } else {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    errorHandler
}