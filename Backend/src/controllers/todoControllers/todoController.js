const pool = require("../../server");

//Bcrypt
const bcrypt = require("bcrypt");

// Validation
const { validateTodo } = require("../authControllers/validation/validation");

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

module.exports = { todoController };
