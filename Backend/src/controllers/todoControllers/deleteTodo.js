const pool = require("../../server");

//Bcrypt
const bcrypt = require("bcrypt");

// Validation
const { validateTodo } = require("../authControllers/validation/validation");

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

module.exports = { deleteTodo };
