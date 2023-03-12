const pool = require("../../server");

//Bcrypt
const bcrypt = require("bcrypt");

// Validation
const { validateTodo } = require("../authControllers/validation/validation");

const updateTodo = (req, res) => {
  const { title, description, completed } = req.body;

  const response = validateTodo(req.body);

  const sql =
    "UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?";
  pool.execute(
    sql,
    [title, description, status, req.params.id],
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

module.exports = { updateTodo };
