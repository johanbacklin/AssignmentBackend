const pool = require("../../server");
const jwt = require("jsonwebtoken");
const { validateTodo } = require("../authControllers/validation/validation");

function todoController(req, res) {
  const userId = req.userId;
  const sql =
    "SELECT t.*, u.username FROM todos t JOIN users u ON t.user_id = u.ID WHERE t.user_id = ?";

  pool.execute(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    } else {
      res.status(200).json(result);
    }
  });
}

module.exports = { todoController };
/* const pool = require("../../server");
const bcrypt = require("bcrypt");

const { validateAuth } = require("../authControllers/validation/validation");

const todoController = (req, res) => {
  const sql = "SELECT * from todos";

  pool.execute(sql, (err, result) => {
    console.log(err, result);
    if (err) {
      res.sendStatus(404);
    } else {
      const response = validateAuth(req.body);
      if (response.error) {
        res.status(400).send(response.error.details[0].message);
      } else {
        res.status(200).send(result);
      }
    }
  });
};

module.exports = { todoController };
 */
