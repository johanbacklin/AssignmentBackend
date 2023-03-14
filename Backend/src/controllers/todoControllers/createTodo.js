const pool = require("../../server");

//Bcrypt
const bcrypt = require("bcrypt");

// Validation
const { validateTodo } = require("../authControllers/validation/validation");

const createTodo = (req, res) => {
  const { title, description, completed, user_id } = req.body;
  console.log(user_id);
  console.log(req.body, "HÄR ÄR REQBOIDYN");

  const response = validateTodo(req.body);

  const sql =
    "INSERT INTO todos (title, description, completed, user_id) VALUES (?, ?, ?, ?)";

  pool.execute(sql, [title, description, completed, user_id], (err, result) => {
    console.log(err, result);
    if (err) {
      res.sendStatus(500);
    } else {
      if (response.error) {
        res.status(400).send(response.error.details[0].message);
      } else {
        res.status(200).send("Todo created!");
      }
    }
  });
};

module.exports = { createTodo };
