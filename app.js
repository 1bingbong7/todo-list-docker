require("dotenv").config();
const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const { errorHandler } = require("./middleware/error_handler");
const app = express();

// express body parser so we get JSON bodies always
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use("/api", require("./routes/index")(app));

app.get("/", (req, res) => {
    res.send("REST API for a TODO List");
});

// Error handling middleware
app.use(errorHandler)

module.exports = app;



