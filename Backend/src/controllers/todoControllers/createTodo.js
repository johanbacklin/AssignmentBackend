const pool = require("../../server");

//Bcrypt
const bcrypt = require("bcrypt");

// Validation
const { validateTodo } = require("../authControllers/validation/validation");

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

module.exports = { createTodo };
