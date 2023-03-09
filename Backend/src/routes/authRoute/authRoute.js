const express = require("express");

const pool = require("../../server");

const routes = express.Router();

const {
  loginController,
} = require("../../controllers/authControllers/loginController");
const {
  registerController,
} = require("../../controllers/authControllers/registerController");

const {
  todoController,
} = require("../../controllers/todoControllers/todoController");

routes.get("/todoController", todoController);

routes.post("/loginController", loginController);
routes.post("/registerController", registerController);

module.exports = { routes };
