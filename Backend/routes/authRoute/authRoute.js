const express = require("express");

const routes = express.Router();

const { login } = require("../../controllers/login");
const { registerUser } = require("../../controllers/registerUser");

routes.post("/login", login);
routes.post("/registerUser", registerUser);

module.exports = { routes };
