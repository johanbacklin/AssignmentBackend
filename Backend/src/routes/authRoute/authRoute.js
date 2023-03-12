const express = require("express");

const pool = require("../../server");

const routes = express.Router();

const {
  loginController,
} = require("../../controllers/authControllers/loginController");
const {
  logoutController,
} = require("../../controllers/authControllers/logoutController");

const {
  registerController,
} = require("../../controllers/authControllers/registerController");

routes.post("/loginController", loginController);
routes.post("/registerController", registerController);
routes.post("/logout", logoutController);

module.exports = { routes };
