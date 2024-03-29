const pool = require("../../server");

const jwt = require("jsonwebtoken");

const {
  validateUser,
  validateId,
} = require("../authControllers/validation/validation");

const deleteTodo = (req, res) => {
  const authToken = req.cookies.authToken;

  const decodedToken = jwt.verify(authToken, process.env.SECRET_TOKEN);

  const userId = decodedToken.userId;

  const todoId = req.params.id;

  const responseTodoId = validateId({ todoId });

  const response = validateUser({ userId });

  if (response.error || responseTodoId.error) {
    res
      .status(400)
      .send(response.error.details[0].message + " User id is invalid");
    return;
  }

  const sql = "DELETE FROM todos WHERE id = ? AND user_id = ?";
  pool.execute(sql, [todoId, userId], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting todo from database!");
    } else {
      if (result.affectedRows > 0) {
        res.status(200).send("Todo deleted!");
      } else {
        res.status(404).send("Todo not found in database!");
      }
    }
  });
};

module.exports = { deleteTodo };
