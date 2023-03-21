const pool = require("../../server");
const jwt = require("jsonwebtoken");
const {
  validateUser,
  validateTodo,
  validateId,
} = require("../authControllers/validation/validation");

const updateTodo = (req, res) => {
  const authToken = req.cookies.authToken;
  const decodedToken = jwt.verify(authToken, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;

  const todoId = req.params.id;
  const responseTodoId = validateId({ todoId });

  const { title, description, completed } = req.body;

  const response = validateUser({ userId });
  const response2 = validateTodo({ title, description, completed });
  if (response.error || responseTodoId.error || response2.error) {
    res
      .status(400)
      .send(response.error.details[0].message + " User id is invalid");
    return;
  } else {
    const sql =
      "UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ? AND user_id = ?";
    pool.execute(
      sql,
      [title, description, completed, todoId, userId],
      (err, result) => {
        if (err) {
          res.status(500).send("Error updating todo in database!");
        } else {
          if (result.affectedRows > 0) {
            res.status(200).send("Todo updated!");
          } else {
            res.status(404).send("Todo not found in database!");
          }
        }
      }
    );
  }
};

module.exports = { updateTodo };
