const pool = require("../../server");

//Bcrypt
const bcrypt = require("bcrypt");

// Validation
const { validateTodo } = require("./validation/validation");

const createTodo = (req, res) => {
  const { title, description, createdAt, updatedAt, status } = req.body;

  const response = validateTodo(req.body);

  const sql =
    "INSERT INTO todos (title, description, createdAt, updatedAt, status) VALUES (?, ?, ?, ?, ?)";

  pool.execute(
    sql,
    [title, description, createdAt, updatedAt, status],
    (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (response.error) {
          res.status(400).send(response.error.details[0].message);
        } else {
          res.status(200).send("Todo created!");
        }
      }
    }
  );
};

const updateTodo = (req, res) => {
  const { title, description, createdAt, updatedAt, status } = req.body;

  const response = validateTodo(req.body);

  const sql =
    "UPDATE todos SET title = ?, description = ?, createdAt = ?, updatedAt = ?, status = ? WHERE id = ?";
  pool.execute(
    sql,
    [title, description, createdAt, updatedAt, status, req.params.id],
    (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (response.error) {
          res.status(400).send(response.error.details[0].message);
        } else {
          res.status(200).send("Todo updated!");
        }
      }
    }
  );
};

const deleteTodo = (req, res) => {
  const sql = "DELETE FROM todos WHERE id = ?";
  pool.execute(sql, [req.params.id], (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send("Todo deleted!");
    }
  });
};

const todoController = (req, res) => {
  const sql = "SELECT * from todos";

  pool.execute(sql, (err, result) => {
    console.log(err, result);
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(result);
    }
  });
};

module.exports = { todoController, createTodo, updateTodo, deleteTodo };
