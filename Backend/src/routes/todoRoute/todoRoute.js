const express = require("express");

const pool = require("../../server");

const todoRoutes = express.Router();

const {
  todoController,
} = require("../../controllers/todoControllers/todoController");

const {
  getUserWithId,
} = require("../../controllers/todoControllers/getUserWithId");

const { createTodo } = require("../../controllers/todoControllers/createTodo");

const { updateTodo } = require("../../controllers/todoControllers/updateTodo");

const { deleteTodo } = require("../../controllers/todoControllers/deleteTodo");

todoRoutes.get("/", todoController);
todoRoutes.get("/:id", getUserWithId);
todoRoutes.post("/createTodo", createTodo);
todoRoutes.put("/updateTodo/:id", updateTodo);
todoRoutes.delete("/deleteTodo/:id", deleteTodo);

module.exports = { todoRoutes };
