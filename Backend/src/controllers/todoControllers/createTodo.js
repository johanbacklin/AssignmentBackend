const pool = require("../../server");

//Bcrypt
const bcrypt = require("bcrypt");

// Validation
const {
  validateTodo,
  validateUser,
} = require("../authControllers/validation/validation");

const createTodo = (req, res) => {
  const { title, description, completed } = req.body;
  const userId = req.userId;

  const todoValidation = validateTodo(req.body);
  const userValidation = validateUser({ userId });

  if (todoValidation.error || userValidation.error) {
    res
      .status(400)
      .send((todoValidation.error || userValidation.error).details[0].message);
    return;
  } else {
    const sql = `INSERT INTO todos (title, description, completed, user_id)
    VALUES (?, ?, ?, ?)`;

    pool.execute(
      sql,
      [title, description, completed, userId],
      (err, result) => {
        console.log(userId);
        if (err) {
          res.status(500).send("Error adding to database!");
        } else {
          res.status(201).send("Todo created!");
        }
      }
    );
  }
};
module.exports = { createTodo };
