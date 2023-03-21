const pool = require("../../server");

const jwt = require("jsonwebtoken");

const {
  validateUser,
  validateId,
} = require("../authControllers/validation/validation");

const getUserWithId = (req, res) => {
  const authToken = req.cookies.authToken;

  const decodedToken = jwt.verify(authToken, process.env.SECRET_TOKEN);
  const todoId = req.params.id;

  const responseTodoId = validateId({ todoId });

  const userId = decodedToken.userId;
  const response = validateUser({ userId });

  if (response.error || responseTodoId.error) {
    res
      .status(400)
      .send(response.error.details[0].message + " User id or todo id invalid!");
    return;
  } else {
    const sql = "SELECT * FROM todos WHERE id = ? AND user_id = ?";
    pool.execute(sql, [todoId, userId], (err, result) => {
      if (err) {
        res.status(500).send("Something went wrong with todo from database!");
        console.log(err);
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).send("Todo not found in database!");
        }
      }
    });
  }
};

module.exports = { getUserWithId };
