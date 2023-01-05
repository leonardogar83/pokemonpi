const Express = require("express");
const cors = require("cors");

const routes = require("./src/routes/routes.js");

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(routes);

module.exports = app;
