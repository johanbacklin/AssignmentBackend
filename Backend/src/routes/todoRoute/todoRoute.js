//Nytt

const express = require("express");

const pool = require("../../server");

const todoRoutes = express.Router();

const {
  todoController,
} = require("../../controllers/todoControllers/todoController");

const { createTodo } = require("../../controllers/todoControllers/createTodo");

const { updateTodo } = require("../../controllers/todoControllers/updateTodo");

const { deleteTodo } = require("../../controllers/todoControllers/deleteTodo");
/* const {
  verifyToken,
} = require("../../controllers/authControllers/middleware/verifyToken"); */

todoRoutes.get("/", todoController);

todoRoutes.post("/createTodo", createTodo);
todoRoutes.put("/updateTodo/:id", updateTodo);
todoRoutes.delete("/deleteTodo/:id", deleteTodo);

module.exports = { todoRoutes };
