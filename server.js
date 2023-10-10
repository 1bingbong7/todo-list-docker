const { connectToDB } = require("./helpers/database/database");

const app = require("./app");

const server = require("http").createServer(app);
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Running on port ${port}`));
server.timeout = 720000;

connectToDB();